import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/src/lib/utils';

export default function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <main className={cn("flex-grow", !isHomePage && "pt-16 lg:pt-20")}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
