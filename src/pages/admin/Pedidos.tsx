import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check, X, Clock, MapPin, Phone, User, Calendar as CalendarIcon, ChevronRight, ExternalLink } from 'lucide-react';
import { useStore } from '@/src/store';
import { cn } from '@/src/lib/utils';
import { Order } from '@/src/types';
import moment from 'moment';

export default function Pedidos() {
  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdateStatus = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status);
    if (selectedOrder?.id === id) {
      setSelectedOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const filteredOrders = orders.filter(order => filter === 'all' || order.status === filter);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-500';
      case 'completed': return 'bg-green-500/10 text-green-500';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Pedidos Online</h1>
          <p className="text-muted-foreground">Gestiona las órdenes recibidas a través del sitio web.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-border/50 shadow-sm self-start">
          {(['all', 'pending', 'completed', 'cancelled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize",
                filter === f ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted"
              )}
            >
              {f === 'all' ? 'Todos' : getStatusLabel(f)}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredOrders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedOrder(order)}
              className={cn(
                "bg-white p-6 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group",
                selectedOrder?.id === order.id && "ring-2 ring-primary border-transparent"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", getStatusColor(order.status))}>
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{order.customer_name}</h3>
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(order.status))}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <CalendarIcon className="w-3 h-3" />
                    {moment(order.created_at).format('DD MMM, HH:mm')} • {order.delivery_type === 'pickup' ? 'Recoger' : 'Entrega'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Total</p>
                  <p className="text-lg font-bold">${order.total_price.toLocaleString()}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
          {filteredOrders.length === 0 && (
            <div className="py-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed border-border">
              No hay pedidos que coincidan con el filtro.
            </div>
          )}
        </div>

        {/* Order Details Sidebar */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedOrder ? (
              <motion.div
                key={selectedOrder.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl border border-border/50 shadow-lg overflow-hidden sticky top-24"
              >
                <div className="p-6 border-b bg-muted/30 flex items-center justify-between">
                  <h3 className="font-bold font-heading">Detalles del Pedido</h3>
                  <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-8 space-y-8">
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Cliente</p>
                        <p className="font-bold">{selectedOrder.customer_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Teléfono</p>
                        <a href={`tel:${selectedOrder.customer_phone}`} className="font-bold hover:text-primary transition-colors">
                          {selectedOrder.customer_phone}
                        </a>
                      </div>
                    </div>
                    {selectedOrder.delivery_type === 'delivery' && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Dirección de Entrega</p>
                          <p className="font-medium text-sm leading-relaxed">{selectedOrder.delivery_address}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Items */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-2">Productos</p>
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.product_name} <span className="font-bold text-foreground">x{item.quantity}</span></span>
                        <span className="font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-2xl text-primary">${selectedOrder.total_price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Acciones</p>
                    {selectedOrder.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdateStatus(selectedOrder.id!, 'completed')}
                          className="grow py-3 rounded-xl bg-green-500 text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Completar
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(selectedOrder.id!, 'cancelled')}
                          className="grow py-3 rounded-xl bg-destructive text-white font-bold text-sm shadow-lg shadow-destructive/20 hover:shadow-destructive/30 transition-all flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancelar
                        </button>
                      </div>
                    )}
                    <a
                      href={`https://wa.me/${selectedOrder.customer_phone.replace(/\D/g, '')}?text=Hola%20${selectedOrder.customer_name},%20te%20contacto%20de%20NaiNai%20Brownies%20sobre%20tu%20pedido...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/30 transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Contactar por WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-3xl border border-dashed border-border">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">Selecciona un pedido para ver los detalles.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
