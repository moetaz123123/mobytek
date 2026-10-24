import { dbService } from '../services/dbService.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await dbService.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await dbService.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée.'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Le nom de la catégorie est obligatoire.'
      });
    }

    const newCategory = await dbService.createCategory(req.body);
    res.status(201).json({
      success: true,
      message: 'Catégorie créée avec succès !',
      data: newCategory
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dbService.updateCategory(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée.'
      });
    }

    res.json({
      success: true,
      message: 'Catégorie mise à jour avec succès !',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dbService.deleteCategory(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée.'
      });
    }

    res.json({
      success: true,
      message: 'Catégorie supprimée avec succès !'
    });
  } catch (error) {
    next(error);
  }
};
