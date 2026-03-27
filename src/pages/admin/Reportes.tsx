import { motion } from 'motion/react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, Calendar as CalendarIcon, Download } from 'lucide-react';
import { useStore } from '@/src/store';
import { cn } from '@/src/lib/utils';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export default function Reportes() {
  const { sales, deliveries, products, partners } = useStore();

  // Calculate Stats
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.total_price || 0), 0);
  const totalSalesCount = sales.length;
  const totalItemsSold = sales.reduce((sum, sale) => sum + (sale.items?.reduce((iSum, item) => iSum + item.quantity, 0) || 0), 0);
  const avgTicket = totalSalesCount > 0 ? totalRevenue / totalSalesCount : 0;

  // Chart Data: Sales by Product
  const productSalesMap: { [name: string]: number } = {};
  sales.forEach(sale => {
    sale.items?.forEach(item => {
      productSalesMap[item.product_name] = (productSalesMap[item.product_name] || 0) + item.quantity;
    });
  });
  const productSalesData = Object.entries(productSalesMap).map(([name, value]) => ({ name, value }));

  // Chart Data: Sales by Day (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => moment().subtract(i, 'days').format('YYYY-MM-DD')).reverse();
  const dailySalesData = last7Days.map(date => {
    const daySales = sales.filter(s => s.sale_date === date);
    return {
      date: moment(date).format('DD MMM'),
      revenue: daySales.reduce((sum, s) => sum + s.total_price, 0),
    };
  });

  const COLORS = ['#FF6321', '#FF8B57', '#FFB38E', '#FFDBC5', '#000000'];

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Reportes</h1>
          <p className="text-muted-foreground">Analiza el rendimiento de tus ventas y socios.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white text-sm font-bold hover:bg-muted transition-all">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Ventas Totales', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500' },
          { label: 'Tickets', value: totalSalesCount, icon: ShoppingBag, color: 'bg-primary' },
          { label: 'Brownies Vendidos', value: totalItemsSold, icon: BarChart3, color: 'bg-blue-500' },
          { label: 'Ticket Promedio', value: `$${avgTicket.toFixed(0)}`, icon: TrendingUp, color: 'bg-purple-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-border/50 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-heading">Ventas (Últimos 7 días)</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarIcon className="w-4 h-4" />
              {moment().subtract(6, 'days').format('D MMM')} - {moment().format('D MMM')}
            </div>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#888' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#888' }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8f8f8' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="revenue" fill="#FF6321" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Product Mix */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm"
        >
          <h3 className="text-xl font-bold font-heading mb-8">Mix de Productos</h3>
          <div className="h-75 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productSalesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 ml-4">
              {productSalesData.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Partners Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden"
      >
        <div className="p-8 border-b flex items-center justify-between">
          <h3 className="text-xl font-bold font-heading">Rendimiento de Socios</h3>
          <button className="text-primary text-sm font-bold hover:underline">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-8 py-4">Socio</th>
                <th className="px-8 py-4">Lotes Entregados</th>
                <th className="px-8 py-4">Estado</th>
                <th className="px-8 py-4 text-right">Última Entrega</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {partners.slice(0, 5).map((partner, i) => {
                const partnerDeliveries = deliveries.filter(d => d.partner_id === partner.id);
                const lastDelivery = partnerDeliveries[0];
                return (
                  <tr key={partner.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-8 py-5 font-bold">{partner.name}</td>
                    <td className="px-8 py-5 text-muted-foreground">{partnerDeliveries.length} lotes</td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        partner.active ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"
                      )}>
                        {partner.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right text-muted-foreground text-sm">
                      {lastDelivery ? lastDelivery.delivery_date : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
