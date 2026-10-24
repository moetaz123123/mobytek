import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Users, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Phone
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Boutique Officielle à Sfax</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight">
          À Propos de Mobytek
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          « <strong>Votre destination Mobytek !</strong> Smartphones, coques, écouteurs, chargeurs et plus encore — qualité, garantie et prix imbattables avec livraison rapide sur toute la Tunisie. »
        </p>
      </div>

      {/* Grid of Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Qualité & Garantie</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Chez Mobytek, chaque smartphone et chaque accessoire est rigoureusement sélectionné et testé pour vous assurer une fiabilité absolue avec garantie officielle constructeur.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Prix Imbattables en Tunisie</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nous proposons les meilleurs tarifs en Dinars Tunisiens (DT) sur les modèles les plus demandés (iPhone, Samsung Galaxy, Xiaomi) et tous les accessoires indispensables.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Une Forte Communauté</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Suivie par des milliers de passionnés sur Facebook et Instagram (<span className="font-semibold text-brand-600">@moby_tek</span>), notre équipe reste au plus près de vous avec des unboxings, des conseils et un support personnalisé.
          </p>
        </div>
      </div>

      {/* Showroom & Logistics Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Showroom Sfax & Expédition 24/48h</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black">
            Visitez notre magasin ou faites-vous livrer chez vous
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
            Retrouvez-nous directement à notre boutique située à Sfax sur la <strong>Route de l'Ain km 3,5</strong> (juste à côté du kiosque Shell), ou commandez en ligne avec paiement sécurisé en espèces au livreur à réception.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md hover:bg-blue-50 transition"
            >
              <span>Voir les produits disponibles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+21625455300"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white font-semibold text-xs border border-white/20 transition"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+216 25 455 300</span>
            </a>
          </div>
        </div>

        <div className="space-y-3 shrink-0 bg-white/95 text-slate-800 p-6 rounded-3xl shadow-xl text-xs w-full max-w-sm">
          <div className="flex items-center gap-2.5 font-semibold text-slate-900 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Route de l'Ain km 3.5 (à côté de Shell), Sfax</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Livraison garantie sur les 24 gouvernorats</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Paiement en espèces à la livraison</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Conseils personnalisés & SAV joignable 7j/7</span>
          </div>
        </div>
      </div>

    </div>
  );
}
