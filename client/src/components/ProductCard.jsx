import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Star, CheckCircle, AlertTriangle, Zap, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;
  const savings = hasDiscount ? (product.original_price - product.price) : 0;

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-soft-card hover:shadow-card-hover hover:border-brand-400/50 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-slate-50/80 to-slate-100/50 flex items-center justify-center p-6">
        
        {/* Floating Top Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
          {discountPercent && (
            <span className="px-2.5 py-1 text-[11px] font-black rounded-lg bg-rose-600 text-white shadow-md uppercase tracking-wider">
              -{discountPercent}%
            </span>
          )}
          {product.is_new && (
            <span className="px-2.5 py-1 text-[11px] font-black rounded-lg bg-brand-600 text-white shadow-md uppercase tracking-wider">
              Nouveau
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          {isOutOfStock ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-rose-200 shadow-sm">
              <AlertTriangle className="w-3 h-3" />
              Épuisé
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              En stock ({product.stock})
            </span>
          )}
        </div>

        {/* Product Image with Zoom on Hover */}
        <Link to={`/produit/${product.slug || product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            className="w-full h-full object-contain object-center group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </Link>

        {/* Interactive Hover Actions Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 flex items-center gap-2">
          <Link
            to={`/produit/${product.slug || product.id}`}
            className="flex-1 py-2.5 px-3 bg-white/95 backdrop-blur-md text-slate-800 hover:text-brand-600 rounded-xl shadow-lg font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Détails</span>
          </Link>
          <a
            href={`https://wa.me/21625455300?text=Bonjour%20Mobytek,%20je%20souhaite%20commander%20:${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg transition"
            title="Commander rapidement sur WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Content Info */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            <span className="text-brand-600">{product.brand}</span>
            {product.category_name && <span>{product.category_name}</span>}
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-black text-slate-900 text-base line-clamp-2 hover:text-brand-600 transition duration-200 leading-snug">
            <Link to={`/produit/${product.slug || product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-slate-200'}`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700 font-mono">
              {product.rating || '4.9'}
            </span>
          </div>
        </div>

        {/* Price & Primary CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-black text-slate-900 tracking-tight leading-none">
              {formatPrice(product.price)}
            </div>
            {product.original_price && (
              <div className="text-xs text-slate-400 line-through mt-0.5">
                {formatPrice(product.original_price)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-glow active:scale-95'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>

      </div>
    </div>
  );
}
