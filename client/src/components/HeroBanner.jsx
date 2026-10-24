import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Star, 
  MessageCircle,
  MapPin,
  Flame
} from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-hero-light text-slate-900 py-16 md:py-24 border-b border-slate-200/80">
      {/* Ambient Luminous Pastel Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-indigo-300/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-sky-300/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Subtle Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Pill Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span>Nouveautés 2026 Disponibles</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Showroom Sfax (Route de l'Ain)</span>
              </div>
            </div>

            {/* Main Headline - Bright, High Contrast, Impactful */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.12] text-slate-900">
              L'Univers High-Tech &amp; Mobilité au <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Meilleur Prix en Tunisie
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Boutique officielle <strong className="text-slate-900 font-bold">Mobytek</strong> à Sfax : smartphones neufs scellés sous garantie constructeur, accessoires certifiés et gadgets high-tech. Livraison express sur toute la Tunisie et paiement en espèces à réception.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/catalogue"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-glow flex items-center justify-center gap-2 group transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Explorer le Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
              </Link>
              
              <a
                href="https://wa.me/21625455300?text=Bonjour%20Mobytek,%20je%20souhaite%20commander%20un%20produit"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp : 25 455 300</span>
              </a>

              <Link
                to="/catalogue?promo=true"
                className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm shadow-sm transition text-center"
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500" />
                  Promos
                </span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs text-slate-700 font-semibold">100% Original & Neuf</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs text-slate-700 font-semibold">Livraison 24-48h</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="text-xs text-slate-700 font-semibold">Paiement Réception</span>
              </div>
            </div>

          </div>

          {/* Right Column: Luminous Product Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Soft Aura */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-blue-300 via-indigo-200 to-sky-300 opacity-60 blur-xl" />
              
              {/* Clean White Card Surface */}
              <div className="relative bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xl space-y-4">
                
                {/* Header with Live Status */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-rose-500" />
                      Promo Vedette
                    </span>
                    <span className="text-xs font-bold text-slate-500">Offre Showroom</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    En Stock à Sfax
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square py-2 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                    alt="iPhone 16 Pro Max chez Mobytek"
                    className="max-h-60 object-contain hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Discount Tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-xs shadow-md">
                    -300 DT
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-amber-500 font-bold text-xs flex items-center gap-1.5 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-slate-900 font-bold">4.9</span>
                    <span className="text-slate-400 text-[10px]">(128 avis)</span>
                  </div>
                </div>

                {/* Info & Price Row */}
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">Apple Officiel</span>
                      <h3 className="text-lg font-heading font-black text-slate-900 leading-snug">
                        iPhone 16 Pro Max 256 Go
                      </h3>
                      <p className="text-xs text-slate-500">Titane Naturel • Puce A18 Pro • Caméra 48 MP</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-slate-900">
                        5 299 <span className="text-xs font-bold text-blue-600">DT</span>
                      </div>
                      <div className="text-xs text-slate-400 line-through">5 599 DT</div>
                    </div>
                  </div>

                  {/* Quick Order CTA */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/produit/iphone-16-pro-max-256go"
                      className="py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm text-center"
                    >
                      <span>Voir Fiche</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href="https://wa.me/21625455300?text=Bonjour,%20je%20souhaite%20commander%20l'iPhone%2016%20Pro%20Max%20en%20promo"
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Commander</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
