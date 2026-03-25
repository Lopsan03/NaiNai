import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Plus, Edit2, Trash2, X, MapPin, Phone, User, Store } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '@/src/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Partner } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

export default function Socios() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Omit<Partner, 'id'>>({
    name: '',
    contact_name: '',
    phone: '',
    address: '',
    active: true,
  });

  const fetchPartners = async () => {
    try {
      const q = query(collection(db, 'partners'), orderBy('name', 'asc'));
      const snap = await getDocs(q);
      setPartners(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Partner)));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'partners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleOpenModal = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        contact_name: partner.contact_name || '',
        phone: partner.phone || '',
        address: partner.address || '',
        active: partner.active,
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        contact_name: '',
        phone: '',
        address: '',
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingPartner) {
        await updateDoc(doc(db, 'partners', editingPartner.id!), formData);
      } else {
        await addDoc(collection(db, 'partners'), formData);
      }
      setIsModalOpen(false);
      fetchPartners();
    } catch (error) {
      handleFirestoreError(error, editingPartner ? OperationType.UPDATE : OperationType.CREATE, 'partners');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este socio?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'partners', id));
      fetchPartners();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'partners');
    } finally {
      setLoading(false);
    }
  };

  if (loading && partners.length === 0) {
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
          <h1 className="text-3xl font-bold font-heading mb-2">Socios</h1>
          <p className="text-muted-foreground">Gestiona las tiendas y socios comerciales de NaiNai.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-primary-glow hover:shadow-primary-glow-hover transition-all"
        >
          <Plus className="w-5 h-5" />
          Agregar Socio
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={cn(
              "bg-white rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all flex flex-col",
              !partner.active && "opacity-60"
            )}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Store className="w-7 h-7" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(partner)}
                  className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id!)}
                  className="p-2 rounded-lg bg-muted/50 text-destructive hover:bg-muted transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-xl leading-tight">{partner.name}</h3>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider",
                  partner.active ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"
                )}>
                  {partner.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <User className="w-4 h-4 shrink-0" />
                  <span>{partner.contact_name || 'Sin contacto'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{partner.phone || 'Sin teléfono'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">{partner.address || 'Sin dirección'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t flex gap-3">
              <Link
                to={`/admin/entregas?partner=${partner.id}`}
                className="flex-grow py-2.5 rounded-xl bg-muted/50 text-foreground font-bold text-xs text-center hover:bg-muted transition-all"
              >
                Entregas
              </Link>
              <Link
                to={`/admin/reportes?partner=${partner.id}`}
                className="flex-grow py-2.5 rounded-xl bg-muted/50 text-foreground font-bold text-xs text-center hover:bg-muted transition-all"
              >
                Ventas
              </Link>
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
                  {editingPartner ? 'Editar Socio' : 'Nuevo Socio'}
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
                  <label className="text-sm font-semibold">Nombre de la Tienda / Socio*</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Ej. Café Central"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Nombre del Contacto</label>
                  <input
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Nombre de la persona encargada"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Teléfono</label>
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Ej. 81 0000 0000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Dirección</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Calle, número, colonia..."
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
                  <span className="text-sm font-medium">Socio Activo</span>
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
                    {loading ? 'Guardando...' : editingPartner ? 'Actualizar' : 'Crear'}
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
