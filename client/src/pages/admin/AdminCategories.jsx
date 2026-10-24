import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  CheckCircle2, 
  Layers, 
  Loader2, 
  UploadCloud, 
  FolderOpen, 
  Image as ImageIcon, 
  Link2, 
  Check, 
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Search
} from 'lucide-react';
import realPowerbankImg from '../../assets/powerbank-real.jpg';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modals & Actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
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
    description: '',
    icon: 'Smartphone',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.getCategories();
      if (res.success) setCategories(res.data);
    } catch (err) {
      console.error('Erreur chargement catégories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Image File Handling
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
      setFormData(prev => ({ ...prev, image_url: event.target.result }));
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

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData(initialForm);
    setFileMeta(null);
    setUploadMode('file');
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setUploadMode(cat.image_url ? 'file' : 'file');
    setFileMeta(cat.image_url ? { name: 'Photo actuelle de la catégorie', size: '' } : null);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      icon: cat.icon || 'Smartphone',
      image_url: cat.image_url || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalImageUrl = formData.image_url;

      // If user uploaded a photo from desktop (base64)
      if (formData.image_url && formData.image_url.startsWith('data:image')) {
        try {
          const uploadRes = await api.uploadImage(formData.image_url, fileMeta?.name || 'categorie');
          if (uploadRes.success && uploadRes.url) {
            finalImageUrl = uploadRes.url;
          }
        } catch (uploadErr) {
          console.warn('Upload image catégorie serveur échoué, utilisation directe:', uploadErr);
        }
      }

      const payload = {
        ...formData,
        image_url: finalImageUrl || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
      };

      if (editingCategory) {
        await api.updateCategory(editingCategory.id, payload);
        setFeedback(`La catégorie « ${formData.name} » a été mise à jour.`);
      } else {
        await api.createCategory(payload);
        setFeedback(`Nouvelle catégorie « ${formData.name} » créée avec succès.`);
      }

      setIsModalOpen(false);
      fetchCategories();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      alert(err.message || 'Erreur lors de la sauvegarde de la catégorie.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    setDeleting(true);
    try {
      await api.deleteCategory(categoryToDelete.id);
      setFeedback(`La catégorie « ${categoryToDelete.name} » a été supprimée.`);
      setCategoryToDelete(null);
      fetchCategories();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      alert(err.message || 'Impossible de supprimer cette catégorie.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
            Gestion des Catégories & Rayons
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organisez les univers de Mobytek (Smartphones, Écouteurs & Audio, Chargeurs, Objets Connectés) et personnalisez leurs photos d'illustration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchCategories}
            title="Rafraîchir"
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 transition shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-600' : ''}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Ajouter une catégorie</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-2xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl py-2 pl-9 pr-3 text-xs font-semibold focus:bg-white focus:outline-none transition"
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
        <span className="text-xs text-slate-500 font-semibold self-start sm:self-auto">
          <strong className="text-slate-900">{filteredCategories.length}</strong> catégorie(s) active(s)
        </span>
      </div>

      {/* Grid of Categories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-white rounded-3xl border border-slate-200 animate-pulse" />)
        ) : filteredCategories.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-heading font-bold text-slate-800 text-sm">Aucune catégorie trouvée</p>
            <p className="text-xs text-slate-400 mt-1">Essayez de modifier votre recherche ou ajoutez une nouvelle catégorie.</p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs group-hover:border-brand-300 transition">
                      <img
                        src={(cat.slug === 'powerbanks' || cat.name?.toLowerCase().includes('powerbank')) ? realPowerbankImg : cat.image_url}
                        alt={cat.name}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = realPowerbankImg;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-slate-900 text-sm group-hover:text-brand-600 transition">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        slug: /{cat.slug || cat.id?.slice(0, 8)}
                      </span>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition"
                      title="Modifier la catégorie"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCategoryToDelete(cat)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      title="Supprimer la catégorie"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {cat.description || 'Présentation générale des produits de cette catégorie.'}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-slate-400">Rayon Mobytek</span>
                <Link
                  to={`/catalogue?category=${cat.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 text-[11px] transition"
                >
                  <span>Voir en boutique</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-black text-slate-900">
                Supprimer cette catégorie ?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Êtes-vous sûr de vouloir supprimer la catégorie <strong className="text-slate-900">« {categoryToDelete.name} »</strong> ?
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setCategoryToDelete(null)}
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

      {/* Create / Edit Modal with Compact Layout (Fits 100% Zoom) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up border border-slate-100">
            
            {/* Header */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h2 className="text-sm font-heading font-black text-slate-900 leading-tight">
                    {editingCategory ? 'Modifier la catégorie' : 'Créer une catégorie'}
                  </h2>
                  <span className="text-[10px] text-slate-400 font-medium">Rayons & Catalogue Mobytek</span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-3.5 text-xs">
              
              {/* Category Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 text-[11px]">Nom de la catégorie *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Écouteurs & Audio, Smartphones..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl py-1.5 px-3 text-xs font-semibold focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 text-[11px]">Description</label>
                <textarea
                  rows="2"
                  placeholder="Courte description pour présenter les produits de ce rayon aux clients..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl py-1.5 px-3 text-xs font-medium focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* IMAGE IMPORT SECTION: Direct from Desktop / PC */}
              <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-brand-600" />
                    <span>Photo d'illustration *</span>
                  </label>

                  {/* Mode switcher: Desktop import vs URL */}
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[9px] font-bold">
                    <button
                      type="button"
                      onClick={() => setUploadMode('file')}
                      className={`px-1.5 py-0.5 rounded transition ${
                        uploadMode === 'file' 
                          ? 'bg-white text-brand-700 shadow-2xs' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      📁 Du PC
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('url')}
                      className={`px-1.5 py-0.5 rounded transition ${
                        uploadMode === 'url' 
                          ? 'bg-white text-brand-700 shadow-2xs' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      🔗 URL
                    </button>
                  </div>
                </div>

                {/* Mode 1: Import directly from Desktop / Local Storage */}
                {uploadMode === 'file' && (
                  <div>
                    {/* Hidden native file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFile(e.target.files?.[0])}
                      className="hidden"
                    />

                    {formData.image_url ? (
                      /* Selected Image Preview Box */
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                            <img
                              src={formData.image_url}
                              alt="Aperçu catégorie"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 text-[11px] block truncate">
                              {fileMeta?.name || 'Photo sélectionnée'}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                                <Check className="w-2.5 h-2.5 text-emerald-600" />
                                Prête
                              </span>
                              {fileMeta?.size && (
                                <span className="text-[9px] text-slate-400 font-medium">
                                  {fileMeta.size}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] transition shadow-2xs flex items-center gap-1"
                          >
                            <FolderOpen className="w-3 h-3 text-brand-600" />
                            <span>Changer</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, image_url: '' }));
                              setFileMeta(null);
                              if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Retirer la photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Drag and Drop / Click to Upload Box */
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-3.5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-1 ${
                          isDragging 
                            ? 'border-brand-500 bg-brand-50/50 scale-[0.99]' 
                            : 'border-slate-300 hover:border-brand-400 bg-slate-50/60 hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-0.5 shadow-2xs">
                          <UploadCloud className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-[11px]">
                            Cliquez pour choisir une photo sur votre <span className="text-brand-600">Bureau / PC</span>
                          </p>
                          <p className="text-[10px] text-slate-400">
                            ou glissez-déposez l'image ici (JPG, PNG, WEBP)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mode 2: External Web URL */}
                {uploadMode === 'url' && (
                  <div className="space-y-1">
                    <div className="relative">
                      <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        placeholder="https://..."
                        value={formData.image_url}
                        onChange={(e) => {
                          setFormData({ ...formData, image_url: e.target.value });
                          setFileMeta(null);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-500 rounded-xl py-1.5 pl-8 pr-3 text-xs font-medium focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold flex items-center gap-1.5 shadow-sm transition disabled:opacity-50 text-xs"
                >
                  {submitting && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>{editingCategory ? 'Enregistrer les modifications' : 'Valider'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
