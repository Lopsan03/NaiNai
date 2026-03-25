import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, History, Check, DollarSign, Package, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '@/src/firebase';
import { collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { Product, IndividualSale } from '@/src/types';
import { cn } from '@/src/lib/utils';
import moment from 'moment';

export default function Ventas() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<IndividualSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pos' | 'history'>('pos');
  const [sellingId, setSellingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [productsSnap, salesSnap] = await Promise.all([
        getDocs(query(collection(db, 'products'), orderBy('sort_order', 'asc'))),
        getDocs(query(collection(db, 'individual_sales'), orderBy('sale_date', 'desc'), orderBy('sale_time', 'desc'), limit(50))),
      ]);

      setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)).filter(p => p.active));
      setSales(salesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as IndividualSale)));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'ventas_data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSale = async (product: Product) => {
    setSellingId(product.id!);
    try {
      const now = moment();
      await addDoc(collection(db, 'individual_sales'), {
        items: [{
          product_id: product.id,
          product_name: product.name,
          quantity: 1,
          price: product.price,
        }],
        total_price: product.price,
        sale_date: now.format('YYYY-MM-DD'),
        sale_time: now.format('HH:mm'),
      });
      
      // Optimistic update for history if on that tab, but we'll just refresh
      setTimeout(() => setSellingId(null), 1000);
      fetchData();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'individual_sales');
      setSellingId(null);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Ventas</h1>
          <p className="text-muted-foreground">Registra ventas individuales y consulta el historial.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-border/50 shadow-sm self-start">
          <button
            onClick={() => setActiveTab('pos')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'pos' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            POS
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'history' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <History className="w-4 h-4" />
            Historial
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'pos' ? (
          <motion.div
            key="pos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || 'https://picsum.photos/seed/placeholder/400/400'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                    <span className="font-bold text-primary text-xl">${product.price}</span>
                  </div>
                  <button
                    onClick={() => handleSale(product)}
                    disabled={sellingId === product.id}
                    className={cn(
                      "mt-auto w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2",
                      sellingId === product.id
                        ? "bg-green-500 text-white"
                        : "bg-primary text-white shadow-primary-glow hover:shadow-primary-glow-hover"
                    )}
                  >
                    {sellingId === product.id ? (
                      <>
                        <Check className="w-6 h-6" />
                        ¡Vendido!
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-5 h-5" />
                        Vender
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 border-b">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Producto</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Precio</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Fecha</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Package className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm">
                            {sale.items?.map(i => i.product_name).join(', ') || 'Venta'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-primary">${sale.total_price?.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />
                          {sale.sale_date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {sale.sale_time}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {sales.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center text-muted-foreground">
                        No hay ventas registradas en el historial.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
