import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/src/types';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {!product.active && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-foreground px-4 py-1 rounded-full font-bold text-sm uppercase tracking-wider">
              Agotado
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-heading font-bold text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="font-bold text-primary text-xl">
            ${product.price}
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
          {product.description}
        </p>
        <Link
          to="/ordenar"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-primary text-primary font-bold text-sm transition-all hover:bg-primary hover:text-white"
        >
          <ShoppingBag className="w-4 h-4" />
          Ordenar
        </Link>
      </div>
    </motion.div>
  );
}
