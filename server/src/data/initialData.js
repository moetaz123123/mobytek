export const initialCategories = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Les derniers smartphones haut de gamme et milieu de gamme avec garantie officielle',
    icon: 'Smartphone',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    name: 'Écouteurs & Audio',
    slug: 'audio-ecouteurs',
    description: 'AirPods, casques sans fil haute fidélité et enceintes Bluetooth portables',
    icon: 'Headphones',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    name: 'Chargeurs & Câbles',
    slug: 'chargeurs-cables',
    description: 'Chargeurs ultra rapides GaN, câbles tressés renforcés et chargeurs voiture',
    icon: 'Zap',
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c4444444-4444-4444-4444-444444444444',
    name: 'Montres Connectées',
    slug: 'montres-connectees',
    description: 'Smartwatches de sport, suivi santé, notifications et autonomie longue durée',
    icon: 'Watch',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c5555555-5555-5555-5555-555555555555',
    name: 'Protection & Coques',
    slug: 'protection-coques',
    description: 'Films en verre trempé 9H, coques antichoc MagSafe et protections caméra',
    icon: 'ShieldCheck',
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c6666666-6666-6666-6666-666666666666',
    name: 'Powerbanks & Énergie',
    slug: 'powerbanks',
    description: 'Batteries externes haute capacité 10000mAh à 30000mAh compatibles charge rapide',
    icon: 'BatteryCharging',
    image_url: '/powerbank-real.jpg'
  },
  {
    id: 'c8888888-8888-8888-8888-888888888888',
    name: 'Auto, Caméras & Gadgets',
    slug: 'auto-gadgets',
    description: 'Boosters voiture, compresseurs, caméras solaires, supports auto/moto et consoles rétro',
    icon: 'ShieldCheck',
    image_url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialProducts = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'iPhone 16 Pro Max 256 Go (Édition Titane)',
    slug: 'iphone-16-pro-max-256go',
    brand: 'Apple',
    price: 4120.000,
    original_price: 4599.000,
    stock: 14,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: '🔥 Offre Spéciale Promo Bac Mobytek Sfax (Prix exclusif : 4 120 DT) ! Vendu neuf sous blister scellé avec sticker hologramme de garantie officielle Mobytek. Puce surpuissante A18 Pro, boîtier titane et triple caméra 48 MP.',
    specs: {
      "Écran": "6.9\" Super Retina XDR OLED 120Hz ProMotion",
      "Processeur": "Apple A18 Pro (3 nm)",
      "Stockage": "256 Go",
      "RAM": "8 Go",
      "Caméras": "48 MP principal + 48 MP ultra grand-angle + 12 MP téléobjectif 5x",
      "Batterie": "Autonomie jusqu'à 33h de vidéo",
      "Connectique": "USB-C 3 (jusqu'à 10 Gb/s)",
      "Réseau": "5G, Wi-Fi 7, Bluetooth 5.3"
    },
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'AirPods Pro 2 USB-C',
      'Chargeur MagSafe 25W',
      'Coque Transparente MagSafe',
      'Verre Trempé Belkin'
    ]
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Samsung Galaxy S24 Ultra 512 Go',
    slug: 'samsung-galaxy-s24-ultra-512go',
    brand: 'Samsung',
    price: 4699.000,
    original_price: 4999.000,
    stock: 18,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.9,
    description: 'L’expérience Android ultime avec Galaxy AI intégrée, stylet S-Pen de précision, châssis en titane résistant et capteur photo révolutionnaire de 200 MP avec zoom optique IA x100. Écran Dynamic AMOLED 2X anti-reflets.',
    specs: {
      "Écran": "6.8\" Dynamic AMOLED 2X QHD+ 120Hz LTPO",
      "Processeur": "Snapdragon 8 Gen 3 for Galaxy",
      "Stockage": "512 Go",
      "RAM": "12 Go",
      "Caméras": "200 MP + 50 MP (zoom 5x) + 10 MP (zoom 3x) + 12 MP ultra-large",
      "Batterie": "5000 mAh - Charge 45W",
      "Résistance": "IP68 et verre Gorilla Armor"
    },
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Chargeur Samsung 45W Original',
      'Galaxy Buds 3 Pro',
      'Coque Silicone avec Anneau'
    ]
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Xiaomi 14 Ultra Leica 512 Go',
    slug: 'xiaomi-14-ultra-leica-512go',
    brand: 'Xiaomi',
    price: 3899.000,
    original_price: null,
    stock: 8,
    is_featured: true,
    is_new: true,
    is_promo: false,
    rating: 4.8,
    description: 'Conçu en partenariat exclusif avec Leica, ce smartphone photophone intègre un capteur principal Sony 1 pouce à ouverture variable continue, 4 caméras 50 MP et une charge ultra-rapide HyperCharge 90W.',
    specs: {
      "Écran": "6.73\" AMOLED WQHD+ 120Hz 3000 nits",
      "Processeur": "Snapdragon 8 Gen 3",
      "Stockage": "512 Go",
      "RAM": "16 Go",
      "Caméras": "Quad 50 MP optique Leica Summilux",
      "Batterie": "5000 mAh - Charge 90W filaire + 80W sans fil"
    },
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Kit Photographie Xiaomi',
      'Chargeur HyperCharge 120W',
      'Film Hydrogel'
    ]
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Samsung Galaxy A55 5G 256 Go',
    slug: 'samsung-galaxy-a55-5g-256go',
    brand: 'Samsung',
    price: 1399.000,
    original_price: 1499.000,
    stock: 25,
    is_featured: false,
    is_new: false,
    is_promo: true,
    rating: 4.7,
    description: 'Le meilleur rapport qualité/prix de Samsung : cadre en métal haut de gamme, écran Super AMOLED 120Hz éclatant, sécurité Samsung Knox Vault et batterie 2 jours.',
    specs: {
      "Écran": "6.6\" Super AMOLED FHD+ 120Hz",
      "Processeur": "Exynos 1480 Octa-core",
      "Stockage": "256 Go (extensible micro-SD)",
      "RAM": "8 Go",
      "Caméras": "50 MP OIS + 12 MP grand angle + 5 MP macro",
      "Batterie": "5000 mAh"
    },
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Chargeur Samsung 25W',
      'Écouteurs Type-C',
      'Coque antichoc renforcée'
    ]
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    category_name: 'Écouteurs & Audio',
    name: 'Apple AirPods Pro 2 (USB-C & MagSafe)',
    slug: 'apple-airpods-pro-2-usbc',
    brand: 'Apple',
    price: 849.000,
    original_price: 920.000,
    stock: 30,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.9,
    description: 'Réduction active du bruit 2x plus performante, mode transparence adaptatif, audio spatial personnalisé avec suivi dynamique de la tête et boîtier de charge MagSafe USB-C avec haut-parleur Localiser.',
    specs: {
      "Puce": "Apple H2 dans les écouteurs, U1 dans le boîtier",
      "Autonomie": "Jusqu'à 6h d'écoute (30h avec boîtier)",
      "Résistance": "IP54 écouteurs et boîtier",
      "Charge": "USB-C, MagSafe, Qi"
    },
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Protection Boîtier Silicone',
      'Câble USB-C Tressé'
    ]
  },
  {
    id: 'a6666666-6666-6666-6666-666666666666',
    category_id: 'c3333333-3333-3333-3333-333333333333',
    category_name: 'Chargeurs & Câbles',
    name: 'Chargeur Anker Prime 67W GaN 3 Ports',
    slug: 'chargeur-anker-prime-67w-gan',
    brand: 'Anker',
    price: 169.000,
    original_price: 195.000,
    stock: 45,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: 'Chargez 3 appareils simultanément (ordinateur portable, smartphone et montre) grâce à la technologie GaNPrime ultra compacte et au contrôle intelligent de la température ActiveShield 2.0.',
    specs: {
      "Puissance": "67W Max",
      "Ports": "2x USB-C + 1x USB-A",
      "Technologie": "GaNPrime PowerIQ 4.0",
      "Compatibilité": "MacBook, iPhone, Galaxy, Xiaomi, iPad"
    },
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Câble Anker PowerLine Type-C 100W',
      'Câble USB-C vers Lightning'
    ]
  },
  {
    id: 'a7777777-7777-7777-7777-777777777777',
    category_id: 'c4444444-4444-4444-4444-444444444444',
    category_name: 'Montres Connectées',
    name: 'Samsung Galaxy Watch 6 Classic 47mm LTE',
    slug: 'samsung-galaxy-watch-6-classic-47mm',
    brand: 'Samsung',
    price: 1089.000,
    original_price: null,
    stock: 12,
    is_featured: false,
    is_new: true,
    is_promo: false,
    rating: 4.8,
    description: 'Retrouvez la célèbre lunette rotative physique iconique, un écran en cristal de saphir plus grand et un coaching sommeil personnalisé avancé.',
    specs: {
      "Écran": "1.5\" Super AMOLED Sapphire Crystal",
      "Connectivité": "4G LTE, Bluetooth 5.3, Wi-Fi, NFC",
      "Capteurs": "BioActive (ECG, tension artérielle, impédance)",
      "Autonomie": "Jusqu'à 40 heures"
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Bracelet Cuir Véritable',
      'Chargeur Sans Fil Rapide'
    ]
  },
  {
    id: 'a8888888-8888-8888-8888-888888888888',
    category_id: 'c6666666-6666-6666-6666-666666666666',
    category_name: 'Powerbanks & Énergie',
    name: 'Powerbank Baseus Blade HD 20000mAh 100W',
    slug: 'baseus-blade-hd-20000mah-100w',
    brand: 'Baseus',
    price: 239.000,
    original_price: 279.000,
    stock: 20,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.9,
    description: 'Format ultra plat profilé (seulement 18 mm), écran numérique d’état en temps réel et puissance de sortie monstrueuse de 100W pour recharger les téléphones et PC portables à pleine vitesse.',
    specs: {
      "Capacité": "20000 mAh / 74Wh",
      "Puissance Max": "100W Power Delivery",
      "Ports": "2x Type-C + 2x USB-A",
      "Affichage": "Pourcentage, tension, courant, temps restant"
    },
    images: [
      '/powerbank-real.jpg'
    ],
    compatible_accessories: [
      'Câble 100W PD Inclus',
      'Pochette de Transport'
    ]
  },
  {
    id: 'a9999999-9999-9999-9999-999999999999',
    category_id: 'c3333333-3333-3333-3333-333333333333',
    category_name: 'Chargeurs & Câbles',
    name: 'Pack Chargeur Rapide 20W PD + Câble Type-C Mobytek',
    slug: 'pack-chargeur-rapide-20w-mobytek',
    brand: 'Mobytek',
    price: 29.000,
    original_price: 39.000,
    stock: 50,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: 'Offre spéciale boutique Mobytek Sfax ! Chargeur rapide compact Power Delivery 20W avec câble tressé haute résistance 1 mètre. Charge 50% en seulement 30 minutes. Compatible iPhone, Samsung et Xiaomi.',
    specs: {
      "Puissance": "20W Power Delivery 3.0",
      "Connectique": "USB Type-C",
      "Protection": "Anti-surchauffe & coupe-circuit intelligent",
      "Longueur Câble": "1.0 mètre nylon tressé"
    },
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Coque de protection silicone',
      'Verre trempé 9D'
    ]
  },
  {
    id: 'ba111111-1111-1111-1111-111111111111',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    category_name: 'Écouteurs & Audio',
    name: 'Écouteurs Sans Fil Bluetooth TWS Bass Pro',
    slug: 'ecouteurs-sans-fil-bluetooth-tws-bass-pro',
    brand: 'Mobytek Sound',
    price: 35.000,
    original_price: 49.000,
    stock: 60,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.8,
    description: 'Le best-seller Mobytek en boutique ! Écouteurs intra-auriculaires Bluetooth 5.3 avec basses profondes, commandes tactiles et autonomie de 24h avec boîtier rechargeable.',
    specs: {
      "Version Bluetooth": "5.3 stable jusqu'à 10m",
      "Autonomie Écoute": "5h continue (24h avec boîtier)",
      "Commandes": "Tactiles (play, pause, appel, assistant)",
      "Compatibilité": "Android, iOS, PC, Tablettes"
    },
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Câble Type-C de recharge',
      'Embouts en silicone interchangeables'
    ]
  },
  {
    id: 'ba222222-2222-2222-2222-222222222222',
    category_id: 'c5555555-5555-5555-5555-555555555555',
    category_name: 'Protection & Coques',
    name: 'Support Téléphone Voiture Magnétique 360° Rotatif',
    slug: 'support-telephone-voiture-magnetique-360',
    brand: 'Mobytek Auto',
    price: 32.000,
    original_price: 42.000,
    stock: 40,
    is_featured: false,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: 'Support ultra stable pour grille d’aération avec aimants puissants N52. Maintien parfait même sur routes dégradées. Rotation libre à 360 degrés pour GPS horizontal ou vertical.',
    specs: {
      "Fixation": "Pince renforcée pour grille d'aération ou adhésif",
      "Aimants": "6x aimants néodyme N52",
      "Rotation": "Rotule 360 degrés",
      "Compatibilité": "Tous smartphones 4.7 à 6.9 pouces"
    },
    images: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Plaques métalliques adhésives incluses'
    ]
  },
  {
    id: 'ba333333-3333-3333-3333-333333333333',
    category_id: 'c5555555-5555-5555-5555-555555555555',
    category_name: 'Protection & Coques',
    name: 'Pack Sérénité : Coque Antichoc MagSafe + Verre Trempé 9D',
    slug: 'pack-serenite-coque-magsafe-verre-trempe-9d',
    brand: 'Mobytek Shield',
    price: 25.000,
    original_price: 35.000,
    stock: 80,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.8,
    description: 'Protection intégrale 360° pour votre smartphone. Coque transparente hybride avec anneau magnétique puissant MagSafe et bordures antichoc renforcées aux 4 coins + film protecteur plein écran 9D anti-rayures.',
    specs: {
      "Matériau Coque": "Polycarbonate rigide + TPU souple anti-jaunissement",
      "Aimant": "Compatible charge sans fil MagSafe",
      "Verre Trempé": "Dureté 9H, oléophobe anti-traces"
    },
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Lingette de pose incluse'
    ]
  },
  {
    id: 'ba555555-5555-5555-5555-555555555555',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Samsung Galaxy A15 128 Go Dual SIM',
    slug: 'samsung-galaxy-a15-128go',
    brand: 'Samsung',
    price: 549.000,
    original_price: 599.000,
    stock: 22,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.8,
    description: 'Le best-seller Samsung chez Mobytek Sfax (visible dans notre galerie photos Facebook avec boîte officielle et sticker de garantie) ! Écran Super AMOLED 90Hz lumineux, triple caméra 50 MP et autonomie 2 jours (5000 mAh).',
    specs: {
      "Écran": "6.5\" Super AMOLED FHD+ 90Hz",
      "Processeur": "MediaTek Helio G99 Octa-Core",
      "Stockage": "128 Go extensible micro-SD",
      "RAM": "4 Go / 6 Go",
      "Caméras": "50 MP principal + 5 MP ultra grand-angle + 2 MP macro",
      "Batterie": "5000 mAh - Charge rapide 25W"
    },
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Chargeur Samsung 25W Original',
      'Coque transparente antichoc',
      'Film protecteur en verre trempé 9D'
    ]
  },
  {
    id: 'ba666666-6666-6666-6666-666666666666',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Vivo Y21d 128 Go Rose Poudré Tendance',
    slug: 'vivo-y21d-128go-rose',
    brand: 'Vivo',
    price: 489.000,
    original_price: 549.000,
    stock: 18,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.8,
    description: 'Le modèle star en boutique Mobytek avec sa sublime finition Rose Poudré ! Smartphone ultra fin et léger, design premium avec double anneau photo, batterie 5000 mAh et capteur d’empreinte latérale ultra rapide.',
    specs: {
      "Écran": "6.51\" HD+ Eye Protection 60Hz",
      "Processeur": "Octa-Core économe en énergie",
      "Stockage": "128 Go",
      "RAM": "4 Go + 4 Go étendue",
      "Caméras": "Double capteur IA 13 MP + 2 MP macro",
      "Batterie": "5000 mAh longue autonomie",
      "Couleur": "Rose Poudré (Pink Edition)"
    },
    images: [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Coque silicone souple incluse',
      'Écouteurs TWS Bluetooth Mobytek'
    ]
  },
  {
    id: 'ba777777-7777-7777-7777-777777777777',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Samsung Galaxy A05s 128 Go Dual SIM',
    slug: 'samsung-galaxy-a05s-128go',
    brand: 'Samsung',
    price: 419.000,
    original_price: 479.000,
    stock: 25,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.8,
    description: 'Offre Spéciale Facebook Mobytek (Prix : 419 DT) ! Écran 6.7 pouces FHD+ 90Hz, processeur Snapdragon 680, triple capteur photo 50 MP et batterie 5000 mAh.',
    specs: {
      "Écran": "6.7\" FHD+ PLS LCD 90Hz",
      "Processeur": "Snapdragon 680 (6 nm)",
      "Stockage": "128 Go",
      "RAM": "4 Go",
      "Caméras": "50 MP principal + 2 MP macro + 2 MP portrait",
      "Batterie": "5000 mAh - Charge 25W"
    },
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Chargeur Samsung 25W',
      'Coque antichoc silicone'
    ]
  },
  {
    id: 'ba888888-8888-8888-8888-888888888888',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Xiaomi Redmi 13C 128 Go Dual SIM',
    slug: 'xiaomi-redmi-13c-128go',
    brand: 'Xiaomi',
    price: 449.000,
    original_price: 499.000,
    stock: 30,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.8,
    description: 'Offre Spéciale Facebook Mobytek (Prix : 449 DT) ! Écran 6.74 pouces 90Hz fluide, triple caméra 50 MP IA, design ultra fin 8.09 mm et batterie 5000 mAh.',
    specs: {
      "Écran": "6.74\" HD+ 90Hz Corning Gorilla Glass",
      "Processeur": "MediaTek Helio G85",
      "Stockage": "128 Go extensible 1 To",
      "RAM": "4 Go / 6 Go",
      "Caméras": "50 MP IA + 2 MP macro",
      "Batterie": "5000 mAh"
    },
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Verre trempé plein écran',
      'Écouteurs 3.5mm'
    ]
  },
  {
    id: 'ba999999-9999-9999-9999-999999999999',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Vivo Y03 64 Go Écran 90Hz',
    slug: 'vivo-y03-64go',
    brand: 'Vivo',
    price: 369.000,
    original_price: 419.000,
    stock: 20,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.7,
    description: 'Offre Spéciale Facebook Mobytek (Prix : 369 DT) ! Smartphone élégant résistant à l’eau et à la poussière (IP54), batterie 5000 mAh et booster de volume 150%.',
    specs: {
      "Écran": "6.56\" Sunlight Display 90Hz",
      "Processeur": "Helio G85 Gaming Processor",
      "Stockage": "64 Go",
      "RAM": "4 Go + 4 Go étendue",
      "Batterie": "5000 mAh avec garantie 4 ans"
    },
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Coque transparente',
      'Film protecteur'
    ]
  },
  {
    id: 'ca111111-1111-1111-1111-111111111111',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Xiaomi Redmi 14C 128 Go Cuir Vegan',
    slug: 'xiaomi-redmi-14c-128go',
    brand: 'Xiaomi',
    price: 479.000,
    original_price: 529.000,
    stock: 15,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: 'Nouveauté disponible en boutique Mobytek avec sa boîte orange officielle ! Design circulaire d’inspiration haute horlogerie, dos texturé cuir vegan bleu nuit et grand écran 120Hz 6.88 pouces.',
    specs: {
      "Écran": "6.88\" 120Hz immersif",
      "Processeur": "Helio G81-Ultra",
      "Stockage": "128 Go",
      "RAM": "4 Go / 8 Go",
      "Caméras": "50 MP IA ultra clair",
      "Batterie": "5160 mAh"
    },
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Verre trempé 9D',
      'Chargeur rapide Type-C'
    ]
  },
  {
    id: 'ca222222-2222-2222-2222-222222222222',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    category_name: 'Smartphones',
    name: 'Infinix Hot 40i 128 Go Magic Ring',
    slug: 'infinix-hot-40i-128go',
    brand: 'Infinix',
    price: 399.000,
    original_price: 449.000,
    stock: 25,
    is_featured: false,
    is_new: true,
    is_promo: true,
    rating: 4.8,
    description: 'Avec boîte officielle verte fluo en magasin ! Écran 90Hz avec notification interactive Magic Ring, caméra selfie 32 MP avec flash frontal et charge rapide 18W.',
    specs: {
      "Écran": "6.56\" 90Hz Punch-Hole",
      "Processeur": "Unisoc T606 Octa-core",
      "Stockage": "128 Go",
      "RAM": "4 Go + 4 Go étendue",
      "Caméra Avant": "32 MP Crystal-Clear Selfie",
      "Caméra Arrière": "50 MP Dual IA",
      "Batterie": "5000 mAh"
    },
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Coque transparente antichoc',
      'Film protecteur écran'
    ]
  },
  {
    id: 'ca333333-3333-3333-3333-333333333333',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    category_name: 'Écouteurs & Audio',
    name: 'Mini Enceinte Portable Bluetooth RGB Lumineuse',
    slug: 'mini-enceinte-portable-bluetooth-rgb',
    brand: 'Mobytek Sound',
    price: 35.000,
    original_price: 49.000,
    stock: 50,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.8,
    description: 'Offre Spéciale Facebook Mobytek (Prix : 35 DT) ! Enceinte compacte avec effets lumineux LED RGB dynamiques, poignée de transport, son à 360° et autonomie 6h.',
    specs: {
      "Puissance": "5W RMS",
      "Connectivité": "Bluetooth 5.1, Carte TF, USB, AUX",
      "Éclairage": "Spectre lumineux LED RGB dynamique",
      "Autonomie": "Jusqu'à 6 heures"
    },
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Câble de recharge USB inclus'
    ]
  },
  {
    id: 'ca444444-4444-4444-4444-444444444444',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    category_name: 'Écouteurs & Audio',
    name: 'Enceinte Bluetooth Boombox Outdoor 16W Étanche',
    slug: 'enceinte-bluetooth-boombox-outdoor-16w',
    brand: 'Mobytek Sound',
    price: 120.000,
    original_price: 159.000,
    stock: 15,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: 'Offre Spéciale Facebook Mobytek (Prix : 120 DT) ! Puissante enceinte cylindrique avec sangle d’épaule, doubles radiateurs de basses passifs, étanchéité IPX6 et autonomie 12h.',
    specs: {
      "Puissance": "16W RMS Stéréo",
      "Résistance": "IPX6 résistant à la pluie et aux éclaboussures",
      "Autonomie": "Jusqu'à 12 heures (batterie 3000 mAh)",
      "Fonctions": "TWS Dual Pairing, Radio FM, Mains Libres"
    },
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Sangle de transport incluse',
      'Câble Type-C'
    ]
  },
  {
    id: 'ca555555-5555-5555-5555-555555555555',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    category_name: 'Écouteurs & Audio',
    name: 'Haut-Parleur Karaoké Portable KTS RGB avec Micro',
    slug: 'haut-parleur-karaoke-portable-kts-rgb',
    brand: 'KTS Sound',
    price: 120.000,
    original_price: 149.000,
    stock: 12,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.8,
    description: 'Offre Spéciale Facebook Mobytek (Prix : 120 DT) ! Haut-parleur festif avec grand woofer illuminé LED, micro filaire inclus pour soirées karaoké et poignée ergonomique.',
    specs: {
      "Puissance": "20W",
      "Microphone": "Micro filaire inclus avec réglage écho",
      "Entrées": "USB, Carte SD, Jack Micro, Bluetooth",
      "Éclairage": "Cercles LED RGB festifs"
    },
    images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Microphone karaoké inclus',
      'Câble chargeur'
    ]
  },
  {
    id: 'ca666666-6666-6666-6666-666666666666',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    category_name: 'Écouteurs & Audio',
    name: 'Enceinte Rétro Radio Vintage FM/Bluetooth (Collection Sfax)',
    slug: 'enceinte-retro-radio-vintage-bluetooth',
    brand: 'Mobytek Vintage',
    price: 49.000,
    original_price: 65.000,
    stock: 20,
    is_featured: false,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: 'Visible sur nos photos de vitrine en 3 coloris (Gold, Silver, Vert Pistache) ! Look vintage rétro des années 50 avec bouton rotatif analogique et technologie Bluetooth 5.0 moderne.',
    specs: {
      "Style": "Rétro Vintage avec grille métallique",
      "Connexions": "Bluetooth, Radio FM analogique, Carte TF, USB",
      "Autonomie": "Jusqu'à 8 heures"
    },
    images: [
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Câble micro-USB inclus'
    ]
  },
  {
    id: 'ca777777-7777-7777-7777-777777777777',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    category_name: 'Écouteurs & Audio',
    name: 'Casque Sans Fil Bluetooth P9 Max Stéréo',
    slug: 'casque-sans-fil-bluetooth-p9-max',
    brand: 'P9 Audio',
    price: 35.000,
    original_price: 49.000,
    stock: 45,
    is_featured: true,
    is_new: false,
    is_promo: true,
    rating: 4.8,
    description: 'Le célèbre casque P9 visible en 4 couleurs sur notre page (Noir, Argent, Vert Pastel, Bleu Ciel) ! Coussinets à mémoire de forme, son spatial haute fidélité et micro intégré.',
    specs: {
      "Batterie": "400 mAh rechargeable",
      "Autonomie": "Jusqu'à 10 heures d'écoute",
      "Portée": "10 mètres sans obstacle",
      "Connectique": "Bluetooth 5.0 + entrée auxiliaire Jack 3.5mm"
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Câble Jack 3.5mm',
      'Câble de charge'
    ]
  },
  {
    id: 'ca888888-8888-8888-8888-888888888888',
    category_id: 'c8888888-8888-8888-8888-888888888888',
    category_name: 'Auto, Caméras & Gadgets',
    name: 'Pack Booster de Batterie Voiture Jump Starter 12V 20000mAh',
    slug: 'pack-booster-batterie-voiture-jump-starter-12v',
    brand: 'Mobytek Power Auto',
    price: 149.000,
    original_price: 189.000,
    stock: 14,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: 'L’accessoire indispensable pour tous les automobilistes en Tunisie (visible dans sa mallette avec pinces crocodiles sur nos photos Facebook) ! Permet de démarrer une voiture en panne de batterie instantanément sans aide extérieure, fait aussi office de batterie externe puissante avec lampe torche LED de secours.',
    specs: {
      "Capacité": "20000 mAh haute intensité",
      "Courant de Crête": "800A (démarrage moteurs Essence & Diesel)",
      "Sorties": "2x USB charge rapide pour téléphones + port 12V",
      "Sécurité": "Pinces intelligentes anti-court circuit et inversion de polarité",
      "Accessoires": "Mallette rigide de transport + pinces crocodiles intelligentes"
    },
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Pinces crocodiles incluses',
      'Mallette de rangement'
    ]
  },
  {
    id: 'ca999999-9999-9999-9999-999999999999',
    category_id: 'c8888888-8888-8888-8888-888888888888',
    category_name: 'Auto, Caméras & Gadgets',
    name: 'Mini Compresseur d\'Air Électrique Portable Digital',
    slug: 'mini-compresseur-air-electrique-portable',
    brand: 'Mobytek Auto',
    price: 79.000,
    original_price: 99.000,
    stock: 20,
    is_featured: false,
    is_new: true,
    is_promo: true,
    rating: 4.8,
    description: 'Gonfleur électrique intelligent autonome sans fil avec batterie rechargeable. Écran numérique avec arrêt automatique à la pression souhaitée. Gonfle pneus de voiture, moto, trottinette et ballons.',
    specs: {
      "Pression Max": "150 PSI / 10.3 Bar",
      "Batterie": "Rechargeable Type-C intégrée",
      "Affichage": "Écran LCD digital rétro-éclairé",
      "Lampe": "LED de secours pour utilisation nocturne"
    },
    images: [
      'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Embouts de gonflage universels inclus'
    ]
  },
  {
    id: 'cb111111-1111-1111-1111-111111111111',
    category_id: 'c8888888-8888-8888-8888-888888888888',
    category_name: 'Auto, Caméras & Gadgets',
    name: 'Caméra de Surveillance Extérieure Solaire 4G / Wi-Fi',
    slug: 'camera-surveillance-exterieure-solaire-4g',
    brand: 'Mobytek Security',
    price: 189.000,
    original_price: 239.000,
    stock: 10,
    is_featured: true,
    is_new: true,
    is_promo: true,
    rating: 4.9,
    description: 'Visible sur nos photos en boutique avec son panneau solaire et ses doubles antennes ! 100% sans fil et autonome grâce à l’énergie solaire. Détection humaine IA, vision nocturne couleur et vision en direct sur smartphone.',
    specs: {
      "Résolution": "Full HD 1080p / 3 MP",
      "Alimentation": "Panneau solaire haute efficacité + batterie lithium",
      "Vision Nocturne": "Infrarouge & projecteurs LED couleur",
      "Audio": "Bidirectionnel (micro + haut-parleur intégré)",
      "Étanchéité": "IP66 extérieur"
    },
    images: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Panneau solaire orientable inclus',
      'Support mural'
    ]
  },
  {
    id: 'cb222222-2222-2222-2222-222222222222',
    category_id: 'c8888888-8888-8888-8888-888888888888',
    category_name: 'Auto, Caméras & Gadgets',
    name: 'Console Rétro Portable SUP Game Box 400 en 1',
    slug: 'console-retro-portable-sup-game-box',
    brand: 'SUP Games',
    price: 29.000,
    original_price: 39.000,
    stock: 35,
    is_featured: false,
    is_new: false,
    is_promo: true,
    rating: 4.7,
    description: 'La célèbre console rétro vue sur nos photos en 4 couleurs (Rouge, Jaune, Noir, Blanc) ! Intègre 400 jeux cultes d’enfance (Mario, Contra, etc.), écran couleur 3.0 pouces et câble TV inclus pour jouer sur télévision.',
    specs: {
      "Jeux Inclus": "400 jeux classiques 8-Bit",
      "Écran": "3.0 pouces LCD couleur",
      "Batterie": "Lithium rechargeable BL-5C amovible",
      "Connexion TV": "Câble AV inclus"
    },
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'
    ],
    compatible_accessories: [
      'Câble TV AV inclus',
      'Batterie rechargeable'
    ]
  }
];

export const initialOrders = [];
