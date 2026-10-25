import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import ShowroomPhotosFeed from '../components/ShowroomPhotosFeed';
import { api } from '../services/api';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Headphones, 
  Truck, 
  Clock, 
  ThumbsUp, 
  Flame, 
  Layers,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Zap,
  Star
} from 'lucide-react';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [promoProducts, setPromoProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catsRes, popularRes, promoRes, newRes] = await Promise.all([
          api.getCategories(),
          api.getProducts({ sort: 'popularity' }),
          api.getProducts({ promo: true }),
          api.getProducts({ isNew: true })
        ]);

        if (catsRes.success) setCategories(catsRes.data);
        if (popularRes.success) setPopularProducts(popularRes.data.slice(0, 4));
        if (promoRes.success) setPromoProducts(promoRes.data.slice(0, 4));
        if (newRes.success) setNewProducts(newRes.data.slice(0, 4));
      } catch (err) {
        console.error('Erreur chargement page d\'accueil:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-24">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Trust Pillars - Floating Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white shadow-sm border border-zinc-200/90 backdrop-blur-xl">
          <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-zinc-50 transition border border-transparent hover:border-zinc-200">
            <div className="w-11 h-11 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-200">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-zinc-950">Livraison 24-48h</h4>
              <p className="text-xs text-zinc-500 font-medium">Partout en Tunisie</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-zinc-50 transition border border-transparent hover:border-zinc-200">
            <div className="w-11 h-11 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-zinc-950">Paiement Réception</h4>
              <p className="text-xs text-zinc-500 font-medium">Espèces au livreur</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-zinc-50 transition border border-transparent hover:border-zinc-200">
            <div className="w-11 h-11 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-zinc-950">Garantie 1 An</h4>
              <p className="text-xs text-zinc-500 font-medium">Produits 100% officiels</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-zinc-50 transition border border-transparent hover:border-zinc-200">
            <div className="w-11 h-11 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-200">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-zinc-950">Support Direct</h4>
              <p className="text-xs text-zinc-500 font-medium">Conseils via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Catégories de produits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-mono uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Rayons Officiels</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-zinc-950 tracking-tight">
              Explorez par Catégorie
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-zinc-900 hover:text-black flex items-center gap-1.5 group self-start sm:self-auto border-b border-zinc-300 pb-0.5 hover:border-black transition"
          >
            <span>Toutes les catégories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 4. Produits les Plus Populaires */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-mono uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-zinc-900" />
              <span>Sélection Signature</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-zinc-950 tracking-tight">
              Produits les Plus Demandés
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="text-xs font-bold text-zinc-900 hover:text-black flex items-center gap-1.5 group self-start sm:self-auto border-b border-zinc-300 pb-0.5 hover:border-black transition"
          >
            <span>Voir tout le catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-96 bg-zinc-100 rounded-2xl border border-zinc-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Bannière Vedette Showroom Mobytek Sfax (Noir Profond & Blanc) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-14 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-zinc-100" />
                Showroom Physique à Sfax
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-heading font-black leading-tight text-white tracking-tight">
                Venez découvrir vos smartphones en magasin ou commandez en ligne
              </h2>
              
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xl font-normal">
                Boutique située à Sfax sur la <strong className="text-white">Route de l'Ain km 3,5</strong> (à côté de la station Shell). Téléphones neufs sous blister scellé, coques haut de gamme, verres trempés posés gratuitement et trottinettes électriques prêtes à l'essai.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="tel:+21625455300"
                  className="px-6 py-3.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-black" />
                  <span>Appeler le 25 455 300</span>
                </a>
                <a
                  href="https://wa.me/21625455300?text=Bonjour%20Mobytek,%20je%20souhaite%20l'emplacement%20exact%20du%20showroom"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Localisation sur WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-6 rounded-2xl shadow-2xl w-full max-w-sm space-y-4 text-white">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">Horaires Showroom</span>
                  <span className="text-xs text-white font-mono flex items-center gap-1.5 bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Ouvert 6j/7
                  </span>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                    <span className="text-zinc-400 font-medium">Lundi - Samedi</span>
                    <span className="font-bold text-white font-mono">09h00 - 20h00</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                    <span className="text-zinc-400 font-medium">Dimanche</span>
                    <span className="font-bold text-zinc-300">Commandes en ligne</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-400 font-medium">Repère</span>
                    <span className="font-bold text-zinc-200">Kiosque Shell Route El Ain</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed font-normal">
                  🚚 <strong className="text-white">Livraison Express 24h/48h</strong> assurée dans les 24 gouvernorats avec paiement sécurisé en espèces à la livraison.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Nouveautés & Promotions du Moment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              <span>Offres Spéciales Mobytek</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-zinc-950 tracking-tight">
              Promotions &amp; Packs
            </h2>
          </div>
          <Link
            to="/catalogue?promo=true"
            className="text-xs font-bold text-zinc-900 hover:text-black flex items-center gap-1.5 group self-start sm:self-auto border-b border-zinc-300 pb-0.5 hover:border-black transition"
          >
            <span>Toutes les promotions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promoProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Real Facebook Showroom Photos Feed */}
      <ShowroomPhotosFeed />

      {/* 8. Community Facebook & Instagram Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-50 rounded-3xl p-8 sm:p-12 border border-zinc-200 text-center space-y-6 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Communauté Mobytek</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-black text-zinc-950 max-w-xl mx-auto tracking-tight">
            Plus de 5 800 passionnés de tech nous font confiance
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            📱 « <strong>Votre destination Mobytek !</strong> Smartphones, coques, écouteurs, chargeurs et trottinettes — authenticité garantie et prix imbattables. »
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://www.facebook.com/p/Mobytek-61574218696687/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Page Facebook Mobytek</span>
            </a>

            <a
              href="https://www.instagram.com/moby_tek"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold text-xs shadow-sm transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram @moby_tek</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
