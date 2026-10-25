import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  MapPin,
  User
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import MobyTekLogo from './MobyTekLogo';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Main Navigation Bar */}
      <div className="glass-header shadow-2xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center group shrink-0 py-1">
              <MobyTekLogo variant="light" size="md" showSubtitle={true} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                to="/"
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-zinc-700 hover:text-black hover:bg-zinc-100 transition duration-200"
              >
                Accueil
              </Link>
              <Link
                to="/catalogue"
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-zinc-700 hover:text-black hover:bg-zinc-100 transition duration-200"
              >
                Produits
              </Link>
              <Link
                to="/categories"
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-zinc-700 hover:text-black hover:bg-zinc-100 transition duration-200"
              >
                Catégories
              </Link>
              <Link
                to="/a-propos"
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-zinc-700 hover:text-black hover:bg-zinc-100 transition duration-200"
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-zinc-700 hover:text-black hover:bg-zinc-100 transition duration-200"
              >
                Contact & Showroom
              </Link>
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
              <input
                type="text"
                placeholder="Rechercher un smartphone, accessoire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-100/80 border border-zinc-200/90 focus:border-black focus:bg-white rounded-full py-2.5 pl-11 pr-10 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Right Action Buttons */}
            <div className="flex items-center space-x-2.5">
              {/* WhatsApp direct call button */}
              <a
                href="https://wa.me/21625455300"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-zinc-100 text-zinc-800 border border-zinc-200 hover:bg-black hover:text-white transition duration-200"
                title="Discuter sur WhatsApp"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>WhatsApp</span>
              </a>

              {/* Admin Login Button */}
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-zinc-700 hover:text-black hover:bg-zinc-100 transition border border-zinc-200 shadow-2xs"
                title="Connexion Espace Admin"
              >
                <User className="w-4 h-4 text-zinc-500" />
                <span className="hidden sm:inline">Admin</span>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white transition flex items-center justify-center group shadow-sm"
                aria-label="Voir le panier"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition duration-200" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-black border border-zinc-300 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-zinc-800 hover:bg-zinc-100 transition"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <form onSubmit={handleSearchSubmit} className="relative mt-2">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-100 border border-zinc-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-black"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <div className="flex flex-col space-y-1 font-medium text-zinc-800 pt-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-black transition"
              >
                Accueil
              </Link>
              <Link
                to="/catalogue"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-black transition"
              >
                Tous les Produits
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-black transition"
              >
                Catégories
              </Link>
              <Link
                to="/a-propos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-black transition"
              >
                À propos de Mobytek
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-black transition"
              >
                Contact & Showroom Sfax
              </Link>
              <a
                href="tel:+21625455300"
                className="px-3 py-2 rounded-xl text-zinc-900 font-bold hover:bg-zinc-100 transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-zinc-600" />
                <span>+216 25 455 300 / 21 121 870</span>
              </a>

              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-zinc-900 font-semibold hover:bg-zinc-100 transition flex items-center gap-2 border-t border-zinc-100 pt-3"
              >
                <User className="w-4 h-4 text-zinc-900" />
                <span>Connexion Espace Admin</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
