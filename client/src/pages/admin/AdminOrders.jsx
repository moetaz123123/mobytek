import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Eye, 
  X, 
  AlertCircle 
} from 'lucide-react';

const statuses = [
  'en attente',
  'confirmée',
  'en préparation',
  'expédiée',
  'livrée',
  'annulée'
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.getOrders({
        status: selectedStatus !== 'all' ? selectedStatus : '',
        search
      });
      if (res.success) setOrders(res.data);
    } catch (err) {
      console.error('Erreur chargement commandes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus, search]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setFeedback(`Commande mise à jour : Statut "${newStatus}"`);
      fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      alert(err.message || 'Impossible de mettre à jour le statut.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'livrée':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'en préparation':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'confirmée':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'expédiée':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'annulée':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
            Gestion & Suivi des Commandes
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Consultez les coordonnées clients, vérifiez les articles et modifiez les statuts d'expédition.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            placeholder="Rechercher par client, tél, n°..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2 pl-9 pr-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedStatus === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Toutes
          </button>
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1.5 rounded-lg text-xs capitalize transition ${
                selectedStatus === st
                  ? 'bg-brand-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Réf.</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Téléphone</th>
                <th className="py-3 px-4">Ville</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Montant Total</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-slate-400">
                    Chargement des commandes...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-slate-400">
                    Aucune commande trouvée.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-bold text-brand-700">{ord.order_number}</td>
                    <td className="py-3.5 px-4 text-slate-900 font-bold">{ord.customer_name}</td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <a href={`tel:${ord.customer_phone}`} className="hover:text-brand-600 font-mono">
                        {ord.customer_phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{ord.city}</td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(ord.created_at).toLocaleDateString('fr-TN')}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {formatPrice(ord.total_amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      {/* Interactive Status Changer Dropdown */}
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className={`text-[11px] font-bold rounded-lg py-1 px-2.5 border focus:outline-none cursor-pointer ${getStatusBadge(ord.status)}`}
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Voir</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 my-4 sm:my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Détails de la commande</span>
                <h2 className="text-xl font-heading font-black text-brand-600">
                  {selectedOrder.order_number}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Contact Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedOrder.customer_name}</h4>
                  <p className="text-slate-600 flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span className="font-mono font-bold">{selectedOrder.customer_phone}</span>
                  </p>
                </div>
                <a
                  href={`tel:${selectedOrder.customer_phone}`}
                  className="px-3 py-1.5 bg-brand-600 text-white rounded-lg font-bold text-xs hover:bg-brand-700 transition"
                >
                  Appeler le client
                </a>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{selectedOrder.delivery_address}, {selectedOrder.city}</span>
              </div>

              {selectedOrder.notes && (
                <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-200">
                  <span className="font-bold">Note client : </span>
                  {selectedOrder.notes}
                </div>
              )}
            </div>

            {/* Items list */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Articles Commandés</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto divide-y divide-slate-100">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="pt-2 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{item.product_name}</p>
                      <p className="text-[11px] text-slate-400">Quantité : {item.quantity} × {formatPrice(item.price)}</p>
                    </div>
                    <span className="font-black text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status changer in modal */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Changer le statut :</span>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                className={`text-xs font-bold rounded-lg py-1.5 px-3 border cursor-pointer ${getStatusBadge(selectedOrder.status)}`}
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Total */}
            <div className="p-4 rounded-2xl bg-brand-50 flex items-baseline justify-between text-brand-950">
              <span className="text-xs font-bold">Total à encaisser à la livraison :</span>
              <span className="text-xl font-black text-brand-600">{formatPrice(selectedOrder.total_amount)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
