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
        return 'bg-black text-white border-black';
      case 'en préparation':
        return 'bg-zinc-800 text-white border-zinc-800';
      case 'confirmée':
        return 'bg-zinc-700 text-white border-zinc-700';
      case 'expédiée':
        return 'bg-zinc-200 text-zinc-900 border-zinc-300';
      case 'annulée':
        return 'bg-zinc-100 text-zinc-400 border-zinc-200 line-through';
      default:
        return 'bg-zinc-100 text-zinc-900 border-zinc-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-zinc-950 tracking-tight">
            Gestion & Suivi des Commandes
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Consultez les coordonnées clients, vérifiez les articles et modifiez les statuts d'expédition.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-zinc-100 border border-zinc-300 text-zinc-950 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-zinc-950" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            placeholder="Rechercher par client, tél, n°..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedStatus === 'all'
                ? 'bg-black text-white font-bold'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
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
                  ? 'bg-black text-white font-bold'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 uppercase tracking-wider font-mono font-bold">
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
            <tbody className="divide-y divide-zinc-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-zinc-400 font-mono">
                    Chargement des commandes...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-zinc-400 font-mono">
                    Aucune commande trouvée.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-zinc-950">{ord.order_number}</td>
                    <td className="py-3.5 px-4 text-zinc-950 font-bold">{ord.customer_name}</td>
                    <td className="py-3.5 px-4 text-zinc-700">
                      <a href={`tel:${ord.customer_phone}`} className="hover:text-black font-mono">
                        {ord.customer_phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600">{ord.city}</td>
                    <td className="py-3.5 px-4 text-zinc-500 font-mono text-[11px]">
                      {new Date(ord.created_at).toLocaleDateString('fr-TN')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-zinc-950">
                      {formatPrice(ord.total_amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      {/* Interactive Status Changer Dropdown */}
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className={`text-[11px] font-mono font-bold rounded-lg py-1 px-2.5 border focus:outline-none cursor-pointer ${getStatusBadge(ord.status)}`}
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 font-bold text-xs inline-flex items-center gap-1 transition"
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 my-4 sm:my-8 max-h-[92vh] overflow-y-auto border border-zinc-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Détails de la commande</span>
                <h2 className="text-xl font-heading font-black text-zinc-950 font-mono">
                  {selectedOrder.order_number}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-zinc-400 hover:text-zinc-950 p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Contact Box */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-zinc-950 text-sm">{selectedOrder.customer_name}</h4>
                  <p className="text-zinc-600 flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-zinc-950" />
                    <span className="font-mono font-bold">{selectedOrder.customer_phone}</span>
                  </p>
                </div>
                <a
                  href={`tel:${selectedOrder.customer_phone}`}
                  className="px-3 py-1.5 bg-black text-white rounded-lg font-bold text-xs hover:bg-zinc-800 transition"
                >
                  Appeler le client
                </a>
              </div>

              <div className="pt-2 border-t border-zinc-200 flex items-start gap-1.5 text-zinc-600">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>{selectedOrder.delivery_address}, {selectedOrder.city}</span>
              </div>

              {selectedOrder.notes && (
                <div className="p-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-[11px] font-medium border border-zinc-200">
                  <span className="font-bold">Note client : </span>
                  {selectedOrder.notes}
                </div>
              )}
            </div>

            {/* Items list */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Articles Commandés</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto divide-y divide-zinc-100">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="pt-2 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900">{item.product_name}</p>
                      <p className="text-[11px] text-zinc-400 font-mono">Quantité : {item.quantity} × {formatPrice(item.price)}</p>
                    </div>
                    <span className="font-mono font-black text-zinc-950">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status changer in modal */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-600">Changer le statut :</span>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                className={`text-xs font-mono font-bold rounded-lg py-1.5 px-3 border cursor-pointer ${getStatusBadge(selectedOrder.status)}`}
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Total */}
            <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-baseline justify-between text-zinc-950">
              <span className="text-xs font-bold">Total à encaisser à la livraison :</span>
              <span className="text-2xl font-mono font-black text-zinc-950">{formatPrice(selectedOrder.total_amount)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
