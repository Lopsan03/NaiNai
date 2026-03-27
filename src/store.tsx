import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, IndividualSale, Partner, PartnerDelivery, Order } from './types';
import moment from 'moment';

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'King Brownie', price: 35, description: 'Ultra-thick dark chocolate brownie, glossy crackly top.', image: '/images/Brownie.png', active: true, sort_order: 1 },
  { id: '2', name: 'Brookie Grande', price: 45, description: 'Cookie-brownie hybrid, golden top with gooey brownie underneath.', image: '/images/Brownie.png', active: true, sort_order: 2 },
  { id: '3', name: 'Brownie con Nuez', price: 40, description: 'Classic brownie with visible toasted walnuts.', image: '/images/Brownie.png', active: true, sort_order: 3 },
  { id: '4', name: 'Brookie Pequeño', price: 25, description: 'Smaller version of our famous Brookie, perfect for a quick treat.', image: '/images/Brownie.png', active: true, sort_order: 4 },
];

function load<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch { return fallback; }
}

function save<T>(key: string, v: T) {
  localStorage.setItem(key, JSON.stringify(v));
}

let _counter = Date.now();
function uid() { return (++_counter).toString(36); }

interface StoreCtx {
  products: Product[];
  sales: IndividualSale[];
  partners: Partner[];
  deliveries: PartnerDelivery[];
  orders: Order[];
  addProduct(p: Omit<Product, 'id'>): void;
  updateProduct(id: string, p: Partial<Omit<Product, 'id'>>): void;
  deleteProduct(id: string): void;
  addSale(s: Omit<IndividualSale, 'id'>): void;
  addPartner(p: Omit<Partner, 'id'>): void;
  updatePartner(id: string, p: Partial<Omit<Partner, 'id'>>): void;
  deletePartner(id: string): void;
  addDelivery(d: Omit<PartnerDelivery, 'id'>): void;
  markDeliveryAsSold(id: string): void;
  addOrder(o: Omit<Order, 'id'>): void;
  updateOrderStatus(id: string, status: Order['status']): void;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => load('nn_products', INITIAL_PRODUCTS));
  const [sales, setSales] = useState<IndividualSale[]>(() => load('nn_sales', []));
  const [partners, setPartners] = useState<Partner[]>(() => load('nn_partners', []));
  const [deliveries, setDeliveries] = useState<PartnerDelivery[]>(() => load('nn_deliveries', []));
  const [orders, setOrders] = useState<Order[]>(() => load('nn_orders', []));

  useEffect(() => { save('nn_products', products); }, [products]);
  useEffect(() => { save('nn_sales', sales); }, [sales]);
  useEffect(() => { save('nn_partners', partners); }, [partners]);
  useEffect(() => { save('nn_deliveries', deliveries); }, [deliveries]);
  useEffect(() => { save('nn_orders', orders); }, [orders]);

  const addProduct = useCallback((p: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...p, id: uid() }]);
  }, []);

  const updateProduct = useCallback((id: string, p: Partial<Omit<Product, 'id'>>) => {
    setProducts(prev => prev.map(x => x.id === id ? { ...x, ...p } : x));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(x => x.id !== id));
  }, []);

  const addSale = useCallback((s: Omit<IndividualSale, 'id'>) => {
    setSales(prev => [{ ...s, id: uid() }, ...prev]);
  }, []);

  const addPartner = useCallback((p: Omit<Partner, 'id'>) => {
    setPartners(prev => [...prev, { ...p, id: uid() }]);
  }, []);

  const updatePartner = useCallback((id: string, p: Partial<Omit<Partner, 'id'>>) => {
    setPartners(prev => prev.map(x => x.id === id ? { ...x, ...p } : x));
  }, []);

  const deletePartner = useCallback((id: string) => {
    setPartners(prev => prev.filter(x => x.id !== id));
  }, []);

  const addDelivery = useCallback((d: Omit<PartnerDelivery, 'id'>) => {
    setDeliveries(prev => [{ ...d, id: uid() }, ...prev]);
  }, []);

  const markDeliveryAsSold = useCallback((id: string) => {
    const now = moment();
    setDeliveries(prev => prev.map(d => d.id === id ? {
      ...d, sold: true,
      sold_date: now.format('YYYY-MM-DD'),
      sold_time: now.format('HH:mm'),
    } : d));
  }, []);

  const addOrder = useCallback((o: Omit<Order, 'id'>) => {
    setOrders(prev => [{ ...o, id: uid() }, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  return (
    <Ctx.Provider value={{
      products, sales, partners, deliveries, orders,
      addProduct, updateProduct, deleteProduct,
      addSale,
      addPartner, updatePartner, deletePartner,
      addDelivery, markDeliveryAsSold,
      addOrder, updateOrderStatus,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
