import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw, 
  PackageX, 
  Sparkles,
  Check
} from 'lucide-react';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedBrand = searchParams.get('brand') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'popularity';
  const filterPromo = searchParams.get('promo') === 'true';
  const filterNew = searchParams.get('isNew') === 'true';
  const maxPriceFilter = searchParams.get('maxPrice') || '';

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const brands = ['Apple', 'Samsung', 'Xiaomi', 'Anker', 'Baseus'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error('Erreur chargement catégories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'all') params.category = selectedCategory;
        if (selectedBrand !== 'all') params.brand = selectedBrand;
        if (searchQuery) params.search = searchQuery;
        if (sortBy) params.sort = sortBy;
        if (filterPromo) params.promo = true;
        if (filterNew) params.isNew = true;
        if (maxPriceFilter) params.maxPrice = maxPriceFilter;

        const res = await api.getProducts(params);
        if (res.success) setProducts(res.data);
      } catch (err) {
        console.error('Erreur chargement produits:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === false) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setIsMobileFilterOpen(false);
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery || filterPromo || filterNew || maxPriceFilter;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
            Catalogue Produits & Accessoires
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Découvrez nos téléphones portables, smartphones et accessoires officiels avec prix en Dinars Tunisiens (DT).
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Rechercher par modèle..."
            value={searchQuery}
            onChange={(e) => updateParam('search', e.target.value)}
            className="w-full bg-white border border-slate-300 focus:border-brand-500 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex items-center gap-3">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs shadow-sm transition border ${
            hasActiveFilters 
              ? 'bg-brand-50 border-brand-200 text-brand-700' 
              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-600" />
          <span>{isMobileFilterOpen ? 'Masquer les Filtres' : 'Filtres & Marques'}</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold"
            title="Réinitialiser"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Filter Sidebar (Collapsible on mobile) */}
        <aside className={`lg:col-span-1 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-6 shadow-sm sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-heading font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                <span>Filtres de recherche</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Quick Checkbox Filters */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Offres spéciales</span>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterPromo}
                    onChange={(e) => updateParam('promo', e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                  />
                  <span>Promotions & Réductions</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterNew}
                    onChange={(e) => updateParam('isNew', e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                  />
                  <span>Nouveautés 2026</span>
                </label>
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Catégories</span>
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                <button
                  onClick={() => {
                    updateParam('category', 'all');
                    setIsMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Toutes les catégories</span>
                  {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      updateParam('category', cat.id);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-brand-50 text-brand-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Marques</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateParam('brand', 'all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    selectedBrand === 'all'
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  Toutes
                </button>
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => updateParam('brand', b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      selectedBrand === b
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Budget Max (DT)</span>
              <div className="space-y-2">
                <input
                  type="range"
                  min="50"
                  max="6000"
                  step="50"
                  value={maxPriceFilter || 6000}
                  onChange={(e) => updateParam('maxPrice', e.target.value)}
                  className="w-full accent-brand-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 font-semibold">
                  <span>50 DT</span>
                  <span className="text-brand-600 font-bold">{maxPriceFilter ? `${maxPriceFilter} DT` : 'Illimité'}</span>
                  <span>6000 DT</span>
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* Right Column: Products List & Sorting Header */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
            <div className="text-xs text-slate-500 font-medium">
              Affichage de <span className="font-bold text-slate-900">{products.length}</span> produit(s)
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
              <label htmlFor="sortSelect" className="text-xs font-semibold text-slate-600 shrink-0">
                Trier par :
              </label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="popularity">Popularité & Avis</option>
                <option value="price-asc">Prix : Moins cher au plus cher</option>
                <option value="price-desc">Prix : Plus cher au moins cher</option>
                <option value="newest">Nouveautés récentes</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-96 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <PackageX className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Aucun produit ne correspond à vos critères</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Essayez d'ajuster vos filtres, de réinitialiser la recherche ou de choisir une autre catégorie.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
