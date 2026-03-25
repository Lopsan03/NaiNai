import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, PartyPopper, CakeSlice, Users, Flame, Award, Heart, Star, Quote } from 'lucide-react';
import SectionHeading from '@/src/components/public/SectionHeading';
import ProductCard from '@/src/components/public/ProductCard';
import { Product } from '@/src/types';

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'King Brownie',
    price: 35,
    description: 'Ultra-thick dark chocolate brownie, glossy crackly top, served on dark slate.',
    image: '/images/Brownie.png',
    active: true,
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Brookie Grande',
    price: 45,
    description: 'Cookie-brownie hybrid, golden top with gooey brownie underneath.',
    image: '/images/Brownie.png',
    active: true,
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Brownie con Nuez',
    price: 40,
    description: 'Classic brownie with visible toasted walnuts.',
    image: '/images/Brownie.png',
    active: true,
    sort_order: 3,
  },
  {
    id: '4',
    name: 'Brookie Pequeño',
    price: 25,
    description: 'Smaller version of our famous Brookie, perfect for a quick treat.',
    image: '/images/Brownie.png',
    active: true,
    sort_order: 4,
  },
];

const testimonials = [
  {
    quote: "Los mejores brownies que he probado en Monterrey. El King Brownie es de otro mundo.",
    author: "Sofía García",
  },
  {
    quote: "Pedimos para el cumpleaños de mi hija y todos los invitados quedaron encantados. ¡Súper recomendados!",
    author: "Ricardo Treviño",
  },
  {
    quote: "La calidad es increíble. Se nota que están hechos con ingredientes premium y mucho amor.",
    author: "Mariana Rodríguez",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Main BG.jpeg"
            alt="NaiNai Brownies"
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8"
            >
              <span className="text-primary">🍫</span> Brownies Artesanales en Monterrey
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 leading-[1.1]">
              Los brownies que todos en Monterrey están probando
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
              Hechos a mano con ingredientes premium para crear la textura perfecta: crujientes por fuera, melcochos por dentro.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/ordenar"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all flex items-center justify-center gap-2"
              >
                Ordenar Ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/brownies"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all text-center"
              >
                Ver Menú
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Nuestros Brownies"
            subtitle="Descubre nuestra selección de brownies artesanales, horneados diariamente con los mejores ingredientes."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/brownies"
              className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-3 transition-all"
            >
              Ver todo el menú
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#e9161a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/Promo.jpg"
                alt="Promoción Especial"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-red-600 text-sm font-bold mb-6">
                <span className="w-3 h-3 bg-red-600 rounded-full" />
                Promoción Especial
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
                King Brownie — 2 por $60
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Disfruta de nuestro brownie más icónico al doble. Perfecto para compartir (o no).
              </p>
              <Link
                to="/ordenar"
                className="inline-block px-10 py-4 rounded-full bg-white text-red-600 font-bold text-lg shadow-lg hover:bg-white/90 transition-all"
              >
                Aprovechar Promoción
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <PartyPopper className="w-4 h-4" />
                Eventos Especiales
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">
                Brownies para Eventos Especiales
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Hacemos que tus celebraciones sean inolvidables con nuestros brownies. Desde bodas y cumpleaños hasta eventos corporativos, tenemos la opción perfecta para ti.
              </p>

              <div className="space-y-6 mb-10">
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

              <Link
                to="/eventos"
                className="inline-block px-10 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
              >
                Solicitar Cotización
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/Special events.png"
                  alt="Eventos NaiNai"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary rounded-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why NaiNai */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="¿Por qué NaiNai?"
            subtitle="Nos apasiona crear momentos dulces con la mejor calidad y sabor."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Flame, title: "Horneados Diariamente", text: "Frescura garantizada en cada bocado." },
              { icon: Award, title: "Calidad Premium", text: "Usamos solo los mejores ingredientes." },
              { icon: Heart, title: "Hechos con Amor", text: "Recetas artesanales con un toque único." },
              { icon: Star, title: "Sabor Inigualable", text: "La textura perfecta que te encantará." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-border/50 text-center hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Lo que dicen nuestros clientes"
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative"
              >
                <Quote className="w-10 h-10 text-white/20 absolute top-6 right-6" />
                <p className="text-lg italic mb-6 text-white/90 leading-relaxed">
                  "{t.quote}"
                </p>
                <h4 className="font-heading font-bold text-xl">{t.author}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">
              ¿Listo para probar los mejores brownies de Monterrey?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Haz tu pedido hoy mismo y descubre por qué todos están hablando de NaiNai.
            </p>
            <Link
              to="/ordenar"
              className="inline-block px-12 py-5 rounded-full bg-primary text-white font-bold text-xl shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
            >
              Ordenar Brownies
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
