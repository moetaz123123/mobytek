import jwt from 'jsonwebtoken';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

export const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Accès non autorisé. Token manquant.'
      });
    }

    const token = authHeader.split(' ')[1];

    // If Supabase Auth is active, verify via Supabase getUser
    if (isSupabaseConfigured && supabase) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user) {
        // Check profile role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile?.role === 'admin' || user.email === (process.env.ADMIN_EMAIL || 'admin@mobytek.tn')) {
          req.user = { ...user, role: 'admin' };
          return next();
        }
      }
    }

    // Verify fallback JWT
    const secret = process.env.JWT_SECRET || 'mobytek_super_secret_jwt_key_2026_tunisia';
    try {
      const decoded = jwt.verify(token, secret);
      if (decoded.role === 'admin') {
        req.user = decoded;
        return next();
      }
    } catch (jwtErr) {
      // invalid token
    }

    return res.status(403).json({
      success: false,
      message: 'Accès refusé. Privilèges administrateur requis.'
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expirée ou invalide. Veuillez vous reconnecter.'
    });
  }
};
