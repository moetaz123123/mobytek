# 📱 Mobytek — Site E-commerce de Téléphones & Accessoires (Tunisie)

Bienvenue sur le projet officiel **Mobytek**, une plateforme e-commerce moderne, dynamique et complète dédiée à la vente de smartphones neufs (Apple, Samsung, Xiaomi) et d'accessoires certifiés en Tunisie (prix en Dinars Tunisiens — TND).

---

## 🌟 Caractéristiques Principales

### 🛍️ Côté Boutique (Client)
- **Page d'Accueil Premium** : Hero section immersive avec slogan percutant, barres d'engagements (Authenticité, Disponibilité showroom, SAV réactif, Livraison express 24-48h), carrousels de bestsellers, promotions du moment, grille des catégories et liens vers la communauté Facebook.
- **Catalogue & Recherche Dynamique** : Filtres avancés par catégorie, par marque (Apple, Samsung, Xiaomi, Anker, Baseus), par budget max (slider de prix en DT), filtres promos & nouveautés, et tri dynamique (popularité, prix croissant/décroissant, nouveautés).
- **Fiche Produit Détaillée** : Galerie photo interactive multi-angles, caractéristiques techniques complètes (écran, processeur, RAM, stockage, batterie), accessoires compatibles certifiés avec ajout direct, stock en temps réel et bouton « Commander maintenant ».
- **Panier d'Achat & Slide-Over Drawer** : Ajustement des quantités, calcul automatique du sous-total et de la livraison (offerte à partir de 300 DT), indicateur de progression livraison gratuite.
- **Système de Commande (Paiement à la livraison)** : Formulaire de livraison adapté au marché tunisien (sélection parmi les 24 gouvernorats tunisiens, numéro de téléphone joignable, adresse et notes pour le livreur), paiement sécurisé en espèces à la réception sans prépaiement bancaire obligatoire.
- **Page de Confirmation** : Récapitulatif avec numéro de suivi de commande (`MOB-2026-XXXX`), rappel du montant en espèces et hotline de confirmation.

### 🛡️ Côté Administration (Dashboard)
- **Accès Sécurisé** : Authentification protégée par token JWT et compatibilité Supabase Auth (`/admin/login`).
- **Tableau de Bord & Indicateurs KPI** : Chiffre d'affaires total (DT), total des commandes, commandes en attente d'appel de confirmation, articles au catalogue et alertes stock faible (< 5 unités).
- **Gestion des Produits (CRUD)** : Ajout de nouveaux modèles avec formulaire ergonomique, upload d'images, gestion des prix normaux et prix barrés, spécifications techniques, stocks et badges (promo, nouveau, bestseller).
- **Gestion des Catégories** : Création, édition et organisation des rayons (Smartphones, Audio, Chargeurs GaN, Montres connectées, Powerbanks, Coques).
- **Gestion des Commandes** : Suivi des commandes clients, visualisation des coordonnées et détails de livraison, mise à jour instantanée du statut (`en attente`, `confirmée`, `en préparation`, `expédiée`, `livrée`, `annulée`) et appel client direct en un clic.

---

## 🛠️ Architecture Technique

```
moby_tek/
├── client/                     # Application Frontend React (Vite)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, HeroBanner, ProductCard, CartDrawer, etc.
│   │   ├── pages/              # Accueil, Catalogue, Détails, Panier, Checkout, Confirmation, About, Contact
│   │   │   └── admin/          # AdminLogin, AdminLayout, AdminDashboard, AdminProducts, AdminOrders, AdminCategories
│   │   ├── context/            # CartContext (panier persistant), AuthContext (session admin)
│   │   ├── services/           # api.js (Service HTTP REST centralisé)
│   │   ├── index.css           # Tailwind CSS + styles glassmorphism et polices Google Fonts (Inter & Outfit)
│   │   └── App.jsx             # Routeur principal React Router v6
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API REST Node.js (Express)
│   ├── src/
│   │   ├── config/             # Configuration Supabase & fallback
│   │   ├── controllers/        # Contrôleurs métier (produits, catégories, commandes, auth, stats)
│   │   ├── routes/             # Routes Express (/api/products, /api/categories, /api/orders, /api/auth, /api/stats)
│   │   ├── middleware/         # Vérification des rôles administrateur et gestionnaire d'erreurs
│   │   ├── services/           # Service de persistance connecté à Supabase avec fallback automatique
│   │   ├── data/               # Données de démarrage réalistes (produits & commandes initiales)
│   │   └── app.js & index.js   # Configuration du serveur Express (port 5000)
│   ├── database/
│   │   ├── schema.sql          # Script SQL PostgreSQL complet pour Supabase (tables, index, RLS, triggers)
│   │   └── seed.sql            # Données de démarrage SQL avec prix en DT
│   ├── .env.example            # Variables d'environnement modèle
│   └── package.json
│
├── package.json                # Orchestration racine (scripts npm dev / build)
└── README.md
```

