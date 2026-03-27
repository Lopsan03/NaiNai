import { motion } from 'motion/react';
import SectionHeading from '@/src/components/public/SectionHeading';
import ProductCard from '@/src/components/public/ProductCard';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useStore } from '@/src/store';

export default function Brownies() {
  const { products } = useStore();
  const allProducts = products.filter(p => p.active).sort((a, b) => a.sort_order - b.sort_order);
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Brownie.png"
            alt="Nuestros Brownies"
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
              Nuestros Brownies
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
              Explora nuestro catálogo completo de brownies artesanales. Cada uno es una experiencia única de sabor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Promo Highlight Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 bg-primary/5 border-y border-primary/10 py-16 px-6 rounded-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-sm font-bold mb-6">
            <Star className="w-4 h-4 fill-current" />
            Promoción Especial
          </div>
          <h3 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            King Brownie — 2 por $60
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            No te pierdas nuestra promoción estrella. El doble de sabor por un precio increíble.
          </p>
          <Link
            to="/ordenar"
            className="inline-block px-10 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
          >
            Aprovechar Promoción
          </Link>
        </motion.div>
        </div>
      </section>
    </div>
  );
}
