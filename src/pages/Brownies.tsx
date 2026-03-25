import { motion } from 'motion/react';
import SectionHeading from '@/src/components/public/SectionHeading';
import ProductCard from '@/src/components/public/ProductCard';
import { Product } from '@/src/types';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const allProducts: Product[] = [
  {
    id: '1',
    name: 'King Brownie',
    price: 35,
    description: 'Ultra-thick dark chocolate brownie, glossy crackly top, served on dark slate.',
    image: 'https://picsum.photos/seed/brownie1/800/800',
    active: true,
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Brookie Grande',
    price: 45,
    description: 'Cookie-brownie hybrid, golden top with gooey brownie underneath.',
    image: 'https://picsum.photos/seed/brownie2/800/800',
    active: true,
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Brownie con Nuez',
    price: 40,
    description: 'Classic brownie with visible toasted walnuts.',
    image: 'https://picsum.photos/seed/brownie3/800/800',
    active: true,
    sort_order: 3,
  },
  {
    id: '4',
    name: 'Brookie Pequeño',
    price: 25,
    description: 'Smaller version of our famous Brookie, perfect for a quick treat.',
    image: 'https://picsum.photos/seed/brownie4/800/800',
    active: true,
    sort_order: 4,
  },
];

export default function Brownies() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nuestros Brownies"
          subtitle="Explora nuestro catálogo completo de brownies artesanales. Cada uno es una experiencia única de sabor."
        />
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
    </div>
  );
}
