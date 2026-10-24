import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  CheckCircle, 
  AlertTriangle, 
  Star, 
  ShieldCheck, 
  Truck, 
  Phone, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Sparkles,
  Share2,
  Check
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.getProductById(id);
        if (res.success && res.data) {
          setProduct(res.data);
          setSelectedImage(0);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Erreur chargement produit:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse space-y-8">
        <div className="h-6 w-32 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-slate-200 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/4" />
            <div className="h-24 bg-slate-200 rounded" />
            <div className="h-12 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Produit introuvable</h2>
        <p className="text-slate-500 text-sm">Le produit que vous cherchez n'existe pas ou n'est plus disponible.</p>
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  const images = product.images?.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'];

  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  const isOutOfStock = product.stock <= 0;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-24 md:pb-10 space-y-8 sm:space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-brand-600">Accueil</Link>
        <span>/</span>
        <Link to="/catalogue" className="hover:text-brand-600">Catalogue</Link>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Interactive Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Image Box */}
          <div className="relative aspect-square w-full bg-white rounded-3xl border border-slate-200/80 p-8 flex items-center justify-center shadow-sm overflow-hidden group">
            {discountPercent && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-extrabold rounded-lg bg-accent-600 text-white shadow-md">
                -{discountPercent}% PROMO
              </span>
            )}
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl border-2 p-1 bg-white shrink-0 transition ${
                    selectedImage === idx
                      ? 'border-brand-600 ring-2 ring-brand-500/20'
                      : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Purchase Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header & Brand */}
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
                {product.brand}
              </span>
              <button
                onClick={handleShare}
                className="text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1.5 transition"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Lien copié !' : 'Partager'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="font-bold text-slate-800 ml-1">{product.rating || 5.0} / 5</span>
              </div>
              <span className="text-slate-300">|</span>
              {isOutOfStock ? (
                <span className="flex items-center gap-1 font-bold text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                  Rupture de stock temporaire
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-emerald-600">
                  <CheckCircle className="w-4 h-4" />
                  En stock ({product.stock} exemplaires disponibles)
                </span>
              )}
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline gap-4">
            <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-base text-slate-400 line-through font-semibold">
                {formatPrice(product.original_price)}
              </span>
            )}
            <span className="text-xs font-bold text-slate-500 ml-auto bg-white px-2.5 py-1 rounded-md border border-slate-200">
              TTC avec Facture
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description du produit</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Purchase Actions (Quantity + Buttons) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={() => {
                  addToCart(product, quantity);
                  setIsCartOpen(true);
                }}
                disabled={isOutOfStock}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter au panier</span>
              </button>

              {/* Instant Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm shadow-glow transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Commander maintenant</span>
              </button>
            </div>
          </div>

          {/* Showroom Direct Contact */}
          <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <p className="font-bold text-brand-950 flex items-center gap-1.5 justify-center sm:justify-start">
                <Phone className="w-4 h-4 text-brand-600" />
                Une question sur ce produit ou la compatibilité ?
              </p>
              <p className="text-brand-800">Notre équipe Mobytek vous répond du Lun au Sam de 9h à 19h30.</p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a
                href="tel:+21625455300"
                className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition"
              >
                Appeler le 25 455 300
              </a>
              <a
                href={`https://wa.me/21625455300?text=Bonjour%20Mobytek,%20je%20suis%20intéressé(e)%20par%20le%20produit%20:${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Technical Specifications Section */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-heading font-black text-slate-900">
              Caractéristiques & Fiche Technique
            </h2>
            <p className="text-xs text-slate-500">Spécifications officielles du constructeur</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-bold text-slate-600 capitalize">{key}</span>
                <span className="font-semibold text-slate-900 text-right max-w-[65%]">{val}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Compatible Accessories Section */}
      {product.compatible_accessories && product.compatible_accessories.length > 0 && (
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-heading font-black text-slate-900">
              Accessoires Recommandés & Compatibles
            </h2>
            <p className="text-xs text-slate-500">Optimisez l'utilisation de votre appareil avec ces accessoires certifiés</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.compatible_accessories.map((accName, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800">{accName}</span>
                <Link
                  to={`/catalogue?search=${encodeURIComponent(accName.split(' ')[0])}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-brand-600 hover:bg-brand-50 text-[11px] font-bold shrink-0 transition"
                >
                  Voir
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Bottom Buy Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 z-30 flex items-center justify-between gap-3 md:hidden shadow-xl">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-black text-slate-900 truncate">{formatPrice(product.price)}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate">{product.name}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              addToCart(product, quantity);
              setIsCartOpen(true);
            }}
            disabled={isOutOfStock}
            className="p-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center disabled:opacity-40 transition"
            title="Ajouter au panier"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-xs shadow-sm disabled:opacity-40 flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commander</span>
          </button>
        </div>
      </div>

    </div>
  );
}
