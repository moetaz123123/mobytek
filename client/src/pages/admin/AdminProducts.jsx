import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Smartphone, 
  Sparkles,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  Eye,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Package,
  Layers,
  Tag,
  RefreshCw,
  UploadCloud,
  FolderOpen,
  Image as ImageIcon,
  Link2
} from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStockFilter, setSelectedStockFilter] = useState('all'); // all, in_stock, low_stock, out_of_stock
  const [sortBy, setSortBy] = useState('default'); // default, price_asc, price_desc, stock_asc, name_asc

  // Modals & Actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Image Upload State
  const fileInputRef = useRef(null);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'
  const [fileMeta, setFileMeta] = useState(null); // { name, size }
  const [isDragging, setIsDragging] = useState(false);

  const initialForm = {
    name: '',
    brand: 'Apple',
    category_id: '',
    price: '',
    original_price: '',
    stock: '10',
    description: '',
    imageUrl: '',
    is_featured: false,
    is_promo: false,
    is_new: true,
    specs_screen: '',
    specs_ram: '',
    specs_storage: '',
    specs_battery: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        api.getProducts({}),
        api.getCategories()
      ]);
      if (prodRes.success) setProducts(prodRes.data);
      if (catRes.success) {
        setCategories(catRes.data);
        if (!formData.category_id && catRes.data.length > 0) {
          setFormData(prev => ({ ...prev, category_id: catRes.data[0].id }));
        }
      }
    } catch (err) {
      console.error('Erreur chargement admin produits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price) + ' DT';
  };

  // Image File Selection & Drag & Drop Handling
  const handleImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (JPG, PNG, WEBP, GIF).');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      alert('La taille de l\'image ne doit pas dépasser 20 Mo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, imageUrl: event.target.result }));
      setFileMeta({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' Mo'
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = prod.name?.toLowerCase().includes(q);
        const matchesBrand = prod.brand?.toLowerCase().includes(q);
        const matchesCat = prod.category_name?.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (prod.category_id !== selectedCategory && prod.category_name?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Stock filter
      if (selectedStockFilter === 'in_stock' && prod.stock <= 0) return false;
      if (selectedStockFilter === 'low_stock' && (prod.stock <= 0 || prod.stock > 5)) return false;
      if (selectedStockFilter === 'out_of_stock' && prod.stock > 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'stock_asc') return a.stock - b.stock;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, search, selectedCategory, selectedStockFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = products.length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStock = products.filter(p => p.stock <= 0).length;
    const inPromo = products.filter(p => p.is_promo).length;
    return { total, lowStock, outOfStock, inPromo };
  }, [products]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFileMeta(null);
    setUploadMode('file');
    setFormData({
      ...initialForm,
      category_id: categories[0]?.id || ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setUploadMode(prod.images?.[0] ? 'file' : 'file');
    setFileMeta(prod.images?.[0] ? { name: 'Photo actuelle du produit', size: '' } : null);
    setFormData({
      name: prod.name,
      brand: prod.brand,
      category_id: prod.category_id || categories[0]?.id || '',
      price: prod.price.toString(),
      original_price: prod.original_price ? prod.original_price.toString() : '',
      stock: prod.stock.toString(),
      description: prod.description || '',
      imageUrl: prod.images?.[0] || '',
      is_featured: Boolean(prod.is_featured),
      is_promo: Boolean(prod.is_promo),
      is_new: Boolean(prod.is_new),
      specs_screen: prod.specs?.["Écran"] || prod.specs?.ecran || '',
      specs_ram: prod.specs?.RAM || prod.specs?.ram || '',
      specs_storage: prod.specs?.Stockage || prod.specs?.stockage || '',
      specs_battery: prod.specs?.Batterie || prod.specs?.batterie || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalImageUrl = formData.imageUrl;

      // If user imported a file directly from desktop (base64 data URL)
      if (formData.imageUrl && formData.imageUrl.startsWith('data:image')) {
        try {
          const uploadRes = await api.uploadImage(formData.imageUrl, fileMeta?.name || 'produit');
          if (uploadRes.success && uploadRes.url) {
            finalImageUrl = uploadRes.url;
          }
        } catch (uploadErr) {
          console.warn('Upload image serveur échoué, utilisation directe:', uploadErr);
        }
      }

      const payload = {
        name: formData.name,
        brand: formData.brand,
        category_id: formData.category_id,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        stock: parseInt(formData.stock, 10),
        description: formData.description,
        images: finalImageUrl ? [finalImageUrl] : ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
        is_featured: formData.is_featured,
        is_promo: formData.is_promo,
        is_new: formData.is_new,
        specs: {
          ...(formData.specs_screen && { "Écran": formData.specs_screen }),
          ...(formData.specs_ram && { "RAM": formData.specs_ram }),
          ...(formData.specs_storage && { "Stockage": formData.specs_storage }),
          ...(formData.specs_battery && { "Batterie": formData.specs_battery })
        }
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
        setFeedback(`Le produit "${formData.name}" a été mis à jour avec succès.`);
      } else {
        await api.createProduct(payload);
        setFeedback(`Nouveau produit "${formData.name}" ajouté avec succès au catalogue.`);
      }

      setIsModalOpen(false);
      fetchData();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      alert(err.message || 'Erreur lors de la sauvegarde du produit.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await api.deleteProduct(productToDelete.id);
      setFeedback(`Le produit "${productToDelete.name}" a été retiré du catalogue.`);
      setProductToDelete(null);
      fetchData();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      alert(err.message || 'Impossible de supprimer ce produit.');
    } finally {
      setDeleting(false);
    }
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedStockFilter('all');
    setSortBy('default');
  };

  const hasActiveFilters = Boolean(search || selectedCategory !== 'all' || selectedStockFilter !== 'all' || sortBy !== 'default');

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
            Gestion des Produits & Stock
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez votre catalogue Mobytek, importez des photos depuis votre bureau, mettez à jour les prix et contrôlez le stock.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            title="Rafraîchir les données"
            className="p-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-200 transition shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-zinc-950' : ''}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un produit</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-2xs flex items-center justify-between hover:border-black transition">
          <div>
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Catalogue</span>
            <div className="text-xl font-mono font-black text-zinc-950">{stats.total} <span className="text-xs font-semibold text-zinc-400">références</span></div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 border border-zinc-200 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-2xs flex items-center justify-between hover:border-black transition">
          <div>
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Stock Optimal</span>
            <div className="text-xl font-mono font-black text-zinc-950">{stats.total - stats.lowStock - stats.outOfStock}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 border border-zinc-200 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-2xs flex items-center justify-between hover:border-black transition">
          <div>
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Stock Faible (≤ 5)</span>
            <div className="text-xl font-mono font-black text-zinc-950">
              {stats.lowStock}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 border border-zinc-200 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-2xs flex items-center justify-between hover:border-black transition">
          <div>
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">En Promotion</span>
            <div className="text-xl font-mono font-black text-zinc-950">{stats.inPromo}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 border border-zinc-200 flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-zinc-100 border border-zinc-300 text-zinc-950 text-xs font-bold flex items-center gap-2 shadow-2xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, marque, modèle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl py-2 pl-9 pr-8 text-xs font-semibold focus:outline-none focus:bg-white transition"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Category filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filtrer par catégorie"
                className="bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold text-xs rounded-xl py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition cursor-pointer"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Stock status filter */}
            <div className="relative">
              <select
                value={selectedStockFilter}
                onChange={(e) => setSelectedStockFilter(e.target.value)}
                aria-label="Filtrer par statut de stock"
                className="bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold text-xs rounded-xl py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition cursor-pointer"
              >
                <option value="all">Tous les stocks</option>
                <option value="in_stock">En stock (&gt; 0)</option>
                <option value="low_stock">Stock faible (≤ 5)</option>
                <option value="out_of_stock">Rupture de stock (0)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Trier les produits"
                className="bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold text-xs rounded-xl py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition cursor-pointer"
              >
                <option value="default">Tri par défaut</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="stock_asc">Stock croissant</option>
                <option value="name_asc">Nom A-Z</option>
              </select>
            </div>

            {/* Reset Filters button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-zinc-950 hover:underline px-2 py-1 rounded-lg hover:bg-zinc-100 transition"
              >
                Réinitialiser
              </button>
            )}

          </div>
        </div>

        {/* Counter readout */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Affichage de <strong className="text-slate-800">{filteredProducts.length}</strong> sur <strong className="text-slate-800">{products.length}</strong> article(s)
          </span>
          {hasActiveFilters && (
            <span className="text-zinc-950 font-bold font-mono">Filtres actifs</span>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 uppercase tracking-wider font-mono font-bold">
                <th className="py-3.5 px-5">Produit & Réf.</th>
                <th className="py-3.5 px-4">Marque</th>
                <th className="py-3.5 px-4">Catégorie</th>
                <th className="py-3.5 px-4">Prix de Vente</th>
                <th className="py-3.5 px-4">Disponibilité</th>
                <th className="py-3.5 px-4">Badges</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-zinc-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Loader2 className="w-6 h-6 animate-spin text-zinc-950" />
                      <span className="text-xs font-bold text-zinc-600">Chargement du catalogue...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mb-1 border border-zinc-200">
                        <Package className="w-6 h-6" />
                      </div>
                      <p className="font-heading font-bold text-zinc-900 text-sm">
                        Aucun produit ne correspond à votre recherche
                      </p>
                      <p className="text-xs text-zinc-400 max-w-sm">
                        Essayez de modifier vos filtres ou de réinitialiser la recherche pour voir toutes les références.
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={resetFilters}
                          className="mt-2 px-3.5 py-1.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition active:scale-[0.99]"
                        >
                          Réinitialiser les filtres
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => {
                  const discountPercent = prod.original_price && prod.original_price > prod.price
                    ? Math.round(((prod.original_price - prod.price) / prod.original_price) * 100)
                    : null;

                  return (
                    <tr key={prod.id} className="hover:bg-zinc-50 transition group">
                      
                      {/* Product Thumbnail & Name */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 p-1 shrink-0 flex items-center justify-center shadow-2xs group-hover:border-black transition">
                            <img
                              src={prod.images?.[0] || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=150&q=80'}
                              alt={prod.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=150&q=80';
                              }}
                            />
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <button
                              onClick={() => openEditModal(prod)}
                              className="font-bold text-zinc-950 text-left line-clamp-1 hover:underline transition block text-[13px]"
                              title={prod.name}
                            >
                              {prod.name}
                            </button>
                            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                              <span>Réf : {prod.id?.slice(0, 8)}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Brand */}
                      <td className="py-3.5 px-4 font-bold text-slate-700">
                        <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px]">
                          {prod.brand}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="font-semibold text-slate-600">
                          {prod.category_name || 'Général'}
                        </span>
                      </td>

                      {/* Sale Price */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 text-sm">
                            {formatPrice(prod.price)}
                          </span>
                          {prod.original_price && prod.original_price > prod.price && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] text-slate-400 line-through">
                                {formatPrice(prod.original_price)}
                              </span>
                              {discountPercent && (
                                <span className="text-[9px] font-mono font-bold text-zinc-950 bg-zinc-100 border border-zinc-200 px-1.5 py-0.2 rounded">
                                  -{discountPercent}%
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Stock Status Badge */}
                      <td className="py-3.5 px-4">
                        {prod.stock <= 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-zinc-100 text-zinc-400 border border-zinc-200 line-through">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                            Rupture
                          </span>
                        ) : prod.stock <= 5 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-zinc-100 text-zinc-950 border border-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-pulse" />
                            {prod.stock} restant{prod.stock > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-zinc-50 text-zinc-900 border border-zinc-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                            {prod.stock} en stock
                          </span>
                        )}
                      </td>

                      {/* Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {prod.is_promo && (
                            <span className="px-2 py-0.5 rounded-md bg-black text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                              PROMO
                            </span>
                          )}
                          {prod.is_new && (
                            <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-900 border border-zinc-200 text-[9px] font-mono font-bold">
                              Nouveau
                            </span>
                          )}
                          {prod.is_featured && (
                            <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-100 text-[9px] font-mono font-bold flex items-center gap-0.5">
                              ★ Vedette
                            </span>
                          )}
                          {!prod.is_promo && !prod.is_new && !prod.is_featured && (
                            <span className="text-zinc-300 text-[10px]">—</span>
                          )}
                        </div>
                      </td>

                      {/* Action Buttons: Clean & Professional */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Modifier Button */}
                          <button
                            onClick={() => openEditModal(prod)}
                            className="px-2.5 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 hover:text-black text-zinc-700 border border-zinc-200 font-bold text-xs inline-flex items-center gap-1.5 transition shadow-2xs"
                            title="Modifier ce produit"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-zinc-500" />
                            <span className="hidden sm:inline">Modifier</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setProductToDelete(prod)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
                            title="Supprimer définitivement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Preview in Shop Button */}
                          <Link
                            to={`/produit/${prod.slug || prod.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                            title="Aperçu sur la boutique"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-black text-slate-900">
                Supprimer cette référence ?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Êtes-vous sûr de vouloir retirer le produit <strong className="text-slate-900">« {productToDelete.name} »</strong> du catalogue Mobytek ? Cette action est irréversible.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs transition"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirmer la suppression</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal with Compact 2-Column Responsive Layout (Fits 100% Zoom) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up border border-slate-100">
            
            {/* Compact Header */}
            <div className="px-6 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-950 border border-zinc-200 flex items-center justify-center shadow-2xs">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-heading font-black text-slate-900 leading-tight">
                    {editingProduct ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
                  </h2>
                  <span className="text-[10px] text-slate-400 font-medium">Catalogue Mobytek Sfax</span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Form Body with 2-Column Balanced Grid */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                
                {/* LEFT COLUMN: Main Info & Pricing (7 cols) */}
                <div className="md:col-span-7 space-y-3">
                  
                  {/* Nom du produit */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 text-[11px]">Nom du produit *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: iPhone 16 Pro Max 256 Go"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl py-1.5 px-3 text-xs font-semibold focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  {/* Marque & Catégorie */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 text-[11px]">Marque *</label>
                      <input
                        type="text"
                        required
                        placeholder="Apple, Samsung..."
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl py-1.5 px-3 text-xs font-medium focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 text-[11px]">Catégorie *</label>
                      <select
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl py-1.5 px-3 text-xs font-medium focus:bg-white focus:outline-none transition cursor-pointer"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Prix de vente, Prix barré, Stock (Grouped in 3 columns) */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 text-[11px]">Prix Vente (DT) *</label>
                      <input
                        type="number"
                        step="0.001"
                        required
                        placeholder="5299.000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-black rounded-xl py-1.5 px-2.5 text-xs font-mono font-bold text-zinc-950 focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-zinc-700 text-[11px]">Prix Barré (DT)</label>
                      <input
                        type="number"
                        step="0.001"
                        placeholder="Optionnel"
                        value={formData.original_price}
                        onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-black rounded-xl py-1.5 px-2.5 text-xs font-mono font-medium focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-zinc-700 text-[11px]">Quantité Stock *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        placeholder="10"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-black rounded-xl py-1.5 px-2.5 text-xs font-mono font-semibold focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="font-bold text-zinc-700 text-[11px]">Description Commerciale *</label>
                    <textarea
                      rows="2"
                      required
                      placeholder="Présentation des fonctionnalités et atouts du produit..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-black rounded-xl py-1.5 px-3 text-xs font-medium focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  {/* Badges / Options */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.is_promo}
                        onChange={(e) => setFormData({ ...formData, is_promo: e.target.checked })}
                        className="w-3.5 h-3.5 text-black rounded accent-black"
                      />
                      <span className="font-bold text-zinc-700 text-[11px]">En Promo</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.is_new}
                        onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                        className="w-3.5 h-3.5 text-black rounded accent-black"
                      />
                      <span className="font-bold text-zinc-700 text-[11px]">Nouveau 2026</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-3.5 h-3.5 text-black rounded accent-black"
                      />
                      <span className="font-bold text-zinc-700 text-[11px]">En Vedette (Bestseller)</span>
                    </label>
                  </div>

                </div>

                {/* RIGHT COLUMN: Photo & Specs (5 cols) */}
                <div className="md:col-span-5 space-y-3">
                  
                  {/* Photo Import Zone */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-zinc-700 text-[11px] flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-zinc-950" />
                        <span>Photo du Produit *</span>
                      </label>
                      <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg text-[9px] font-bold">
                        <button
                          type="button"
                          onClick={() => setUploadMode('file')}
                          className={`px-1.5 py-0.5 rounded transition ${uploadMode === 'file' ? 'bg-black text-white shadow-2xs' : 'text-zinc-500 hover:text-zinc-950'}`}
                        >
                          PC
                        </button>
                        <button
                          type="button"
                          onClick={() => setUploadMode('url')}
                          className={`px-1.5 py-0.5 rounded transition ${uploadMode === 'url' ? 'bg-black text-white shadow-2xs' : 'text-zinc-500 hover:text-zinc-950'}`}
                        >
                          URL
                        </button>
                      </div>
                    </div>

                    {uploadMode === 'file' ? (
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFile(e.target.files?.[0])}
                          className="hidden"
                        />

                        {formData.imageUrl ? (
                          <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-14 h-14 rounded-xl bg-white border border-zinc-200 p-1 shrink-0 flex items-center justify-center shadow-2xs">
                                <img
                                  src={formData.imageUrl}
                                  alt="Aperçu sélection"
                                  className="w-full h-full object-contain rounded-lg"
                                />
                              </div>
                              <div className="min-w-0">
                                <span className="font-bold text-zinc-950 text-[11px] block truncate">
                                  {fileMeta?.name || 'Photo sélectionnée'}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-zinc-900 bg-zinc-100 border border-zinc-200 px-1.5 py-0.2 rounded mt-0.5">
                                  <Check className="w-2.5 h-2.5" /> Prête
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-2 py-1 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 font-bold text-[10px] transition shadow-2xs flex items-center gap-1"
                              >
                                <FolderOpen className="w-3 h-3 text-zinc-950" />
                                <span>Changer</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, imageUrl: '' }));
                                  setFileMeta(null);
                                  if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-[10px] text-center"
                              >
                                Retirer
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-2xl p-3.5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-1 ${
                              isDragging 
                                ? 'border-black bg-zinc-100/50 scale-[0.99]' 
                                : 'border-zinc-300 hover:border-black bg-zinc-50/60 hover:bg-zinc-50'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-950 border border-zinc-200 flex items-center justify-center shadow-2xs">
                              <UploadCloud className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-bold text-zinc-800 text-[11px]">
                                Importer depuis votre <span className="text-zinc-950 underline">Bureau / PC</span>
                              </p>
                              <p className="text-[10px] text-zinc-400">
                                ou glissez l'image ici (JPG, PNG, WEBP)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <input
                          type="url"
                          placeholder="https://..."
                          value={formData.imageUrl}
                          onChange={(e) => {
                            setFormData({ ...formData, imageUrl: e.target.value });
                            setFileMeta(null);
                          }}
                          className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-black rounded-xl py-1.5 px-3 text-xs font-medium focus:bg-white focus:outline-none transition"
                        />
                      </div>
                    )}
                  </div>

                  {/* Specs Techniques Rapides */}
                  <div className="space-y-1.5 pt-1">
                    <span className="font-bold uppercase tracking-wider text-zinc-400 text-[9px] block font-mono">
                      Spécifications Techniques
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-zinc-500 font-semibold">Écran</label>
                        <input
                          type="text"
                          placeholder="Ex: 6.9 pouces OLED"
                          value={formData.specs_screen}
                          onChange={(e) => setFormData({ ...formData, specs_screen: e.target.value })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 text-[11px] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 font-semibold">Stockage</label>
                        <input
                          type="text"
                          placeholder="Ex: 256 Go"
                          value={formData.specs_storage}
                          onChange={(e) => setFormData({ ...formData, specs_storage: e.target.value })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 text-[11px] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 font-semibold">RAM</label>
                        <input
                          type="text"
                          placeholder="Ex: 8 Go"
                          value={formData.specs_ram}
                          onChange={(e) => setFormData({ ...formData, specs_ram: e.target.value })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 text-[11px] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 font-semibold">Batterie</label>
                        <input
                          type="text"
                          placeholder="Ex: 5000 mAh"
                          value={formData.specs_battery}
                          onChange={(e) => setFormData({ ...formData, specs_battery: e.target.value })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-1.5 text-[11px] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Fixed Footer Bar with Action Buttons */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-zinc-600 hover:bg-zinc-100 font-bold transition text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50 transition text-xs active:scale-[0.99]"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProduct ? 'Enregistrer les modifications' : 'Créer le produit'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
