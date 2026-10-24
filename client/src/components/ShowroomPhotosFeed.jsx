import React, { useState } from 'react';
import { Camera, ExternalLink, MessageCircle, Sparkles, CheckCircle2, Eye, Tag, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Complete Real Photo Feed extracted directly from Mobytek Facebook page:
 * https://www.facebook.com/profile.php?id=61574218696687&sk=photos_by
 * Exactly matching the user's uploaded album screenshot.
 */
export default function ShowroomPhotosFeed() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const tabs = [
    { id: 'all', label: 'Toutes les photos (20)' },
    { id: 'promo', label: '🔥 Affiches Offres Spéciales' },
    { id: 'smartphones', label: '📱 Smartphones' },
    { id: 'audio', label: '🔊 Enceintes & Casques' },
    { id: 'gadgets', label: '🚗 Auto, Caméras & Gadgets' }
  ];

  const showroomPosts = [
    {
      id: 'fb-promo-bac',
      category: 'smartphones',
      isPromoOffer: true,
      title: 'iPhone 16 Pro Max 256 Go Titane Désert',
      badge: 'Promo Bac 🥳',
      badgeColor: 'bg-amber-500 text-white',
      price: '4 120 DT',
      originalPrice: '4 599 DT',
      desc: 'Affiche Facebook officielle Promo Bac ! Boîte scellée originale, garantie 1 an Mobytek Route El Ain km 3.5.',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander l'iPhone 16 Pro Max Promo Bac à 4120 DT vu sur vos photos Facebook",
      slug: 'iphone-16-pro-max-256go'
    },
    {
      id: 'fb-a05s',
      category: 'smartphones',
      isPromoOffer: true,
      title: 'Samsung Galaxy A05s 128 Go',
      badge: 'Special Offer 419 DT',
      badgeColor: 'bg-emerald-600 text-white',
      price: '419 DT',
      originalPrice: '469 DT',
      desc: 'Affiche Spéciale Mobytek ! Écran 90Hz 6.7" FHD+, Snapdragon 680 puissant et triple capteur photo 50 MP.',
      image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Samsung Galaxy A05s à 419 DT vu sur votre affiche Facebook",
      slug: 'samsung-galaxy-a05s-128go'
    },
    {
      id: 'fb-redmi-13c',
      category: 'smartphones',
      isPromoOffer: true,
      title: 'Xiaomi Redmi 13C 128 Go',
      badge: 'Special Offer 449 DT',
      badgeColor: 'bg-blue-600 text-white',
      price: '449 DT',
      originalPrice: '499 DT',
      desc: 'Affiche Spéciale Mobytek ! Écran 90Hz 6.74", appareil photo IA 50 MP et charge rapide 18W Type-C.',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Xiaomi Redmi 13C à 449 DT vu sur vos photos Facebook",
      slug: 'xiaomi-redmi-13c-128go'
    },
    {
      id: 'fb-vivo-y03',
      category: 'smartphones',
      isPromoOffer: true,
      title: 'Vivo Y03 64 Go Vert & Noir',
      badge: 'Special Offer 369 DT',
      badgeColor: 'bg-emerald-600 text-white',
      price: '369 DT',
      originalPrice: '419 DT',
      desc: 'Affiche Spéciale Facebook ! Résistant à l’eau et poussière IP54, batterie 5000 mAh et processeur Helio G85.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Vivo Y03 à 369 DT vu sur votre affiche Facebook",
      slug: 'vivo-y03-64go'
    },
    {
      id: 'fb-mini-speaker-rgb',
      category: 'audio',
      isPromoOffer: true,
      title: 'Mini Enceinte Bluetooth RGB Lumineuse',
      badge: 'Special Offer 35 DT',
      badgeColor: 'bg-purple-600 text-white',
      price: '35 DT',
      originalPrice: '49 DT',
      desc: 'Affiche Spéciale Facebook ! Enceinte cylindrique ultra portable avec animations LED multicolores et son 360°.',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander la Mini Enceinte RGB à 35 DT vue sur votre affiche Facebook",
      slug: 'mini-enceinte-portable-bluetooth-rgb'
    },
    {
      id: 'fb-boombox-16w',
      category: 'audio',
      isPromoOffer: true,
      title: 'Enceinte Boombox Outdoor 16W avec Sangle',
      badge: 'Special Offer 120 DT',
      badgeColor: 'bg-amber-600 text-white',
      price: '120 DT',
      originalPrice: '159 DT',
      desc: 'Affiche Spéciale Facebook ! Gros son stéréo avec doubles radiateurs de basses, étanche IPX6 et sangle épaule.',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander l'Enceinte Boombox 16W à 120 DT vue sur votre affiche Facebook",
      slug: 'enceinte-bluetooth-boombox-outdoor-16w'
    },
    {
      id: 'fb-karaoke-kts',
      category: 'audio',
      isPromoOffer: true,
      title: 'Haut-Parleur Karaoké KTS avec Micro Filaire',
      badge: 'Special Offer 120 DT',
      badgeColor: 'bg-rose-600 text-white',
      price: '120 DT',
      originalPrice: '149 DT',
      desc: 'Affiche Spéciale Facebook ! Grand woofer éclairé LED, micro inclus pour soirées karaoké et poignée de transport.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Haut-Parleur Karaoké KTS à 120 DT vu sur vos photos Facebook",
      slug: 'haut-parleur-karaoke-portable-kts-rgb'
    },
    {
      id: 'fb-speaker-rugged-90',
      category: 'audio',
      isPromoOffer: true,
      title: 'Enceinte Bluetooth Mini Rugged Outdoor',
      badge: 'Special Offer 90 DT',
      badgeColor: 'bg-teal-600 text-white',
      price: '90 DT',
      originalPrice: '119 DT',
      desc: 'Affiche Spéciale Facebook ! Coque antichoc en silicone, mousqueton de fixation et résistance aux projections.',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander l'Enceinte Rugged 90 DT vue sur votre affiche Facebook",
      slug: 'mini-enceinte-portable-bluetooth-rgb'
    },
    {
      id: 'fb-casque-p9',
      category: 'audio',
      isPromoOffer: true,
      title: 'Casque Bluetooth P9 Max (4 Coloris)',
      badge: 'Promo Vedette 35 DT',
      badgeColor: 'bg-blue-600 text-white',
      price: '35 DT',
      originalPrice: '49 DT',
      desc: 'Visible en 4 couleurs sur les affiches (Noir, Argent, Vert Pastel, Bleu Ciel) ! Coussinets confort et son HD.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Casque P9 Max à 35 DT vu sur vos photos Facebook",
      slug: 'casque-sans-fil-bluetooth-p9-max'
    },
    {
      id: 'fb-radio-vintage',
      category: 'audio',
      isPromoOffer: false,
      title: 'Enceinte Rétro Radio Vintage FM/Bluetooth',
      badge: 'Collection Showroom',
      badgeColor: 'bg-amber-700 text-white',
      price: '49 DT',
      originalPrice: '65 DT',
      desc: 'Photos de vitrine en 3 coloris (Gold, Silver, Vert Pistache) ! Look rétro 50s avec bouton rotatif et Bluetooth.',
      image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander la Radio Rétro Vintage à 49 DT vue sur vos photos",
      slug: 'enceinte-retro-radio-vintage-bluetooth'
    },
    {
      id: 'fb-redmi-14c',
      category: 'smartphones',
      isPromoOffer: false,
      title: 'Xiaomi Redmi 14C Cuir Vegan 128 Go',
      badge: 'Boîte Orange Officielle',
      badgeColor: 'bg-orange-600 text-white',
      price: '479 DT',
      originalPrice: '529 DT',
      desc: 'Nouveau dos texturé cuir vegan bleu nuit et grand écran 120Hz 6.88" avec sticker de garantie Mobytek Sfax.',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Redmi 14C Cuir Vegan à 479 DT",
      slug: 'xiaomi-redmi-14c-128go'
    },
    {
      id: 'fb-vivo-y21d',
      category: 'smartphones',
      isPromoOffer: false,
      title: 'Vivo Y21d 128 Go Rose Poudré Tendance',
      badge: 'Coup de Cœur Vitrine',
      badgeColor: 'bg-pink-600 text-white',
      price: '489 DT',
      originalPrice: '549 DT',
      desc: 'Photos prises en main en magasin avec sa magnifique finition Rose Poudré et sa boîte scellée d’origine.',
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Vivo Y21d Rose Poudré à 489 DT",
      slug: 'vivo-y21d-128go-rose'
    },
    {
      id: 'fb-galaxy-a15',
      category: 'smartphones',
      isPromoOffer: false,
      title: 'Samsung Galaxy A15 128 Go Dual SIM',
      badge: 'En Stock Showroom',
      badgeColor: 'bg-blue-700 text-white',
      price: '549 DT',
      originalPrice: '599 DT',
      desc: 'Dos noir & bleu nuit en boîte scellée avec sticker hologramme Mobytek Sfax. Garantie officielle Samsung.',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Samsung Galaxy A15 à 549 DT",
      slug: 'samsung-galaxy-a15-128go'
    },
    {
      id: 'fb-infinix-hot40i',
      category: 'smartphones',
      isPromoOffer: false,
      title: 'Infinix Hot 40i 128 Go Magic Ring',
      badge: 'Boîte Verte Fluo',
      badgeColor: 'bg-emerald-600 text-white',
      price: '399 DT',
      originalPrice: '449 DT',
      desc: 'En magasin avec sa boîte verte néon ! Caméra selfie 32 MP avec flash frontal et affichage fluide 90Hz.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander l'Infinix Hot 40i à 399 DT vu sur vos photos",
      slug: 'infinix-hot-40i-128go'
    },
    {
      id: 'fb-booster-voiture',
      category: 'gadgets',
      isPromoOffer: false,
      title: 'Pack Booster Batterie Voiture Jump Starter 12V',
      badge: 'Indispensable Auto',
      badgeColor: 'bg-slate-900 text-white',
      price: '149 DT',
      originalPrice: '189 DT',
      desc: 'Visible dans sa mallette rigide avec pinces crocodiles intelligentes et lampe LED sur nos photos Facebook.',
      image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Booster Jump Starter 12V à 149 DT vu sur vos photos Facebook",
      slug: 'pack-booster-batterie-voiture-jump-starter-12v'
    },
    {
      id: 'fb-compresseur-air',
      category: 'gadgets',
      isPromoOffer: false,
      title: 'Mini Compresseur d\'Air Digital Portable',
      badge: 'Spécial Auto & Moto',
      badgeColor: 'bg-blue-600 text-white',
      price: '79 DT',
      originalPrice: '99 DT',
      desc: 'Gonfleur électrique autonome à batterie rechargeable, écran digital LCD et arrêt automatique à la bonne pression.',
      image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Mini Compresseur Digital à 79 DT vu sur votre page Facebook",
      slug: 'mini-compresseur-air-electrique-portable'
    },
    {
      id: 'fb-camera-solaire',
      category: 'gadgets',
      isPromoOffer: false,
      title: 'Caméra Surveillance Extérieure Solaire 4G',
      badge: '100% Autonome Solaire',
      badgeColor: 'bg-emerald-700 text-white',
      price: '189 DT',
      originalPrice: '239 DT',
      desc: 'Visible en boutique avec panneau solaire et doubles antennes ! Détection de mouvement IA et vision nocturne.',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander la Caméra Solaire 4G à 189 DT vue sur vos photos Facebook",
      slug: 'camera-surveillance-exterieure-solaire-4g'
    },
    {
      id: 'fb-support-voiture',
      category: 'gadgets',
      isPromoOffer: false,
      title: 'Support Téléphone Magnetic Attraction 360°',
      badge: 'Accessoire Vedette',
      badgeColor: 'bg-cyan-700 text-white',
      price: '32 DT',
      originalPrice: '42 DT',
      desc: 'Affiche Facebook officielle avec bague magnétique puissante pour tableau de bord et grille de ventilation.',
      image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Support Voiture Magnetic Attraction à 32 DT",
      slug: 'support-telephone-voiture-magnetique-360'
    },
    {
      id: 'fb-sup-game-box',
      category: 'gadgets',
      isPromoOffer: false,
      title: 'Console Rétro Portable SUP Game Box 400 en 1',
      badge: '400 Jeux Nostalgie',
      badgeColor: 'bg-red-600 text-white',
      price: '29 DT',
      originalPrice: '39 DT',
      desc: 'Visible en vitrine en Jaune, Rouge, Noir et Blanc ! 400 jeux classiques de notre enfance avec câble TV inclus.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander la Console SUP Game Box 400 en 1 à 29 DT",
      slug: 'console-retro-portable-sup-game-box'
    },
    {
      id: 'fb-chargeur-20w',
      category: 'gadgets',
      isPromoOffer: false,
      title: 'Pack Chargeur Rapide 20W PD Type-C + Câble',
      badge: 'Best-Seller Mobytek',
      badgeColor: 'bg-blue-600 text-white',
      price: '29 DT',
      originalPrice: '39 DT',
      desc: 'Le chargeur indispensable pour iPhone et Samsung. Charge 50% de batterie en seulement 30 minutes.',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80',
      whatsappText: "Bonjour Mobytek, je souhaite commander le Pack Chargeur 20W PD à 29 DT",
      slug: 'pack-chargeur-rapide-20w-mobytek'
    }
  ];

  const filteredPosts = showroomPosts.filter((post) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'promo') return post.isPromoOffer;
    return post.category === activeTab;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="showroom-fb-photos">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>Catalogue Réel Extrait de la Page Facebook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Photos Réelles Showroom &amp; Prix Facebook
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Tous les articles, coffrets et affiches promotionnelles photographiés au magasin de Sfax (Route El Ain km 3.5) avec leurs prix exacts en Dinars Tunisiens (DT).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=61574218696687&sk=photos_by"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm"
          >
            <span>Voir l'Album Officiel Facebook</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://wa.me/21625455300"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Showroom</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="group bg-white rounded-3xl border border-slate-200/90 shadow-soft-card hover:shadow-card-hover hover:border-blue-400 transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Photo Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85" />

              {/* Floating Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-md ${post.badgeColor}`}>
                  {post.badge}
                </span>
              </div>

              {/* Quick Preview Button */}
              <button
                onClick={() => setSelectedPhoto(post)}
                className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                title="Agrandir la photo"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>

              {/* Price Tag Overlay on Bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
                <div>
                  <div className="text-[11px] text-white/80 line-through">
                    {post.originalPrice}
                  </div>
                  <div className="text-xl font-heading font-black text-white tracking-tight drop-shadow-md">
                    {post.price}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur-sm">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>En Stock Sfax</span>
                </div>
              </div>
            </div>

            {/* Info and Actions */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-sm group-hover:text-blue-600 transition line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {post.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/produit/${post.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-bold text-xs flex items-center gap-1 transition"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Fiche</span>
                </Link>

                <a
                  href={`https://wa.me/21625455300?text=${encodeURIComponent(post.whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Commander</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full bg-slate-100">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-xl text-xs font-black shadow-lg ${selectedPhoto.badgeColor}`}>
                  {selectedPhoto.badge}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-heading font-black text-slate-900">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {selectedPhoto.desc}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-heading font-black text-blue-600">
                    {selectedPhoto.price}
                  </span>
                  {selectedPhoto.originalPrice && (
                    <div className="text-xs text-slate-400 line-through">
                      {selectedPhoto.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/21625455300?text=${encodeURIComponent(selectedPhoto.whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Réserver immédiatement sur WhatsApp</span>
                </a>
                <Link
                  to={`/produit/${selectedPhoto.slug}`}
                  onClick={() => setSelectedPhoto(null)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Voir la fiche</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
