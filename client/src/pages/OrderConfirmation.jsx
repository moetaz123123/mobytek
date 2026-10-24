import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Truck, 
  Phone, 
  ArrowRight, 
  ShoppingBag, 
  FileText, 
  Calendar 
} from 'lucide-react';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-8">
      
      {/* Success Badge & Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-subtle-pulse">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Commande Validée avec Succès
        </span>
        <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight">
          Merci pour votre confiance !
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Votre commande a bien été reçue par l'équipe commerciale Mobytek. Un conseiller va vous contacter par téléphone sous peu pour confirmer l'expédition.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Order Reference Number */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Numéro de Commande</span>
            <div className="text-xl font-black text-brand-600 tracking-tight">
              {order?.order_number || orderId || 'MOB-2026-CONFIRM'}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mode de règlement</span>
            <div className="text-xs font-bold text-slate-800">
              Espèces à la livraison ({formatPrice(order?.total_amount || 0)})
            </div>
          </div>
        </div>

        {/* Customer Information if available */}
        {order && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 space-y-1">
              <span className="font-bold text-slate-500">Destinataire :</span>
              <p className="font-bold text-slate-900">{order.customer_name}</p>
              <p className="text-slate-600">{order.customer_phone}</p>
              {order.customer_email && <p className="text-slate-600">{order.customer_email}</p>}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 space-y-1">
              <span className="font-bold text-slate-500">Adresse de livraison :</span>
              <p className="font-bold text-slate-900">{order.city}, Tunisie</p>
              <p className="text-slate-600">{order.delivery_address}</p>
            </div>
          </div>
        )}

        {/* Next Steps Progress */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Étapes suivantes</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-brand-200 bg-brand-50/50 space-y-1">
              <span className="text-[11px] font-black text-brand-700">1. Appel de confirmation</span>
              <p className="text-[11px] text-slate-600">Notre équipe valide l'adresse et le créneau horaire avec vous.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-[11px] font-black text-slate-700">2. Préparation du colis</span>
              <p className="text-[11px] text-slate-600">Emballage sécurisé avec facture et garantie sous blister.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-[11px] font-black text-slate-700">3. Livraison & Paiement</span>
              <p className="text-[11px] text-slate-600">Le livreur vous remet le colis et vous réglez en espèces.</p>
            </div>
          </div>
        </div>

        {/* Support Hotline */}
        <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-brand-600 shrink-0" />
            <span className="font-semibold text-brand-900">Besoin d'une précision ? Appelez notre assistance :</span>
          </div>
          <a href="tel:+21625455300" className="font-bold text-brand-700 hover:underline">
            +216 25 455 300
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/catalogue"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continuer mes achats</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition text-center"
          >
            Retour à l'accueil
          </Link>
        </div>

      </div>

    </div>
  );
}
