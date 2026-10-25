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
        <div className="w-20 h-20 rounded-2xl bg-zinc-100 text-zinc-950 border border-zinc-200 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
          Commande Validée avec Succès
        </span>
        <h1 className="text-3xl font-heading font-black text-zinc-950 tracking-tight">
          Merci pour votre confiance !
        </h1>
        <p className="text-sm text-zinc-600 max-w-lg mx-auto">
          Votre commande a bien été reçue par l'équipe commerciale Mobytek. Un conseiller va vous contacter par téléphone sous peu pour confirmer l'expédition.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Order Reference Number */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
          <div>
            <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Numéro de Commande</span>
            <div className="text-xl font-mono font-black text-zinc-950 tracking-tight">
              {order?.order_number || orderId || 'MOB-2026-CONFIRM'}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Mode de règlement</span>
            <div className="text-xs font-bold text-zinc-900">
              Espèces à la livraison ({formatPrice(order?.total_amount || 0)})
            </div>
          </div>
        </div>

        {/* Customer Information if available */}
        {order && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
              <span className="font-bold text-zinc-400 uppercase font-mono text-[10px]">Destinataire</span>
              <p className="font-bold text-zinc-950">{order.customer_name}</p>
              <p className="text-zinc-600 font-mono">{order.customer_phone}</p>
              {order.customer_email && <p className="text-zinc-600">{order.customer_email}</p>}
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
              <span className="font-bold text-zinc-400 uppercase font-mono text-[10px]">Adresse de livraison</span>
              <p className="font-bold text-zinc-950">{order.city}, Tunisie</p>
              <p className="text-zinc-600">{order.delivery_address}</p>
            </div>
          </div>
        )}

        {/* Next Steps Progress */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Étapes suivantes</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-zinc-300 bg-zinc-100/50 space-y-1">
              <span className="text-[11px] font-mono font-black text-zinc-950">1. Confirmation</span>
              <p className="text-[11px] text-zinc-600">Notre équipe valide l'adresse et le créneau avec vous.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-1">
              <span className="text-[11px] font-mono font-black text-zinc-950">2. Préparation</span>
              <p className="text-[11px] text-zinc-600">Emballage soigné avec facture et garantie officielle.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-1">
              <span className="text-[11px] font-mono font-black text-zinc-950">3. Livraison</span>
              <p className="text-[11px] text-zinc-600">Réception du colis et règlement sécurisé en espèces.</p>
            </div>
          </div>
        </div>

        {/* Support Hotline */}
        <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-zinc-950 shrink-0" />
            <span className="font-semibold text-zinc-900">Une question sur votre commande ?</span>
          </div>
          <a href="tel:+21625455300" className="font-mono font-bold text-zinc-950 hover:underline">
            +216 25 455 300
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/catalogue"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continuer mes achats</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 font-bold text-xs transition text-center"
          >
            Retour à l'accueil
          </Link>
        </div>

      </div>

    </div>
  );
}
