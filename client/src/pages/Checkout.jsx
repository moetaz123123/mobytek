import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { 
  ShieldCheck, 
  Truck, 
  Phone, 
  MapPin, 
  User, 
  FileText, 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';

const tunisianGovernorates = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte',
  'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia',
  'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Médenine',
  'Tataouine', 'Gafsa', 'Tozeur', 'Kébili'
];

export default function Checkout() {
  const { cart, subtotal, deliveryFee, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    delivery_address: '',
    city: 'Tunis',
    notes: '',
    payment_method: 'cash_on_delivery'
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.customer_name.trim() || !formData.customer_phone.trim() || !formData.delivery_address.trim()) {
      setErrorMessage('Veuillez remplir votre nom complet, votre numéro de téléphone et votre adresse de livraison.');
      return;
    }

    if (cart.length === 0) {
      setErrorMessage('Votre panier est vide.');
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        customer_name: formData.customer_name.trim(),
        customer_phone: formData.customer_phone.trim(),
        customer_email: formData.customer_email.trim(),
        delivery_address: formData.delivery_address.trim(),
        city: formData.city,
        notes: formData.notes.trim(),
        payment_method: formData.payment_method,
        items: cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      };

      const res = await api.createOrder(orderPayload);
      if (res.success && res.data) {
        clearCart();
        navigate(`/confirmation/${res.data.order_number || res.data.id}`, {
          state: { order: res.data }
        });
      } else {
        setErrorMessage(res.message || 'Une erreur est survenue lors de l\'enregistrement de votre commande.');
      }
    } catch (err) {
      console.error('Erreur commande:', err);
      setErrorMessage(err.message || 'Impossible de joindre le serveur. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Votre panier est vide</h2>
        <p className="text-slate-500 text-sm">Veuillez sélectionner au moins un article avant de passer commande.</p>
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-zinc-950 tracking-tight">
          Finalisation de votre Commande
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Renseignez vos coordonnées de livraison. Aucun prépaiement par carte requis, vous réglez en espèces à la livraison.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-100 border border-zinc-300 text-zinc-900 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-black shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Mobile Top Summary Badge */}
      <div className="lg:hidden p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-zinc-800">Total à payer ({cart.reduce((s, i) => s + i.quantity, 0)} articles)</span>
          <p className="text-[11px] text-zinc-500">Paiement espèces à la livraison</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-heading font-black text-zinc-950 font-mono">{formatPrice(grandTotal)}</span>
          <span className="text-[10px] text-zinc-600 font-bold block">{deliveryFee === 0 ? 'Livraison gratuite' : '+7.000 DT livr.'}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
        
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-bold text-zinc-950">1. Coordonnées du Destinataire</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-zinc-700">Nom et Prénom *</label>
                <input
                  type="text"
                  name="customer_name"
                  required
                  placeholder="Ex: Mohamed Ben Ali"
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 focus:bg-white focus:border-black rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Numéro de Téléphone Joignable *</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="customer_phone"
                    required
                    placeholder="Ex: 98 123 456 ou 22 000 000"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border border-zinc-300 focus:bg-white focus:border-black rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black/10 font-mono"
                  />
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                <span className="text-[10px] text-zinc-400">Le livreur vous appellera avant de livrer.</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Adresse Email (optionnelle)</label>
                <input
                  type="email"
                  name="customer_email"
                  placeholder="Pour recevoir le récapitulatif"
                  value={formData.customer_email}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 focus:bg-white focus:border-black rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-bold text-zinc-950">2. Adresse de Livraison</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Gouvernorat *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 focus:bg-white focus:border-black rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  {tunisianGovernorates.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Délai estimé</label>
                <div className="w-full bg-zinc-100 rounded-xl py-3 px-4 text-xs font-bold text-zinc-800 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-black" />
                  <span>24 à 48 heures ouvrables</span>
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-zinc-700">Adresse précise (Rue, Résidence, Bâtiment, Ville) *</label>
                <textarea
                  name="delivery_address"
                  required
                  rows="2"
                  placeholder="Ex: Rue des Orangers, Résidence Carthage, Apt B12, Menzah 9"
                  value={formData.delivery_address}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 focus:bg-white focus:border-black rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-zinc-700">Notes pour le livreur (optionnel)</label>
                <input
                  type="text"
                  name="notes"
                  placeholder="Ex: Sonner à l'interphone Ben Ali ou laisser chez le concierge"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 focus:bg-white focus:border-black rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-bold text-zinc-950">3. Mode de Paiement</h2>
            </div>

            <div className="p-4 rounded-xl border-2 border-black bg-zinc-50 flex items-start gap-3">
              <input
                type="radio"
                name="payment_method"
                value="cash_on_delivery"
                checked={formData.payment_method === 'cash_on_delivery'}
                onChange={handleChange}
                className="mt-1 text-black focus:ring-black"
              />
              <div className="space-y-1">
                <span className="font-bold text-xs text-zinc-950">Paiement à la livraison (Espèces)</span>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Réglez le montant exact en Dinars Tunisiens (DT) directement au livreur à la réception de votre colis.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200 p-5 sm:p-8 shadow-sm space-y-6 sticky top-28">
          <h2 className="text-lg font-heading font-bold text-zinc-950 pb-3 border-b border-zinc-100">
            Détails de votre commande ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded-md bg-zinc-50 p-1 border border-zinc-100" />
                  <div>
                    <span className="font-bold text-zinc-900 line-clamp-1">{item.name}</span>
                    <span className="text-zinc-500 font-mono">Qté: {item.quantity} × {formatPrice(item.price)}</span>
                  </div>
                </div>
                <span className="font-bold text-zinc-950 shrink-0 font-mono">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-200 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-600">
              <span>Sous-total articles</span>
              <span className="font-semibold text-zinc-950 font-mono">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Livraison ({formData.city})</span>
              <span className="font-semibold text-zinc-950 font-mono">
                {deliveryFee === 0 ? <span className="text-black font-bold">Gratuite</span> : formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline font-black text-zinc-950 text-sm">
              <span>Total à payer à la livraison</span>
              <span className="text-2xl text-zinc-950 font-mono font-black">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Enregistrement en cours...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirmer ma commande ({formatPrice(grandTotal)})</span>
              </>
            )}
          </button>

          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5 text-[11px] text-zinc-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span>Garantie constructeur et facture fournies</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-black shrink-0" />
              <span>Confirmation téléphonique immédiate par notre équipe</span>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
