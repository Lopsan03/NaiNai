import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Plus, Edit2, Trash2, X, Check, Image as ImageIcon } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '@/src/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Product } from '@/src/types';
import { cn } from '@/src/lib/utils';

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    active: true,
    sort_order: 0,
  });

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('sort_order', 'asc'));
      const snap = await getDocs(q);
      setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        active: product.active,
        sort_order: product.sort_order,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        description: '',
        image: '',
        active: true,
        sort_order: products.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id!), formData);
      } else {
        await addDoc(collection(db, 'products'), formData);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      handleFirestoreError(error, editingProduct ? OperationType.UPDATE : OperationType.CREATE, 'products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'products');
    } finally {
      setLoading(false);
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Productos</h1>
          <p className="text-muted-foreground">Gestiona el catálogo de brownies de NaiNai.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
        >
          <Plus className="w-5 h-5" />
          Agregar Producto
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={cn(
              "bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all",
              !product.active && "opacity-60"
            )}
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.image || 'https://picsum.photos/seed/placeholder/400/400'}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="p-2 rounded-lg bg-white/90 backdrop-blur-sm text-foreground hover:bg-white shadow-sm transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id!)}
                  className="p-2 rounded-lg bg-white/90 backdrop-blur-sm text-destructive hover:bg-white shadow-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                  product.active ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                )}>
                  {product.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                <span className="font-bold text-primary">${product.price}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                <Package className="w-3 h-3" />
                Orden: {product.sort_order}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex items-center justify-between bg-muted/30">
                <h2 className="text-xl font-bold font-heading">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Nombre del Producto*</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Ej. King Brownie"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Precio ($)*</label>
                    <input
                      required
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Orden de Visualización</label>
                    <input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">URL de la Imagen</label>
                  <div className="flex gap-2">
                    <input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="flex-grow px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="https://..."
                    />
                    <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center bg-muted/30 overflow-hidden shrink-0">
                      {formData.image ? (
                        <img src={formData.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Describe el brownie..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, active: !formData.active })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      formData.active ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      formData.active ? "left-7" : "left-1"
                    )} />
                  </button>
                  <span className="text-sm font-medium">Producto Activo</span>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 rounded-xl border border-border font-bold hover:bg-muted transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-grow py-4 rounded-xl bg-primary text-white font-bold shadow-primary-glow hover:shadow-primary-glow-hover transition-all disabled:opacity-50"
                  >
                    {loading ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
