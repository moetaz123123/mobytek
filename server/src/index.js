import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur Mobytek API démarré sur http://localhost:${PORT}`);
  console.log(`📡 Endpoints disponibles :`);
  console.log(`   - Produits:   http://localhost:${PORT}/api/products`);
  console.log(`   - Catégories: http://localhost:${PORT}/api/categories`);
  console.log(`   - Commandes:  http://localhost:${PORT}/api/orders`);
  console.log(`   - Auth:       http://localhost:${PORT}/api/auth/login`);
  console.log(`   - Dashboard:  http://localhost:${PORT}/api/stats/overview`);
});

export default app;
