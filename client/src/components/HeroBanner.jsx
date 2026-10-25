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
    <div className="relative overflow-hidden bg-hero-light text-zinc-900 py-16 md:py-24 border-b border-zinc-200/80">
      {/* Subtle Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #71717a 1px, transparent 0)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Pill Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
                <span>Nouveautés 2026 Disponibles</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-bold shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                <span>Showroom Sfax (Route de l'Ain)</span>
              </div>
            </div>

            {/* Main Headline - Bold, Architectural, Ultra-Clean */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1] text-black">
              L'Univers High-Tech &amp; Mobilité au <br className="hidden sm:inline" />
              <span className="text-gradient-brand">
                Meilleur Prix en Tunisie
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Boutique officielle <strong className="text-black font-bold">Mobytek</strong> à Sfax : smartphones neufs scellés sous garantie constructeur, accessoires certifiés et gadgets high-tech. Livraison express sur toute la Tunisie et paiement en espèces à réception.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/catalogue"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-black hover:bg-zinc-800 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 group transition-all duration-200 transform hover:-translate-y-0.5 border border-black"
              >
                <span>Explorer le Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
              </Link>
              
              <a
                href="https://wa.me/21625455300?text=Bonjour%20Mobytek,%20je%20souhaite%20commander%20un%20produit"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 font-bold text-sm shadow-2xs transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-zinc-700" />
                <span>WhatsApp : 25 455 300</span>
              </a>

              <Link
                to="/catalogue?promo=true"
                className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-900 font-bold text-sm shadow-2xs transition text-center hover:border-black"
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Flame className="w-4 h-4 text-zinc-900" />
                  Promotions
                </span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-zinc-200 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span className="text-xs text-zinc-700 font-semibold">100% Original & Neuf</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Truck className="w-4 h-4 text-black shrink-0" />
                <span className="text-xs text-zinc-700 font-semibold">Livraison 24-48h</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                <span className="text-xs text-zinc-700 font-semibold">Paiement Réception</span>
              </div>
            </div>

          </div>

          {/* Right Column: Luxury Minimalist Product Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Clean White Card Surface */}
              <div className="relative bg-white border border-zinc-200 rounded-3xl p-6 shadow-card-hover space-y-4 hover:border-black transition duration-300">
                
                {/* Header with Live Status */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-black text-white flex items-center gap-1 uppercase tracking-wider">
                      Promo Vedette
                    </span>
                    <span className="text-xs font-bold text-zinc-500">Offre Showroom</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-900 font-bold bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    En Stock Sfax
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square py-2 flex items-center justify-center overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                    alt="iPhone 16 Pro Max chez Mobytek"
                    className="max-h-60 object-contain hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Discount Tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-black text-white font-mono font-black text-xs shadow-md">
                    -300 DT
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-200 text-zinc-900 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-black text-black" />
                    <span className="text-black font-bold">4.9</span>
                    <span className="text-zinc-400 text-[10px]">(128 avis)</span>
                  </div>
                </div>

                {/* Info & Price Row */}
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Apple Officiel</span>
                      <h3 className="text-lg font-heading font-black text-black leading-snug">
                        iPhone 16 Pro Max 256 Go
                      </h3>
                      <p className="text-xs text-zinc-500">Titane Naturel • Puce A18 Pro • Caméra 48 MP</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-black font-mono">
                        5 299 <span className="text-xs font-bold text-zinc-500">DT</span>
                      </div>
                      <div className="text-xs text-zinc-400 line-through">5 599 DT</div>
                    </div>
                  </div>

                  {/* Quick Order CTA */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/produit/iphone-16-pro-max-256go"
                      className="py-3 px-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm text-center"
                    >
                      <span>Voir Fiche</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href="https://wa.me/21625455300?text=Bonjour,%20je%20souhaite%20commander%20l'iPhone%2016%20Pro%20Max%20en%20promo"
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black border border-zinc-200 font-bold text-xs transition flex items-center justify-center gap-1.5 text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-zinc-700" />
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
