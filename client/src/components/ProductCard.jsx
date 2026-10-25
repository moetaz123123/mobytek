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
    <div className="group relative bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-black transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-50 flex items-center justify-center p-6 border-b border-zinc-100">
        
        {/* Floating Top Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
          {discountPercent && (
            <span className="px-2.5 py-1 text-[10px] font-black rounded-md bg-black text-white shadow-sm font-mono tracking-wider">
              -{discountPercent}%
            </span>
          )}
          {product.is_new && (
            <span className="px-2.5 py-1 text-[10px] font-black rounded-md bg-zinc-100 text-zinc-900 border border-zinc-300 shadow-sm uppercase tracking-wider">
              Nouveau
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          {isOutOfStock ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-200 shadow-sm">
              <AlertTriangle className="w-3 h-3 text-zinc-400" />
              Épuisé
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-200 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              En stock ({product.stock})
            </span>
          )}
        </div>

        {/* Product Image with Zoom on Hover */}
        <Link to={`/produit/${product.slug || product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </Link>

        {/* Interactive Hover Actions Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
          <Link
            to={`/produit/${product.slug || product.id}`}
            className="flex-1 py-2.5 px-3 bg-white text-zinc-900 hover:bg-zinc-100 rounded-xl shadow-md font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-200 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Aperçu rapide</span>
          </Link>
          <a
            href={`https://wa.me/21625455300?text=Bonjour%20Mobytek,%20je%20souhaite%20commander%20:${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl shadow-md transition"
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
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
            <span className="text-zinc-900 font-mono">{product.brand}</span>
            {product.category_name && <span>{product.category_name}</span>}
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-bold text-zinc-900 text-base line-clamp-2 hover:text-zinc-600 transition duration-200 leading-snug">
            <Link to={`/produit/${product.slug || product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex items-center text-zinc-900">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-zinc-200'}`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-600 font-mono">
              {product.rating || '4.9'}
            </span>
          </div>
        </div>

        {/* Price & Primary CTA */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-black text-zinc-950 tracking-tight leading-none font-mono">
              {formatPrice(product.price)}
            </div>
            {product.original_price && (
              <div className="text-xs text-zinc-400 line-through mt-0.5 font-mono">
                {formatPrice(product.original_price)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
              isOutOfStock
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-zinc-800 active:scale-95'
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
