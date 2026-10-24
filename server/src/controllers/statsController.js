import { dbService } from '../services/dbService.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await dbService.getDashboardStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
