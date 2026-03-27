import { motion } from 'motion/react';
import { Package, ShoppingCart, Users, DollarSign, Truck, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/src/store';
import { cn } from '@/src/lib/utils';

export default function Dashboard() {
  const { products, sales, partners } = useStore();

  const totalRevenue = sales.reduce((acc, s) => acc + (s.total_price || 0), 0);
  const recentSales = sales.slice(0, 5);
  const loading = false;

  const statCards = [
    { name: 'Productos', value: products.length, icon: Package, color: 'bg-blue-500' },
    { name: 'Ventas Totales', value: sales.length, icon: ShoppingCart, color: 'bg-green-500' },
    { name: 'Socios', value: partners.length, icon: Users, color: 'bg-purple-500' },
    { name: 'Ingresos Totales', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-primary' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold font-heading mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Resumen general de las operaciones de NaiNai.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm flex items-center gap-5"
          >
            <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg", stat.color)}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sales */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading">Ventas Recientes</h2>
            <Link to="/admin/ventas" className="text-sm text-primary font-bold hover:underline">Ver todas</Link>
          </div>
          <div className="divide-y">
            {recentSales.length > 0 ? (
              recentSales.map((sale) => (
                <div key={sale.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">
                        {sale.items?.map(i => i.product_name).join(', ') || 'Venta'}
                      </p>
                      <p className="text-xs text-muted-foreground">{sale.sale_date} • {sale.sale_time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-primary">${sale.total_price?.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Completado</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-muted-foreground">No hay ventas registradas.</div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-border/50 shadow-sm p-8"
        >
          <h2 className="text-xl font-bold font-heading mb-8">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/ventas"
              className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <ShoppingCart className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-3" />
              <span className="font-bold text-sm">Nueva Venta</span>
            </Link>
            <Link
              to="/admin/productos"
              className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <Package className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-3" />
              <span className="font-bold text-sm">Gestionar Stock</span>
            </Link>
            <Link
              to="/admin/entregas"
              className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <Truck className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-3" />
              <span className="font-bold text-sm">Registrar Entrega</span>
            </Link>
            <Link
              to="/admin/reportes"
              className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <BarChart3 className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-3" />
              <span className="font-bold text-sm">Ver Reportes</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
