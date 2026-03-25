import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PartyPopper, CheckCircle2, Users, CakeSlice, Calendar, MessageCircle } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '@/src/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Eventos() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    event_type: '',
    guest_count: '',
    brownie_count: '',
    event_date: '',
    comments: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'event_requests'), {
        ...formData,
        guest_count: Number(formData.guest_count),
        brownie_count: Number(formData.brownie_count),
        status: 'pendiente',
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'event_requests');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Special events.png"
            alt="Eventos Especiales"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 leading-[1.1]">
              Brownies para Eventos Especiales
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
              Hacemos que tus celebraciones sean inolvidables con nuestros brownies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
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
                <div className="lg:sticky lg:top-32">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                    <PartyPopper className="w-4 h-4" />
                    Eventos Especiales
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8">
                    Brownies para Eventos Especiales
                  </h1>
                  <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                    Hacemos que tus celebraciones sean inolvidables con nuestros brownies. Desde bodas y cumpleaños hasta eventos corporativos, tenemos la opción perfecta para ti.
                  </p>

                  <div className="space-y-6 mb-12">
                    {[
                      { icon: Users, text: "Ideal para grupos de cualquier tamaño" },
                      { icon: PartyPopper, text: "Personalización de empaques disponible" },
                      { icon: CakeSlice, text: "Mesas de postres espectaculares" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                    <img
                      src="/images/Special events.png"
                      alt="Eventos NaiNai"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              {/* Right Column: Form */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border/50">
                <h2 className="text-2xl font-bold font-heading mb-8">Solicitar Cotización</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Correo Electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Tipo de Evento*</label>
                      <select
                        required
                        name="event_type"
                        value={formData.event_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                      >
                        <option value="">Selecciona uno</option>
                        <option value="Boda">Boda</option>
                        <option value="Cumpleaños">Cumpleaños</option>
                        <option value="Corporativo">Corporativo</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Fecha del Evento*</label>
                      <input
                        required
                        type="date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Número de Invitados</label>
                      <input
                        type="number"
                        name="guest_count"
                        value={formData.guest_count}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Ej. 50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Cantidad de Brownies</label>
                      <input
                        type="number"
                        name="brownie_count"
                        value={formData.brownie_count}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Ej. 100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Comentarios Adicionales</label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                      placeholder="Cuéntanos más sobre tu evento..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Enviando...' : 'Solicitar Cotización'}
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
              <h2 className="text-4xl font-bold font-heading mb-6">¡Solicitud Enviada!</h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Gracias por interesarte en NaiNai para tu evento. Hemos recibido tu solicitud y nos pondremos en contacto contigo muy pronto para darte una cotización personalizada.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
              >
                Enviar otra solicitud
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </div>
  );
}
