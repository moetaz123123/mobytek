import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    grandTotal 
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const remainingForFreeDelivery = Math.max(0, 300 - subtotal);
  const totalItemCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col h-full">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-black text-slate-900 tracking-tight">
                  Mon Panier
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {totalItemCount} {totalItemCount > 1 ? 'articles sélectionnés' : 'article sélectionné'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition"
              title="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Banner */}
          <div className="bg-blue-50/90 px-6 py-3.5 border-b border-blue-100 flex items-center gap-3">
            {remainingForFreeDelivery > 0 ? (
              <div className="flex-1">
                <p className="text-xs text-blue-900 font-medium leading-relaxed">
                  Ajoutez encore <span className="font-extrabold text-blue-700">{formatPrice(remainingForFreeDelivery)}</span> pour bénéficier de la <span className="font-extrabold underline decoration-blue-400">Livraison Gratuite</span> !
                </p>
                <div className="w-full bg-blue-200/70 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 300) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Félicitations ! Vous bénéficiez de la livraison offerte sur toute la Tunisie !</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100 shadow-sm">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Votre panier est vide</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xs mb-6 leading-relaxed">
                  Découvrez nos derniers smartphones, écouteurs, chargeurs et gadgets Mobytek au meilleur prix à Sfax et en Tunisie.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/catalogue');
                  }}
                  className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                >
                  Découvrir nos produits
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 rounded-3xl border border-slate-200/90 hover:border-blue-400 bg-white transition-all shadow-soft-card flex items-center gap-4 group"
                >
                  {/* Compact, Crisp Thumbnail */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shrink-0 overflow-hidden relative">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Information & Controls */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-2">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-heading font-bold text-slate-900 line-clamp-2 leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0"
                          title="Supprimer cet article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.brand && (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold mt-1 uppercase tracking-wide">
                          {item.brand}
                        </span>
                      )}
                    </div>

                    {/* Bottom Row: Quantity + Price */}
                    <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                      {/* Quantity Controls */}
                      <div className="inline-flex items-center gap-1 bg-slate-100/90 rounded-xl p-1 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-xs text-slate-700 hover:text-blue-600 flex items-center justify-center active:scale-95 transition"
                          title="Diminuer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-xs text-slate-700 hover:text-blue-600 flex items-center justify-center active:scale-95 transition"
                          title="Augmenter"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-heading font-black text-slate-900 tracking-tight block">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-slate-400 block">
                            ({formatPrice(item.price)} / unité)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200/80 bg-slate-50/80 space-y-4">
              <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Sous-total ({totalItemCount} articles)</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Livraison Tunisie</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-black">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Gratuite
                      </span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-slate-200 text-base font-heading font-black text-slate-900">
                  <span>Total estimé</span>
                  <span className="text-blue-600 text-xl font-black">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-black text-sm sm:text-base shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition duration-200 active:scale-[0.99]"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Paiement sécurisé en espèces à la livraison (Partout en Tunisie)</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
