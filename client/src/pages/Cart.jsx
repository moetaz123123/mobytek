import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  ArrowLeft 
} from 'lucide-react';

export default function Cart() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    deliveryFee, 
    grandTotal 
  } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-heading font-black text-slate-900">Votre panier est actuellement vide</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Explorez notre sélection de smartphones et d'accessoires de grandes marques et ajoutez vos articles favoris.
        </p>
        <div>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-glow transition"
          >
            <span>Découvrir nos produits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight">
            Votre Panier d'Achat
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Vérifiez vos articles avant de finaliser votre commande avec paiement à la livraison.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          Vider le panier
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Items Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {cart.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-xl bg-slate-50 p-2 shrink-0 border border-slate-100"
                />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">{item.brand}</span>
                  <h3 className="font-heading font-bold text-slate-900 text-sm hover:text-brand-600 transition">
                    <Link to={`/produit/${item.slug || item.id}`}>{item.name}</Link>
                  </h3>
                  <div className="text-xs text-slate-500">
                    Prix unitaire : <span className="font-semibold text-slate-800">{formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-slate-600 hover:text-slate-900"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-slate-600 hover:text-slate-900"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold"
                  >
                    Retirer
                  </button>
                </div>
              </div>

            </div>
          ))}

          <div className="p-4 bg-slate-50 flex items-center justify-between text-xs">
            <Link to="/catalogue" className="text-brand-600 font-bold hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Poursuivre mes achats
            </Link>
            <span className="text-slate-500">
              {cart.reduce((s, i) => s + i.quantity, 0)} article(s) dans le panier
            </span>
          </div>
        </div>

        {/* Order Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-heading font-black text-slate-900 border-b border-slate-100 pb-4">
            Résumé de la Commande
          </h2>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Total articles</span>
              <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frais de livraison</span>
              <span className="font-semibold text-slate-900">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-bold">Gratuite (offre &gt; 300 DT)</span>
                ) : (
                  formatPrice(deliveryFee)
                )}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
              <span>Montant Total</span>
              <span className="text-xl text-brand-600">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition"
          >
            <span>Procéder à la commande</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Paiement en espèces à la livraison</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-500 shrink-0" />
              <span>Livraison sous 24h à 48h sur toute la Tunisie</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
