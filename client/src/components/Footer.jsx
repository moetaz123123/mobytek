import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard 
} from 'lucide-react';
import MobyTekLogo from './MobyTekLogo';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar - Clean Carbon Monochrome Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-12 mb-12 border-b border-zinc-900">
          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 shadow-sm hover:border-zinc-700 transition">
            <div className="w-11 h-11 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Livraison Tunisie</p>
              <p className="text-xs text-zinc-400 font-medium">24 à 48h express</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 shadow-sm hover:border-zinc-700 transition">
            <div className="w-11 h-11 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Garantie Officielle</p>
              <p className="text-xs text-zinc-400 font-medium">100% neufs & certifiés</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 shadow-sm hover:border-zinc-700 transition">
            <div className="w-11 h-11 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Paiement Réception</p>
              <p className="text-xs text-zinc-400 font-medium">Espèces au livreur</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 shadow-sm hover:border-zinc-700 transition">
            <div className="w-11 h-11 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Support Réactif 7j/7</p>
              <p className="text-xs text-zinc-400 font-medium">Par WhatsApp & appel</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <MobyTekLogo variant="dark" size="lg" showSubtitle={true} />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm font-normal">
              📱 Votre destination <strong className="text-white">Mobytek</strong> à Sfax ! Smartphones haut de gamme, coques de protection, écouteurs, chargeurs rapides et trottinettes électriques — authenticité, garantie officielle et livraison express sur toute la Tunisie.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.facebook.com/p/Mobytek-61574218696687/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-white hover:text-black hover:border-white shadow-sm flex items-center justify-center transition-all"
                title="Page Facebook officielle Mobytek Sfax"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/moby_tek"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-white hover:text-black hover:border-white shadow-sm flex items-center justify-center transition-all"
                title="Compte Instagram officiel @moby_tek"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://wa.me/21625455300"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-white hover:text-black hover:border-white shadow-sm flex items-center justify-center transition-all font-mono font-bold text-xs"
                title="WhatsApp Mobytek"
              >
                WA
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
              <li><Link to="/catalogue" className="hover:text-white transition">Tous les téléphones</Link></li>
              <li><Link to="/catalogue?promo=true" className="hover:text-white transition">Promotions</Link></li>
              <li><Link to="/catalogue?isNew=true" className="hover:text-white transition">Nouveautés 2026</Link></li>
              <li><Link to="/categories" className="hover:text-white transition">Nos Catégories</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider">Rayons Phares</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link to="/catalogue?brand=Apple" className="hover:text-white transition">iPhones Apple</Link></li>
              <li><Link to="/catalogue?brand=Samsung" className="hover:text-white transition">Samsung Galaxy</Link></li>
              <li><Link to="/catalogue?brand=Xiaomi" className="hover:text-white transition">Smartphones Xiaomi</Link></li>
              <li><Link to="/catalogue?category=c2222222-2222-2222-2222-222222222222" className="hover:text-white transition">Écouteurs &amp; Audio</Link></li>
              <li><Link to="/catalogue?category=c7777777-7777-7777-7777-777777777777" className="hover:text-white transition">Trottinettes &amp; Mobilité</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider">Showroom Sfax</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-medium">
                  Route de l'Ain km 3,5 <br />
                  <span className="text-xs text-zinc-500">(Kiosque Shell)</span><br />
                  Sfax, Tunisie
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-300 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+21625455300" className="text-white hover:text-zinc-300 transition font-mono font-bold">+216 25 455 300</a>
                  <a href="tel:+21621121870" className="text-zinc-400 hover:text-white transition font-mono text-xs">+216 21 121 870</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zinc-300 shrink-0" />
                <a href="mailto:contact@mobytek.tn" className="hover:text-white transition">contact@mobytek.tn</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-zinc-300 shrink-0" />
                <span className="text-zinc-400">Lun - Sam : 09h00 - 20h00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-zinc-900 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Mobytek Sfax Tunisie. Tous droits réservés.</p>
          <div className="flex items-center space-x-6">
            <Link to="/a-propos" className="hover:text-white transition">À Propos</Link>
            <Link to="/contact" className="hover:text-white transition">Contact Showroom</Link>
            <Link to="/admin/login" className="text-zinc-600 hover:text-zinc-400 transition font-mono">Portail Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
