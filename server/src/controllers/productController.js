import { dbService } from '../services/dbService.js';

export const getProducts = async (req, res, next) => {
  try {
    const filters = {
      category: req.query.category,
      brand: req.query.brand,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sort: req.query.sort,
      featured: req.query.featured,
      promo: req.query.promo,
      isNew: req.query.isNew,
      search: req.query.search
    };

    const products = await dbService.getProducts(filters);
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await dbService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé.'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, brand, price, stock, description, category_id } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({
        success: false,
        message: 'Le nom, le prix et la catégorie sont obligatoires.'
      });
    }

    const newProduct = await dbService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès !',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dbService.updateProduct(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé.'
      });
    }

    res.json({
      success: true,
      message: 'Produit mis à jour avec succès !',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dbService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Produit introuvable ou déjà supprimé.'
      });
    }

    res.json({
      success: true,
      message: 'Produit supprimé avec succès !'
    });
  } catch (error) {
    next(error);
  }
};
