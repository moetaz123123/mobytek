-- ==============================================================================
-- MOBYTEK E-COMMERCE SEED DATA (Tunisia market, prices in TND)
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, icon, image_url)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'Smartphones', 'smartphones', 'Les derniers smartphones haut de gamme et milieu de gamme avec garantie officielle', 'Smartphone', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'),
    ('c2222222-2222-2222-2222-222222222222', 'Écouteurs & Audio', 'audio-ecouteurs', 'AirPods, casques sans fil haute fidélité et enceintes Bluetooth portables', 'Headphones', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'),
    ('c3333333-3333-3333-3333-333333333333', 'Chargeurs & Câbles', 'chargeurs-cables', 'Chargeurs ultra rapides GaN, câbles tressés renforcés et chargeurs voiture', 'Zap', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'),
    ('c4444444-4444-4444-4444-444444444444', 'Montres Connectées', 'montres-connectees', 'Smartwatches de sport, suivi santé, notifications et autonomie longue durée', 'Watch', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'),
    ('c5555555-5555-5555-5555-555555555555', 'Protection & Coques', 'protection-coques', 'Films en verre trempé 9H, coques antichoc MagSafe et protections caméra', 'ShieldCheck', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'),
    ('c6666666-6666-6666-6666-666666666666', 'Powerbanks & Énergie', 'powerbanks', 'Batteries externes haute capacité 10000mAh à 30000mAh compatibles charge rapide', 'BatteryCharging', '/powerbank-real.jpg'),
    ('c8888888-8888-8888-8888-888888888888', 'Auto, Caméras & Gadgets', 'auto-cameras-gadgets', 'Supports voiture magnétiques, caméras solaires, compresseurs, boosters et consoles de jeux', 'Car', 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (id, category_id, name, slug, brand, price, original_price, stock, is_featured, is_new, is_promo, description, specs, compatible_accessories, rating)
VALUES
    (
        'a1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'iPhone 16 Pro Max 256 Go (Édition Titane)',
        'iphone-16-pro-max-256go',
        'Apple',
        4120.000,
        4599.000,
        14,
        true,
        true,
        true,
        'Le fleuron d''Apple avec boîtier en titane de grade 5, puce surpuissante A18 Pro, commande de l''appareil photo tactile innovante et la meilleure autonomie jamais vue sur un iPhone. Écran Super Retina XDR 6,9 pouces ProMotion 120Hz.',
        $$
        {
          "ecran": "6.9 pouces Super Retina XDR OLED 120Hz ProMotion",
          "processeur": "Apple A18 Pro (3 nm)",
          "stockage": "256 Go",
          "ram": "8 Go",
          "cameras": "48 MP principal + 48 MP ultra grand-angle + 12 MP téléobjectif 5x",
          "batterie": "Autonomie jusqu'à 33h de vidéo",
          "connectique": "USB-C 3 (jusqu'à 10 Gb/s)",
          "reseau": "5G, Wi-Fi 7, Bluetooth 5.3"
        }
        $$::jsonb,
        ARRAY['AirPods Pro 2 USB-C', 'Chargeur MagSafe 25W', 'Coque Transparente MagSafe', 'Verre Trempé Belkin'],
        4.9
    ),
    (
        'a2222222-2222-2222-2222-222222222222',
        'c1111111-1111-1111-1111-111111111111',
        'Samsung Galaxy S24 Ultra 512 Go',
        'samsung-galaxy-s24-ultra-512go',
        'Samsung',
        4699.000,
        4999.000,
        18,
        true,
        false,
        true,
        'L''expérience Android ultime avec Galaxy AI intégrée, stylet S-Pen de précision, châssis en titane résistant et capteur photo révolutionnaire de 200 MP avec zoom optique IA x100. Écran Dynamic AMOLED 2X anti-reflets.',
        $$
        {
          "ecran": "6.8 pouces Dynamic AMOLED 2X QHD+ 120Hz LTPO",
          "processeur": "Snapdragon 8 Gen 3 for Galaxy",
          "stockage": "512 Go",
          "ram": "12 Go",
          "cameras": "200 MP + 50 MP (zoom 5x) + 10 MP (zoom 3x) + 12 MP ultra-large",
          "batterie": "5000 mAh - Charge 45W",
          "resistance": "IP68 et verre Gorilla Armor"
        }
        $$::jsonb,
        ARRAY['Chargeur Samsung 45W Original', 'Galaxy Buds 3 Pro', 'Coque Silicone avec Anneau'],
        4.9
    ),
    (
        'a3333333-3333-3333-3333-333333333333',
        'c1111111-1111-1111-1111-111111111111',
        'Xiaomi 14 Ultra Leica 512 Go',
        'xiaomi-14-ultra-leica-512go',
        'Xiaomi',
        3899.000,
        NULL,
        8,
        true,
        true,
        false,
        'Conçu en partenariat exclusif avec Leica, ce smartphone photophone intègre un capteur principal Sony 1 pouce à ouverture variable continue, 4 caméras 50 MP et une charge ultra-rapide HyperCharge 90W.',
        $$
        {
          "ecran": "6.73 pouces AMOLED WQHD+ 120Hz 3000 nits",
          "processeur": "Snapdragon 8 Gen 3",
          "stockage": "512 Go",
          "ram": "16 Go",
          "cameras": "Quad 50 MP optique Leica Summilux",
          "batterie": "5000 mAh - Charge 90W filaire + 80W sans fil"
        }
        $$::jsonb,
        ARRAY['Kit Photographie Xiaomi', 'Chargeur HyperCharge 120W', 'Film Hydrogel'],
        4.8
    ),
    (
        'a4444444-4444-4444-4444-444444444444',
        'c1111111-1111-1111-1111-111111111111',
        'Samsung Galaxy A55 5G 256 Go',
        'samsung-galaxy-a55-5g-256go',
        'Samsung',
        1399.000,
        1499.000,
        25,
        false,
        false,
        true,
        'Le meilleur rapport qualité/prix de Samsung : cadre en métal haut de gamme, écran Super AMOLED 120Hz éclatant, sécurité Samsung Knox Vault et batterie 2 jours.',
        $$
        {
          "ecran": "6.6 pouces Super AMOLED FHD+ 120Hz",
          "processeur": "Exynos 1480 Octa-core",
          "stockage": "256 Go (extensible micro-SD)",
          "ram": "8 Go",
          "cameras": "50 MP OIS + 12 MP grand angle + 5 MP macro",
          "batterie": "5000 mAh"
        }
        $$::jsonb,
        ARRAY['Chargeur Samsung 25W', 'Écouteurs Type-C', 'Coque antichoc renforcée'],
        4.7
    ),
    (
        'a5555555-5555-5555-5555-555555555555',
        'c2222222-2222-2222-2222-222222222222',
        'Apple AirPods Pro 2 (USB-C & MagSafe)',
        'apple-airpods-pro-2-usbc',
        'Apple',
        849.000,
        920.000,
        30,
        true,
        false,
        true,
        'Réduction active du bruit 2x plus performante, mode transparence adaptatif, audio spatial personnalisé avec suivi dynamique de la tête et boîtier de charge MagSafe USB-C avec haut-parleur Localiser.',
        $$
        {
          "puce": "Apple H2 dans les écouteurs, U1 dans le boîtier",
          "autonomie": "Jusqu'à 6h d'écoute (30h avec boîtier)",
          "resistance": "IP54 écouteurs et boîtier",
          "charge": "USB-C, MagSafe, Qi"
        }
        $$::jsonb,
        ARRAY['Protection Boîtier Silicone', 'Câble USB-C Tressé'],
        4.9
    ),
    (
        'a6666666-6666-6666-6666-666666666666',
        'c3333333-3333-3333-3333-333333333333',
        'Chargeur Anker Prime 67W GaN 3 Ports',
        'chargeur-anker-prime-67w-gan',
        'Anker',
        169.000,
        195.000,
        45,
        true,
        true,
        true,
        'Chargez 3 appareils simultanément (ordinateur portable, smartphone et montre) grâce à la technologie GaNPrime ultra compacte et au contrôle intelligent de la température ActiveShield 2.0.',
        $$
        {
          "puissance": "67W Max",
          "ports": "2x USB-C + 1x USB-A",
          "technologie": "GaNPrime PowerIQ 4.0",
          "compatibilite": "MacBook, iPhone, Galaxy, Xiaomi, iPad"
        }
        $$::jsonb,
        ARRAY['Câble Anker PowerLine Type-C 100W', 'Câble USB-C vers Lightning'],
        4.9
    ),
    (
        'a7777777-7777-7777-7777-777777777777',
        'c4444444-4444-4444-4444-444444444444',
        'Samsung Galaxy Watch 6 Classic 47mm LTE',
        'samsung-galaxy-watch-6-classic-47mm',
        'Samsung',
        1089.000,
        NULL,
        12,
        false,
        true,
        false,
        'Retrouvez la célèbre lunette rotative physique iconique, un écran en cristal de saphir plus grand et un coaching sommeil personnalisé avancé.',
        $$
        {
          "ecran": "1.5 pouce Super AMOLED Sapphire Crystal",
          "connectivite": "4G LTE, Bluetooth 5.3, Wi-Fi, NFC",
          "capteurs": "BioActive (ECG, tension artérielle, impédance)",
          "autonomie": "Jusqu'à 40 heures"
        }
        $$::jsonb,
        ARRAY['Bracelet Cuir Véritable', 'Chargeur Sans Fil Rapide'],
        4.8
    ),
    (
        'a8888888-8888-8888-8888-888888888888',
        'c6666666-6666-6666-6666-666666666666',
        'Powerbank Baseus Blade HD 20000mAh 100W',
        'baseus-blade-hd-20000mah-100w',
        'Baseus',
        239.000,
        279.000,
        20,
        true,
        false,
        true,
        'Format ultra plat profilé (seulement 18 mm), écran numérique d’état en temps réel et puissance de sortie monstrueuse de 100W pour recharger les téléphones et PC portables à pleine vitesse.',
        $$
        {
          "capacite": "20000 mAh / 74Wh",
          "puissance_max": "100W Power Delivery",
          "ports": "2x Type-C + 2x USB-A",
          "affichage": "Pourcentage, tension, courant, temps restant"
        }
        $$::jsonb,
        ARRAY['Câble 100W PD Inclus', 'Pochette de Transport'],
        4.9
    ),
    (
        'a9999999-9999-9999-9999-999999999999',
        'c3333333-3333-3333-3333-333333333333',
        'Pack Chargeur Rapide 20W PD + Câble Type-C Mobytek',
        'pack-chargeur-rapide-20w-mobytek',
        'Mobytek',
        29.000,
        39.000,
        50,
        true,
        true,
        true,
        'Offre spéciale boutique Mobytek Sfax ! Chargeur rapide compact Power Delivery 20W avec câble tressé haute résistance 1 mètre. Charge 50% en seulement 30 minutes.',
        $$
        {
          "puissance": "20W Power Delivery 3.0",
          "connectique": "USB Type-C",
          "protection": "Anti-surchauffe & coupe-circuit intelligent",
          "longueur_cable": "1.0 mètre nylon tressé"
        }
        $$::jsonb,
        ARRAY['Coque de protection silicone', 'Verre trempé 9D'],
        4.9
    ),
    (
        'ba111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Écouteurs Sans Fil Bluetooth TWS Bass Pro',
        'ecouteurs-sans-fil-bluetooth-tws-bass-pro',
        'Mobytek Sound',
        35.000,
        49.000,
        60,
        true,
        false,
        true,
        'Le best-seller Mobytek en boutique ! Écouteurs intra-auriculaires Bluetooth 5.3 avec basses profondes, commandes tactiles et autonomie de 24h avec boîtier rechargeable.',
        $$
        {
          "bluetooth": "5.3 stable jusqu'à 10m",
          "autonomie": "5h continue (24h avec boîtier)",
          "commandes": "Tactiles",
          "compatibilite": "Android, iOS, PC"
        }
        $$::jsonb,
        ARRAY['Câble Type-C de recharge', 'Embouts en silicone'],
        4.8
    ),
    (
        'ba222222-2222-2222-2222-222222222222',
        'c5555555-5555-5555-5555-555555555555',
        'Support Téléphone Voiture Magnétique 360° Rotatif',
        'support-telephone-voiture-magnetique-360',
        'Mobytek Auto',
        32.000,
        42.000,
        40,
        false,
        true,
        true,
        'Support ultra stable pour grille d’aération avec aimants puissants N52. Maintien parfait même sur routes dégradées. Rotation libre à 360 degrés pour GPS horizontal ou vertical.',
        $$
        {
          "fixation": "Pince renforcée pour grille d'aération",
          "aimants": "6x aimants néodyme N52",
          "rotation": "Rotule 360 degrés"
        }
        $$::jsonb,
        ARRAY['Plaques métalliques adhésives incluses'],
        4.9
    ),
    (
        'ba333333-3333-3333-3333-333333333333',
        'c5555555-5555-5555-5555-555555555555',
        'Pack Sérénité : Coque Antichoc MagSafe + Verre Trempé 9D',
        'pack-serenite-coque-magsafe-verre-trempe-9d',
        'Mobytek Shield',
        25.000,
        35.000,
        80,
        true,
        false,
        true,
        'Protection intégrale 360° pour votre smartphone. Coque transparente hybride avec anneau magnétique puissant MagSafe et bordures antichoc renforcées + film protecteur plein écran 9D.',
        $$
        {
          "materiau": "Polycarbonate rigide + TPU souple",
          "aimant": "Compatible charge sans fil MagSafe",
          "verre": "Dureté 9H anti-rayures"
        }
        $$::jsonb,
        ARRAY['Lingette de pose incluse'],
        4.8
    ),
    (
        'ba555555-5555-5555-5555-555555555555',
        'c1111111-1111-1111-1111-111111111111',
        'Samsung Galaxy A15 128 Go Dual SIM',
        'samsung-galaxy-a15-128go',
        'Samsung',
        549.000,
        599.000,
        22,
        true,
        false,
        true,
        'Le best-seller Samsung chez Mobytek Sfax (visible dans notre galerie photos Facebook avec boîte officielle et sticker de garantie) ! Écran Super AMOLED 90Hz, triple caméra 50 MP.',
        $$
        {
          "ecran": "6.5 pouces Super AMOLED FHD+ 90Hz",
          "processeur": "MediaTek Helio G99 Octa-Core",
          "stockage": "128 Go extensible",
          "ram": "4 Go / 6 Go",
          "cameras": "50 MP + 5 MP + 2 MP",
          "batterie": "5000 mAh - Charge 25W"
        }
        $$::jsonb,
        ARRAY['Chargeur Samsung 25W Original', 'Coque transparente antichoc', 'Film protecteur 9D'],
        4.8
    ),
    (
        'ba666666-6666-6666-6666-666666666666',
        'c1111111-1111-1111-1111-111111111111',
        'Vivo Y21d 128 Go Rose Poudré Tendance',
        'vivo-y21d-128go-rose',
        'Vivo',
        489.000,
        549.000,
        18,
        true,
        true,
        true,
        'Le modèle star en boutique Mobytek avec sa finition Rose Poudré ! Smartphone ultra fin et léger, design premium, batterie 5000 mAh et capteur d''empreinte latérale.',
        $$
        {
          "ecran": "6.51 pouces HD+ Eye Protection",
          "processeur": "Octa-Core économe",
          "stockage": "128 Go",
          "ram": "4 Go + 4 Go étendue",
          "cameras": "Double capteur IA 13 MP",
          "batterie": "5000 mAh",
          "couleur": "Rose Poudré (Pink Edition)"
        }
        $$::jsonb,
        ARRAY['Coque silicone souple', 'Écouteurs TWS Bluetooth'],
        4.8
    ),
    (
        'ba777777-7777-7777-7777-777777777777',
        'c1111111-1111-1111-1111-111111111111',
        'Samsung Galaxy A05s 128 Go',
        'samsung-galaxy-a05s-128go',
        'Samsung',
        419.000,
        469.000,
        22,
        true,
        true,
        true,
        'Offre Spéciale Facebook Mobytek (Prix : 419 DT) ! Écran 6.7 pouces FHD+ 90Hz, processeur Snapdragon 680 puissant et triple capteur photo 50 MP.',
        $$
        {
          "ecran": "6.7 pouces PLS LCD 90Hz FHD+",
          "processeur": "Qualcomm Snapdragon 680 4G (6 nm)",
          "stockage": "128 Go",
          "ram": "4 Go + RAM Plus",
          "cameras": "50 MP grand-angle + 2 MP macro + 2 MP profondeur",
          "batterie": "5000 mAh - Charge 25W"
        }
        $$::jsonb,
        ARRAY['Chargeur Samsung 25W', 'Protection écran 9D', 'Coque silicone'],
        4.8
    ),
    (
        'ba888888-8888-8888-8888-888888888888',
        'c1111111-1111-1111-1111-111111111111',
        'Xiaomi Redmi 13C 128 Go',
        'xiaomi-redmi-13c-128go',
        'Xiaomi',
        449.000,
        499.000,
        30,
        true,
        true,
        true,
        'Offre Spéciale Facebook Mobytek (Prix : 449 DT) ! Design fin et élégant, écran fluide 90Hz de 6.74 pouces avec certification TÜV Low Blue Light et caméra IA 50 MP.',
        $$
        {
          "ecran": "6.74 pouces 90Hz Corning Gorilla Glass",
          "processeur": "MediaTek Helio G85",
          "stockage": "128 Go",
          "ram": "4 Go / 6 Go",
          "cameras": "50 MP principale + 2 MP macro",
          "batterie": "5000 mAh - Charge rapide 18W Type-C"
        }
        $$::jsonb,
        ARRAY['Verre trempé plein écran', 'Coque antichoc renforcée'],
        4.7
    ),
    (
        'ba999999-9999-9999-9999-999999999999',
        'c1111111-1111-1111-1111-111111111111',
        'Vivo Y03 64 Go Vert Clair & Noir',
        'vivo-y03-64go',
        'Vivo',
        369.000,
        419.000,
        20,
        true,
        true,
        true,
        'Offre Spéciale Facebook Mobytek (Prix : 369 DT) ! Smartphone élégant résistant à l’eau et à la poussière (IP54), batterie 5000 mAh et booster de volume 150%.',
        $$
        {
          "ecran": "6.56 pouces Sunlight Display 90Hz",
          "processeur": "Helio G85 Gaming Processor",
          "stockage": "64 Go",
          "ram": "4 Go + 4 Go étendue",
          "batterie": "5000 mAh avec garantie 4 ans"
        }
        $$::jsonb,
        ARRAY['Coque transparente', 'Film protecteur'],
        4.7
    ),
    (
        'ca111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'Xiaomi Redmi 14C 128 Go Cuir Vegan',
        'xiaomi-redmi-14c-128go',
        'Xiaomi',
        479.000,
        529.000,
        15,
        true,
        true,
        true,
        'Nouveauté disponible en boutique Mobytek avec sa boîte orange officielle ! Design circulaire d’inspiration haute horlogerie, dos texturé cuir vegan bleu nuit et grand écran 120Hz 6.88 pouces.',
        $$
        {
          "ecran": "6.88 pouces 120Hz immersif",
          "processeur": "Helio G81-Ultra",
          "stockage": "128 Go",
          "ram": "4 Go / 8 Go",
          "cameras": "50 MP IA ultra clair",
          "batterie": "5160 mAh"
        }
        $$::jsonb,
        ARRAY['Verre trempé 9D', 'Chargeur rapide Type-C'],
        4.9
    ),
    (
        'ca222222-2222-2222-2222-222222222222',
        'c1111111-1111-1111-1111-111111111111',
        'Infinix Hot 40i 128 Go Magic Ring',
        'infinix-hot-40i-128go',
        'Infinix',
        399.000,
        449.000,
        25,
        false,
        true,
        true,
        'Avec boîte officielle verte fluo en magasin ! Écran 90Hz avec notification interactive Magic Ring, caméra selfie 32 MP avec flash frontal et charge rapide 18W.',
        $$
        {
          "ecran": "6.56 pouces 90Hz Punch-Hole",
          "processeur": "Unisoc T606 Octa-core",
          "stockage": "128 Go",
          "ram": "4 Go + 4 Go étendue",
          "cameras": "50 MP Dual IA + 32 MP Selfie",
          "batterie": "5000 mAh"
        }
        $$::jsonb,
        ARRAY['Coque antichoc', 'Film protecteur'],
        4.8
    ),
    (
        'ca333333-3333-3333-3333-333333333333',
        'c2222222-2222-2222-2222-222222222222',
        'Mini Enceinte Portable Bluetooth RGB Lumineuse',
        'mini-enceinte-portable-bluetooth-rgb',
        'Mobytek Sound',
        35.000,
        49.000,
        50,
        true,
        false,
        true,
        'Offre Spéciale Facebook Mobytek (Prix : 35 DT) ! Enceinte compacte avec effets lumineux LED RGB dynamiques, poignée de transport, son à 360° et autonomie 6h.',
        $$
        {
          "puissance": "5W RMS",
          "connectivite": "Bluetooth 5.1, Carte TF, USB, AUX",
          "eclairage": "Spectre lumineux LED RGB dynamique",
          "autonomie": "Jusqu'à 6 heures"
        }
        $$::jsonb,
        ARRAY['Câble de recharge USB inclus'],
        4.8
    ),
    (
        'ca444444-4444-4444-4444-444444444444',
        'c2222222-2222-2222-2222-222222222222',
        'Enceinte Bluetooth Boombox Outdoor 16W Étanche',
        'enceinte-bluetooth-boombox-outdoor-16w',
        'Mobytek Sound',
        120.000,
        159.000,
        15,
        true,
        true,
        true,
        'Offre Spéciale Facebook Mobytek (Prix : 120 DT) ! Puissante enceinte cylindrique avec sangle d’épaule, doubles radiateurs de basses passifs, étanchéité IPX6 et autonomie 12h.',
        $$
        {
          "puissance": "16W RMS Stéréo",
          "resistance": "IPX6 résistant à la pluie",
          "autonomie": "Jusqu'à 12 heures",
          "fonctions": "TWS Dual Pairing, Radio FM, Mains Libres"
        }
        $$::jsonb,
        ARRAY['Sangle de transport incluse', 'Câble Type-C'],
        4.9
    ),
    (
        'ca555555-5555-5555-5555-555555555555',
        'c2222222-2222-2222-2222-222222222222',
        'Haut-Parleur Karaoké Portable KTS RGB avec Micro',
        'haut-parleur-karaoke-portable-kts-rgb',
        'KTS Sound',
        120.000,
        149.000,
        12,
        true,
        false,
        true,
        'Offre Spéciale Facebook Mobytek (Prix : 120 DT) ! Haut-parleur festif avec grand woofer illuminé LED, micro filaire inclus pour soirées karaoké et poignée ergonomique.',
        $$
        {
          "puissance": "20W",
          "microphone": "Micro filaire inclus avec réglage écho",
          "entrees": "USB, Carte SD, Jack Micro, Bluetooth",
          "eclairage": "Cercles LED RGB festifs"
        }
        $$::jsonb,
        ARRAY['Microphone karaoké inclus', 'Câble chargeur'],
        4.8
    ),
    (
        'ca666666-6666-6666-6666-666666666666',
        'c2222222-2222-2222-2222-222222222222',
        'Enceinte Rétro Radio Vintage FM/Bluetooth',
        'enceinte-retro-radio-vintage-bluetooth',
        'Mobytek Vintage',
        49.000,
        65.000,
        20,
        false,
        true,
        true,
        'Visible sur nos photos de vitrine en 3 coloris (Gold, Silver, Vert Pistache) ! Look vintage rétro des années 50 avec bouton rotatif analogique et technologie Bluetooth 5.0 moderne.',
        $$
        {
          "style": "Rétro Vintage avec grille métallique",
          "connexions": "Bluetooth, Radio FM analogique, Carte TF, USB",
          "autonomie": "Jusqu'à 8 heures"
        }
        $$::jsonb,
        ARRAY['Câble micro-USB inclus'],
        4.9
    ),
    (
        'ca777777-7777-7777-7777-777777777777',
        'c2222222-2222-2222-2222-222222222222',
        'Casque Sans Fil Bluetooth P9 Max Stéréo',
        'casque-sans-fil-bluetooth-p9-max',
        'P9 Audio',
        35.000,
        49.000,
        45,
        true,
        false,
        true,
        'Le célèbre casque P9 visible en 4 couleurs sur notre page (Noir, Argent, Vert Pastel, Bleu Ciel) ! Coussinets à mémoire de forme, son spatial haute fidélité et micro intégré.',
        $$
        {
          "batterie": "400 mAh rechargeable",
          "autonomie": "Jusqu'à 10 heures d'écoute",
          "portee": "10 mètres sans obstacle",
          "connectique": "Bluetooth 5.0 + entrée Jack 3.5mm"
        }
        $$::jsonb,
        ARRAY['Câble Jack 3.5mm', 'Câble de charge'],
        4.8
    ),
    (
        'ca888888-8888-8888-8888-888888888888',
        'c8888888-8888-8888-8888-888888888888',
        'Pack Booster de Batterie Voiture Jump Starter 12V 20000mAh',
        'pack-booster-batterie-voiture-jump-starter-12v',
        'Mobytek Power Auto',
        149.000,
        189.000,
        14,
        true,
        true,
        true,
        'L’accessoire indispensable pour tous les automobilistes en Tunisie (visible dans sa mallette avec pinces crocodiles sur nos photos Facebook) ! Permet de démarrer une voiture en panne de batterie instantanément sans aide extérieure, fait aussi office de batterie externe puissante avec lampe torche LED de secours.',
        $$
        {
          "capacite": "20000 mAh haute intensité",
          "courant_de_crete": "800A (démarrage moteurs Essence & Diesel)",
          "sorties": "2x USB charge rapide + port 12V",
          "securite": "Pinces intelligentes anti-court circuit",
          "accessoires": "Mallette rigide de transport + pinces crocodiles"
        }
        $$::jsonb,
        ARRAY['Pinces crocodiles intelligentes', 'Mallette de rangement'],
        4.9
    ),
    (
        'ca999999-9999-9999-9999-999999999999',
        'c8888888-8888-8888-8888-888888888888',
        'Mini Compresseur d''Air Électrique Portable Digital',
        'mini-compresseur-air-electrique-portable',
        'Mobytek Auto',
        79.000,
        99.000,
        20,
        false,
        true,
        true,
        'Gonfleur électrique intelligent autonome sans fil avec batterie rechargeable. Écran numérique avec arrêt automatique à la pression souhaitée. Gonfle pneus de voiture, moto, trottinette et ballons.',
        $$
        {
          "pression_max": "150 PSI / 10.3 Bar",
          "batterie": "Rechargeable Type-C intégrée",
          "affichage": "Écran LCD digital rétro-éclairé",
          "lampe": "LED de secours pour utilisation nocturne"
        }
        $$::jsonb,
        ARRAY['Embouts de gonflage universels inclus'],
        4.8
    ),
    (
        'cb111111-1111-1111-1111-111111111111',
        'c8888888-8888-8888-8888-888888888888',
        'Caméra de Surveillance Extérieure Solaire 4G / Wi-Fi',
        'camera-surveillance-exterieure-solaire-4g',
        'Mobytek Security',
        189.000,
        239.000,
        10,
        true,
        true,
        true,
        'Visible sur nos photos en boutique avec son panneau solaire et ses doubles antennes ! 100% sans fil et autonome grâce à l’énergie solaire. Détection humaine IA, vision nocturne couleur et vision en direct sur smartphone.',
        $$
        {
          "resolution": "Full HD 1080p / 3 MP",
          "alimentation": "Panneau solaire haute efficacité + batterie lithium",
          "vision_nocturne": "Infrarouge & projecteurs LED couleur",
          "audio": "Bidirectionnel (micro + haut-parleur intégré)",
          "etancheite": "IP66 extérieur"
        }
        $$::jsonb,
        ARRAY['Panneau solaire orientable inclus', 'Support mural'],
        4.9
    ),
    (
        'cb222222-2222-2222-2222-222222222222',
        'c8888888-8888-8888-8888-888888888888',
        'Console Rétro Portable SUP Game Box 400 en 1',
        'console-retro-portable-sup-game-box',
        'SUP Games',
        29.000,
        39.000,
        35,
        false,
        false,
        true,
        'La célèbre console rétro vue sur nos photos en 4 couleurs (Rouge, Jaune, Noir, Blanc) ! Intègre 400 jeux cultes d’enfance (Mario, Contra, etc.), écran couleur 3.0 pouces et câble TV inclus pour jouer sur télévision.',
        $$
        {
          "jeux": "400 jeux classiques 8-Bit",
          "ecran": "3.0 pouces LCD couleur",
          "batterie": "Lithium rechargeable amovible",
          "connexion_tv": "Câble AV inclus"
        }
        $$::jsonb,
        ARRAY['Câble TV AV inclus', 'Batterie rechargeable'],
        4.7
    )
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Product Images
INSERT INTO public.product_images (product_id, image_url, is_primary, display_order)
VALUES
    -- iPhone 16 Pro Max
    ('a1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80', true, 1),
    ('a1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80', false, 2),
    ('a1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80', false, 3),

    -- Samsung S24 Ultra
    ('a2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80', true, 1),
    ('a2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80', false, 2),

    -- Xiaomi 14 Ultra
    ('a3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Samsung Galaxy A55
    ('a4444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- AirPods Pro 2
    ('a5555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1000&q=80', true, 1),
    ('a5555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80', false, 2),

    -- Anker Prime 67W
    ('a6666666-6666-6666-6666-666666666666', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Samsung Galaxy Watch 6
    ('a7777777-7777-7777-7777-777777777777', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Baseus Blade HD 20000mAh
    ('a8888888-8888-8888-8888-888888888888', 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Pack 20W PD Mobytek
    ('a9999999-9999-9999-9999-999999999999', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Écouteurs TWS Bass Pro
    ('ba111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Support Voiture Magnétique
    ('ba222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Pack Coque MagSafe + 9D
    ('ba333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Samsung Galaxy A15
    ('ba555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Vivo Y21d Rose Poudré
    ('ba666666-6666-6666-6666-666666666666', 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Samsung Galaxy A05s
    ('ba777777-7777-7777-7777-777777777777', 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Xiaomi Redmi 13C
    ('ba888888-8888-8888-8888-888888888888', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Vivo Y03
    ('ba999999-9999-9999-9999-999999999999', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Xiaomi Redmi 14C
    ('ca111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Infinix Hot 40i
    ('ca222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Mini Enceinte RGB
    ('ca333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Boombox Outdoor 16W
    ('ca444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- KTS Karaoké RGB
    ('ca555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Enceinte Rétro Radio
    ('ca666666-6666-6666-6666-666666666666', 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Casque P9 Max
    ('ca777777-7777-7777-7777-777777777777', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Booster Jump Starter 12V
    ('ca888888-8888-8888-8888-888888888888', 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Mini Compresseur Digital
    ('ca999999-9999-9999-9999-999999999999', 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Caméra Solaire 4G
    ('cb111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80', true, 1),

    -- Console SUP Game Box
    ('cb222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80', true, 1)
ON CONFLICT DO NOTHING;
