import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle2, MessageCircle, MapPin, Truck, Store } from 'lucide-react';
import { useStore } from '@/src/store';
import { cn } from '@/src/lib/utils';

export default function Ordenar() {
  const { addOrder } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    delivery_type: 'recoleccion' as 'entrega' | 'recoleccion',
    address: '',
    order_details: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    addOrder({
      customer_name: formData.customer_name,
      customer_phone: formData.phone,
      delivery_type: formData.delivery_type === 'entrega' ? 'delivery' : 'pickup',
      delivery_address: formData.address,
      items: [{ product_id: 'custom', product_name: formData.order_details, quantity: 1, price: 0 }],
      total_price: 0,
      status: 'pending',
      created_at: new Date().toISOString(),
    });
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                  <ShoppingBag className="w-4 h-4" />
                  Pedidos
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Haz tu Pedido</h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  Cuéntanos qué brownies quieres y cómo prefieres recibirlos. Te confirmaremos por WhatsApp en breve.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border/50">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Nombre*</label>
                      <input
                        required
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Teléfono*</label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Tu número de WhatsApp"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-foreground block">Tipo de Entrega*</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, delivery_type: 'recoleccion' })}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                          formData.delivery_type === 'recoleccion'
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Store className="w-6 h-6" />
                        <div>
                          <p className="font-bold">Recolección</p>
                          <p className="text-xs opacity-70">En nuestro punto de entrega</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, delivery_type: 'entrega' })}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                          formData.delivery_type === 'entrega'
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Truck className="w-6 h-6" />
                        <div>
                          <p className="font-bold">A Domicilio</p>
                          <p className="text-xs opacity-70">Envío a tu ubicación</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.delivery_type === 'entrega' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-2"
                      >
                        <label className="text-sm font-semibold text-foreground">Dirección de Entrega*</label>
                        <textarea
                          required
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                          placeholder="Calle, número, colonia, municipio..."
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Detalles del Pedido*</label>
                    <textarea
                      required
                      name="order_details"
                      value={formData.order_details}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                      placeholder="Ej. 2 King Brownies, 1 Brookie Grande..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Notas Adicionales</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                      placeholder="¿Alguna instrucción especial?"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Enviando...' : 'Realizar Pedido'}
                    </button>
                    <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      La confirmación se realiza por WhatsApp
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-bold font-heading mb-6">¡Pedido Recibido!</h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Gracias por tu pedido. Hemos recibido los detalles y nos pondremos en contacto contigo por WhatsApp muy pronto para confirmarlo y coordinar la entrega.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
              >
                Hacer otro pedido
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
