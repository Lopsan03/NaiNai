import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/public/PublicLayout';
import Home from './pages/Home';
import Brownies from './pages/Brownies';
import Promociones from './pages/Promociones';
import Eventos from './pages/Eventos';
import SobreNosotros from './pages/SobreNosotros';
import Ordenar from './pages/Ordenar';
import Contacto from './pages/Contacto';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Productos from './pages/admin/Productos';
import Ventas from './pages/admin/Ventas';
import Socios from './pages/admin/Socios';
import Entregas from './pages/admin/Entregas';
import Reportes from './pages/admin/Reportes';
import Pedidos from './pages/admin/Pedidos';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="brownies" element={<Brownies />} />
          <Route path="promociones" element={<Promociones />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="sobre-nosotros" element={<SobreNosotros />} />
          <Route path="ordenar" element={<Ordenar />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Productos />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="socios" element={<Socios />} />
          <Route path="entregas" element={<Entregas />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="pedidos" element={<Pedidos />} />
        </Route>
      </Routes>
    </Router>
  );
}
