import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Promociones() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-border/50"
        >
          {/* Top Portion */}
          <div className="relative aspect-video">
            <img
              src="/images/Promo.jpg"
              alt="King Brownie Promo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-6 right-6 bg-primary text-white px-6 py-2 rounded-full font-bold text-xl shadow-lg">
              2 x $60
            </div>
          </div>

          {/* Bottom Portion */}
          <div className="p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              Promoción Especial
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              King Brownie — 2 por $60
            </h3>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Disfruta de nuestro brownie más icónico al doble. Perfecto para compartir con esa persona especial o simplemente para darte un gusto extra.
            </p>
            <Link
              to="/ordenar"
              className="inline-block w-full px-10 py-5 rounded-full bg-primary text-white font-bold text-xl shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
            >
              Aprovechar Promoción
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
