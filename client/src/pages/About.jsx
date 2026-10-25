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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
          <span>Boutique Officielle à Sfax</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-zinc-950 tracking-tight">
          À Propos de Mobytek
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed font-normal">
          « <strong>Votre destination Mobytek !</strong> Smartphones, coques, écouteurs, chargeurs et plus encore — authenticité, garantie officielle et prix justes avec expédition rapide sur toute la Tunisie. »
        </p>
      </div>

      {/* Grid of Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center border border-zinc-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-zinc-950">Qualité & Garantie</h3>
          <p className="text-xs text-zinc-600 leading-relaxed font-normal">
            Chez Mobytek, chaque smartphone et chaque accessoire est rigoureusement certifié pour vous assurer une fiabilité absolue avec garantie officielle constructeur.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center border border-zinc-200">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-zinc-950">Prix Imbattables en Tunisie</h3>
          <p className="text-xs text-zinc-600 leading-relaxed font-normal">
            Nous proposons les meilleurs tarifs en Dinars Tunisiens (DT) sur les modèles les plus demandés (iPhone, Samsung Galaxy, Xiaomi) et tous les accessoires indispensables.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center border border-zinc-200">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-zinc-950">Une Forte Communauté</h3>
          <p className="text-xs text-zinc-600 leading-relaxed font-normal">
            Suivie par des milliers de passionnés sur Facebook et Instagram (<span className="font-semibold text-zinc-950 font-mono">@moby_tek</span>), notre équipe reste au plus près de vous avec des conseils et un support personnalisé.
          </p>
        </div>
      </div>

      {/* Showroom & Logistics Section */}
      <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Showroom Sfax & Expédition 24/48h</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white">
            Visitez notre magasin ou faites-vous livrer chez vous
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            Retrouvez-nous directement à notre boutique située à Sfax sur la <strong className="text-white">Route de l'Ain km 3,5</strong> (juste à côté du kiosque Shell), ou commandez en ligne avec paiement sécurisé en espèces à la livraison.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs shadow-md hover:bg-zinc-100 transition"
            >
              <span>Voir les produits disponibles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+21625455300"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-bold text-xs border border-zinc-700 transition"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>+216 25 455 300</span>
            </a>
          </div>
        </div>

        <div className="space-y-3 shrink-0 bg-zinc-900 border border-zinc-800 text-white p-6 rounded-2xl shadow-xl text-xs w-full max-w-sm">
          <div className="flex items-center gap-2.5 font-semibold text-white border-b border-zinc-800 pb-2">
            <MapPin className="w-4 h-4 text-white shrink-0" />
            <span>Route de l'Ain km 3.5 (à côté de Shell), Sfax</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>Livraison garantie sur les 24 gouvernorats</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>Paiement en espèces à la livraison</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>Conseils personnalisés & SAV joignable 7j/7</span>
          </div>
        </div>
      </div>

    </div>
  );
}
