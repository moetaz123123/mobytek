import { dbService } from '../services/dbService.js';

export const getOrders = async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status,
      search: req.query.search
    };
    const orders = await dbService.getOrders(filters);
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await dbService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée.'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { customer_name, customer_phone, delivery_address, city, items } = req.body;

    if (!customer_name || !customer_phone || !delivery_address || !city) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez renseigner toutes vos coordonnées pour la livraison (Nom, Téléphone, Adresse, Ville).'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Votre panier est vide. Impossible de passer la commande.'
      });
    }

    const newOrder = await dbService.createOrder(req.body);
    res.status(201).json({
      success: true,
      message: 'Votre commande a été enregistrée avec succès ! Notre équipe va vous contacter pour la confirmation.',
      data: newOrder
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Le statut est obligatoire.'
      });
    }

    const updated = await dbService.updateOrderStatus(id, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée.'
      });
    }

    res.json({
      success: true,
      message: `Statut de la commande mis à jour : "${status}"`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
