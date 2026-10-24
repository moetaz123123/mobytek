import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  Smartphone, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  PackageCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getDashboardStats();
        if (res.success) setStats(res.data);
      } catch (err) {
        console.error('Erreur stats admin:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Indicateurs de performance en temps réel et suivi des commandes de Mobytek.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/produits"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition"
          >
            + Ajouter un Produit
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Chiffre d'Affaires</span>
            <div className="text-2xl font-black text-slate-900">
              {formatPrice(stats?.totalRevenue || 0)}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Commandes enregistrées
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Commandes</span>
            <div className="text-2xl font-black text-slate-900">
              {stats?.totalOrders || 0}
            </div>
            <Link to="/admin/commandes" className="text-[10px] text-brand-600 font-bold hover:underline">
              Voir la liste &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Commandes en attente</span>
            <div className="text-2xl font-black text-amber-600">
              {stats?.pendingOrders || 0}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">À confirmer par appel</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Total Catalog Products */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Articles en Catalogue</span>
            <div className="text-2xl font-black text-slate-900">
              {stats?.totalProducts || 0}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              {stats?.lowStockCount > 0 ? (
                <span className="text-rose-600 font-bold">{stats.lowStockCount} stock faible</span>
              ) : (
                'Stock optimal'
              )}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-heading font-black text-slate-900">Dernières Commandes Clients</h2>
            <p className="text-xs text-slate-500">Traitez rapidement les commandes en attente de livraison.</p>
          </div>
          <Link
            to="/admin/commandes"
            className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
          >
            <span>Toutes les commandes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Réf. Commande</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Téléphone</th>
                <th className="py-3 px-4">Ville</th>
                <th className="py-3 px-4">Montant</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-bold text-blue-700">{ord.order_number}</td>
                    <td className="py-3.5 px-4 text-slate-900 font-bold">{ord.customer_name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{ord.customer_phone}</td>
                    <td className="py-3.5 px-4 text-slate-600">{ord.city}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{formatPrice(ord.total_amount)}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ord.status === 'livrée' ? 'bg-emerald-100 text-emerald-800' :
                        ord.status === 'en préparation' ? 'bg-indigo-100 text-indigo-800' :
                        ord.status === 'expédiée' ? 'bg-blue-100 text-blue-800' :
                        ord.status === 'annulée' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to="/admin/commandes"
                        className="text-xs font-bold text-blue-600 hover:text-blue-800"
                      >
                        Gérer &rarr;
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-1">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <p className="font-heading font-bold text-slate-700 text-sm">
                        Aucune commande enregistrée pour le moment
                      </p>
                      <p className="text-xs text-slate-400 max-w-sm">
                        Le chiffre d'affaires et les commandes s'actualiseront dès qu'un client passera commande sur le site.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