---

## 🚀 Démarrage Rapide

### 1. Prérequis
- [Node.js](https://nodejs.org) version 18 ou supérieure
- `npm` version 9 ou supérieure

### 2. Installation de toutes les dépendances
À la racine du projet `moby_tek`, exécutez :
```bash
npm run install:all
```
Cette commande installe automatiquement les dépendances du serveur Express et de l'interface React.

### 3. Lancer le projet en développement
Lancez simultanément le backend et le frontend avec une seule commande :
```bash
npm run dev
```
- **Boutique Client** accessible sur : [http://localhost:5173](http://localhost:5173)
- **API REST Backend** accessible sur : [http://localhost:5000/api](http://localhost:5000/api)
- **Tableau de Bord Administrateur** : [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 🔐 Identifiants Administrateur Démo

Pour tester immédiatement l'espace d'administration sans configuration préalable :
- **URL** : `http://localhost:5173/admin/login`
- **Email** : `admin@mobytek.tn`
- **Mot de passe** : `admin123456`

---

## 🗄️ Configuration de la Base de Données Supabase (Optionnel pour Production)

Le projet intègre un service de secours intelligent (`dbService.js`) qui permet à l'ensemble du site (panier, filtres, passage de commande, modifications admin) de fonctionner immédiatement en local.

Pour connecter votre propre instance **Supabase** en production :

1. Créez un projet gratuit sur [Supabase](https://supabase.com).
2. Rendez-vous dans le menu **SQL Editor** de Supabase et exécutez le script [schema.sql](file:///c:/Users/User/Desktop/moby_tek/server/database/schema.sql) situé dans `server/database/schema.sql`. Il créera les tables `profiles`, `categories`, `products`, `product_images`, `orders`, `order_items`, `cart_items` ainsi que les politiques de sécurité RLS (*Row Level Security*).
3. *(Optionnel)* Exécutez le script [seed.sql](file:///c:/Users/User/Desktop/moby_tek/server/database/seed.sql) pour charger le catalogue initial des téléphones Apple, Samsung, Xiaomi et accessoires.
4. Ouvrez le fichier `server/.env` et renseignez vos clés de projet trouvées dans les paramètres Supabase (*Project Settings > API*) :
   ```env
   SUPABASE_URL=https://votre-projet.supabase.co
   SUPABASE_ANON_KEY=votre_cle_anon
   SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
   ```
5. Redémarrez le serveur (`npm run dev`). La console affichera :
   `✅ Connecté avec succès à la base Supabase PostgreSQL`.

---

## 📡 Documentation des Endpoints API REST

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| `GET` | `/api/products` | Récupérer les produits (filtres: search, category, brand, promo, new, sort) | Public |
| `GET` | `/api/products/:id` | Récupérer un produit par ID ou slug avec images et caractéristiques | Public |
| `POST` | `/api/products` | Créer un nouveau produit | Admin |
| `PUT` | `/api/products/:id` | Mettre à jour un produit existant | Admin |
| `DELETE` | `/api/products/:id` | Supprimer un produit | Admin |
| `GET` | `/api/categories` | Liste de toutes les catégories | Public |
| `POST` | `/api/categories` | Créer une catégorie | Admin |
| `PUT` | `/api/categories/:id` | Modifier une catégorie | Admin |
| `DELETE` | `/api/categories/:id` | Supprimer une catégorie | Admin |
| `POST` | `/api/orders` | Passer une commande (avec items et adresse en Tunisie) | Public |
| `GET` | `/api/orders` | Liste des commandes avec filtrage par statut | Admin |
| `GET` | `/api/orders/:id` | Détails d'une commande | Admin |
| `PUT` | `/api/orders/:id/status` | Mettre à jour le statut d'une commande | Admin |
| `POST` | `/api/auth/login` | Connexion administrateur / utilisateur | Public |
| `GET` | `/api/auth/me` | Vérification de la session active | Protégé |
| `GET` | `/api/stats/overview` | Statistiques globales du tableau de bord (CA en DT, commandes, stock) | Admin |

---

## 🎨 Design & Palette Visuelle
- **Couleurs principales** : Bleu High-Tech Électrique (`#2582fd`), Nuances Slate Sombres (`#0b0f19`, `#111827`), Rose Vif pour les promotions (`#f43f5e`), Émeraude pour le stock (`#10b981`).
- **Typographie** : `Outfit` pour les titres et `Inter` pour les textes courants.
- **Composants** : Effets de verre (glassmorphism), ombres douces et lueurs subtiles (*glow*), badges d'état et transitions au survol.

---

© 2026 Mobytek Tunisie. Tous droits réservés.
