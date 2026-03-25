import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  BarChart3, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  Lock
} from 'lucide-react';
import { auth } from '@/src/firebase';
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { cn } from '@/src/lib/utils';

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Productos', href: '/admin/productos', icon: Package },
  { name: 'Ventas', href: '/admin/ventas', icon: ShoppingCart },
  { name: 'Socios', href: '/admin/socios', icon: Users },
  { name: 'Entregas', href: '/admin/entregas', icon: Truck },
  { name: 'Reportes', href: '/admin/reportes', icon: BarChart3 },
];

export default function AdminLayout() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Check if user is admin (for this demo, any logged in user is admin, 
      // but in production we'd check the role or email)
      // The security rules will handle the actual data protection.
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border/50 text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold font-heading mb-4">Acceso Admin</h1>
          <p className="text-muted-foreground mb-10">
            Inicia sesión con tu cuenta de administrador para gestionar NaiNai Brownies.
          </p>
          <button
            onClick={handleLogin}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-primary-glow hover:shadow-primary-glow-hover transition-all flex items-center justify-center gap-3"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5 bg-white rounded-full p-0.5" alt="Google" />
            Iniciar con Google
          </button>
          <Link to="/" className="inline-block mt-8 text-sm text-muted-foreground hover:text-primary transition-colors">
            Volver al sitio público
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r fixed h-full z-40">
        <div className="p-8">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-heading font-bold text-xl">
              NN
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-primary">
              NAINAI
            </span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                location.pathname === link.href
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Ver Sitio
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-40 flex items-center justify-between px-4">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-heading font-bold text-lg">
            NN
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-primary">
            NAINAI
          </span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <Link to="/admin" className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-heading font-bold text-xl">
                    NN
                  </div>
                  <span className="font-heading font-bold text-2xl tracking-tight text-primary">
                    NAINAI
                  </span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-grow px-4 space-y-1 overflow-y-auto">
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all",
                      location.pathname === link.href
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <link.icon className="w-6 h-6" />
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t space-y-1">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <ExternalLink className="w-6 h-6" />
                  Ver Sitio
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-4 rounded-xl text-base font-medium text-destructive hover:bg-destructive/5 transition-all"
                >
                  <LogOut className="w-6 h-6" />
                  Cerrar Sesión
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
