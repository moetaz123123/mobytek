import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowLeft, AlertCircle, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import MobyTekLogo from '../../components/MobyTekLogo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez renseigner votre email et mot de passe administrateur.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Identifiants administrateur incorrects.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <MobyTekLogo variant="light" size="lg" showSubtitle={true} />
          </div>
          <h1 className="text-2xl font-heading font-black text-zinc-950 tracking-tight">
            Espace Administration
          </h1>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
            Accès sécurisé pour la gestion du catalogue, le suivi des commandes et les indicateurs du magasin.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-zinc-100 border border-zinc-300 text-zinc-950 text-xs flex items-center gap-2 animate-fade-in font-medium">
              <AlertCircle className="w-4 h-4 text-zinc-900 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-800">Email Administrateur</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@mobytek.tn"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
                />
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-800">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 pl-10 pr-10 text-xs font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
                />
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-800 transition"
                  title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Vérification sécurisée...</span>
                </>
              ) : (
                <span>Connexion au Dashboard</span>
              )}
            </button>
          </form>

          {/* Security guarantee badge */}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-950" />
            <span>Session administrateur protégée et chiffrée</span>
          </div>

          <div className="text-center">
            <Link to="/" className="text-xs text-zinc-500 hover:text-zinc-950 font-semibold inline-flex items-center gap-1 transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site public</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
