import { Link } from 'react-router-dom';
import { MapPin, Phone, Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-white rounded flex items-center justify-center text-primary font-heading font-bold text-2xl">
                NN
              </div>
              <span className="font-heading font-bold text-3xl tracking-tight text-white">
                NAINAI
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-xs">
              Brownies artesanales hechos con amor en Monterrey, Nuevo León.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-heading font-bold text-xl mb-6">Menú</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/brownies" className="text-primary-foreground/70 hover:text-white transition-colors">Nuestros Brownies</Link></li>
              <li><Link to="/promociones" className="text-primary-foreground/70 hover:text-white transition-colors">Promociones</Link></li>
              <li><Link to="/eventos" className="text-primary-foreground/70 hover:text-white transition-colors">Eventos</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-heading font-bold text-xl mb-6">Empresa</h4>
            <ul className="space-y-4">
              <li><Link to="/sobre-nosotros" className="text-primary-foreground/70 hover:text-white transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="text-primary-foreground/70 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/ordenar" className="text-primary-foreground/70 hover:text-white transition-colors">Haz tu Pedido</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-heading font-bold text-xl mb-6">Contacto</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 shrink-0" />
                <span className="text-primary-foreground/70">Monterrey, Nuevo León, México</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span className="text-primary-foreground/70">+52 81 0000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span className="text-primary-foreground/70">hola@nainaibrownies.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 text-center">
          <p className="text-primary-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} NaiNai Brownies. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
