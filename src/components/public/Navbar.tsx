import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Brownies', href: '/brownies' },
  { name: 'Promociones', href: '/promociones' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const isHomePage = location.pathname === '/';
  const shouldShowSolid = scrolled || !isHomePage;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 lg:h-20 flex items-center',
        shouldShowSolid ? 'bg-white/95 backdrop-blur-md shadow-sm border-b' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/NAINAI LOGO.jpeg"
            alt="NaiNai Logo"
            className="w-10 h-10 lg:w-11 lg:h-11 rounded object-cover"
          />
          <span className={cn(
            "font-heading font-bold text-2xl tracking-tight hidden sm:block",
            shouldShowSolid ? "text-primary" : "text-white"
          )}>
            NAINAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                location.pathname === link.href
                  ? 'bg-primary/5 text-primary font-semibold'
                  : shouldShowSolid 
                    ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/ordenar"
            className={cn(
              "hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-primary-glow hover:shadow-primary-glow-hover",
              shouldShowSolid ? "bg-primary text-white" : "bg-white text-primary"
            )}
          >
            <ShoppingBag className="w-4 h-4" />
            Ordenar Ahora
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-full transition-colors",
              shouldShowSolid ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 right-0 bg-white border-b lg:hidden overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    location.pathname === link.href
                      ? 'bg-primary/5 text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/ordenar"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-primary text-white font-semibold text-base shadow-primary-glow"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Ordenar Ahora
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
