import jwt from 'jsonwebtoken';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez saisir votre email et mot de passe.'
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mobytek.tn';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const secret = process.env.JWT_SECRET || 'mobytek_super_secret_jwt_key_2026_tunisia';

    // 1. Supabase Auth if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          const isAdmin = profile?.role === 'admin' || email === adminEmail;
          const token = jwt.sign(
            { id: data.user.id, email: data.user.email, role: isAdmin ? 'admin' : 'customer' },
            secret,
            { expiresIn: '7d' }
          );

          return res.json({
            success: true,
            message: 'Connexion réussie',
            token,
            user: {
              id: data.user.id,
              email: data.user.email,
              name: profile?.full_name || 'Admin Mobytek',
              role: isAdmin ? 'admin' : 'customer'
            }
          });
        }
      } catch (err) {
        console.warn('Supabase auth attempt failed:', err.message);
      }
    }

    // 2. Direct Admin Fallback (for instant access)
    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign(
        { id: 'admin-default-id', email: adminEmail, role: 'admin' },
        secret,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Connexion administrateur réussie !',
        token,
        user: {
          id: 'admin-default-id',
          email: adminEmail,
          name: 'Administrateur Mobytek',
          role: 'admin'
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Identifiants invalides. Vérifiez votre email et mot de passe.'
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};
