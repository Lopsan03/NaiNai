import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Plus, X, Check, Calendar as CalendarIcon, Clock, Package, Store, Search } from 'lucide-react';
import { useStore } from '@/src/store';
import { cn } from '@/src/lib/utils';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

export default function Entregas() {
  const [searchParams] = useSearchParams();
  const partnerIdParam = searchParams.get('partner');
  const { partners, products, deliveries, addDelivery, markDeliveryAsSold } = useStore();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'register' | 'history'>('register');
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(partnerIdParam || '');
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

  const activePartners = partners.filter(p => p.active).sort((a, b) => a.name.localeCompare(b.name));
  const activeProducts = products.filter(p => p.active).sort((a, b) => a.sort_order - b.sort_order);

  const handleRegisterDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPartnerId) return alert('Selecciona un socio');

    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = activeProducts.find(p => p.id === id);
        return { product_id: id, product_name: product?.name || 'Producto', quantity: qty };
      });

    if (items.length === 0) return alert('Agrega al menos un producto');

    const partner = activePartners.find(p => p.id === selectedPartnerId);
    const now = moment();
    addDelivery({
      partner_id: selectedPartnerId,
      partner_name: partner?.name || 'Socio',
      items,
      delivery_date: now.format('YYYY-MM-DD'),
      delivery_time: now.format('HH:mm'),
      sold: false,
    });

    const resetQuants: { [productId: string]: number } = {};
    activeProducts.forEach(p => { resetQuants[p.id!] = 0; });
    setQuantities(resetQuants);
    setSelectedPartnerId('');
    setActiveTab('history');
  };

  const handleMarkAsSold = (delivery: typeof deliveries[0]) => {
    if (!confirm('¿Marcar este lote como vendido?')) return;
    markDeliveryAsSold(delivery.id!);
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Entregas</h1>
          <p className="text-muted-foreground">Registra y gestiona las entregas de brownies a socios.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-border/50 shadow-sm self-start">
          <button
            onClick={() => setActiveTab('register')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'register' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Plus className="w-4 h-4" />
            Registrar Entrega
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'history' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <HistoryIcon className="w-4 h-4" />
            Lotes / Vendidos
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'register' ? (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl"
          >
            <form onSubmit={handleRegisterDelivery} className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Store className="w-4 h-4 text-primary" />
                    Seleccionar Socio*
                  </label>
                  <select
                    required
                    value={selectedPartnerId}
                    onChange={(e) => setSelectedPartnerId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                  >
                    <option value="">Elegir socio...</option>
                    {activePartners.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    Cantidades por Producto
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeProducts.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-4 rounded-2xl border border-border bg-muted/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border">
                            <img src={product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <span className="font-bold text-sm">{product.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setQuantities({ ...quantities, [product.id!]: Math.max(0, (quantities[product.id!] || 0) - 1) })}
                            className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold">{quantities[product.id!] || 0}</span>
                          <button
                            type="button"
                            onClick={() => setQuantities({ ...quantities, [product.id!]: (quantities[product.id!] || 0) + 1 })}
                            className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all disabled:opacity-50"
                  >
                    {loading ? 'Registrando...' : 'Registrar Entrega'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {deliveries.map((delivery, i) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{delivery.partner_name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <CalendarIcon className="w-3 h-3" />
                        {delivery.delivery_date} • {delivery.delivery_time}
                      </div>
                    </div>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    delivery.sold ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                  )}>
                    {delivery.sold ? 'Vendido' : 'Pendiente'}
                  </span>
                </div>

                <div className="space-y-3 grow">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Productos Entregados</p>
                  {delivery.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{item.product_name}</span>
                      <span className="font-bold">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t">
                  {delivery.sold ? (
                    <div className="flex items-center justify-center gap-2 text-green-500 font-bold text-sm">
                      <Check className="w-5 h-5" />
                      Vendido el {delivery.sold_date} a las {delivery.sold_time}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleMarkAsSold(delivery)}
                      className="w-full py-3 rounded-xl bg-green-500 text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Registrar Venta de Lote
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {deliveries.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed border-border">
                No hay entregas registradas.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HistoryIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
