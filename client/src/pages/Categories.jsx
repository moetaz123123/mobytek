import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import { Layers, Sparkles } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error('Erreur chargement catégories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-mono font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Rayons Mobytek</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-black text-zinc-950 tracking-tight">
          Toutes nos Catégories de Produits
        </h1>
        <p className="text-sm text-zinc-500">
          Trouvez instantanément l'appareil ou l'accessoire qui répond à vos exigences techniques.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
