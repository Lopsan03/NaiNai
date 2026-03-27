import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Phone, CheckCircle2, Send } from 'lucide-react';

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 400);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            >
              {/* Left Column: Info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8">Ponte en Contacto</h1>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  ¿Tienes alguna duda, sugerencia o simplemente quieres saludarnos? Nos encantaría escucharte. Completa el formulario y te responderemos lo antes posible.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-1">Ubicación</h3>
                      <p className="text-muted-foreground">Monterrey, Nuevo León, México</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-1">Correo Electrónico</h3>
                      <p className="text-muted-foreground">hola@nainaibrownies.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-1">Teléfono</h3>
                      <p className="text-muted-foreground">+52 81 0000 0000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Nombre*</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Correo Electrónico*</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Mensaje*</label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? 'Enviando...' : (
                      <>
                        Enviar Mensaje
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
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
              <h2 className="text-4xl font-bold font-heading mb-6">¡Mensaje Enviado!</h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos a la brevedad posible. ¡Que tengas un dulce día!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
