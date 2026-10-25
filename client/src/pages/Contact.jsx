import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Renseignement produit',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Renseignement produit',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-mono font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5 text-zinc-900" />
          <span>Contact & Showroom</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-black text-zinc-950 tracking-tight">
          Venez Nous Rendre Visite ou Contactez-nous
        </h1>
        <p className="text-sm text-zinc-500">
          La boutique officielle Mobytek vous accueille à Sfax ou vous répond par téléphone et WhatsApp pour vos commandes et livraisons partout en Tunisie.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Official Contact info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-5 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-heading font-bold text-zinc-950 border-b border-zinc-100 pb-3">
              Coordonnées Officielles Mobytek
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-950">Boutique & Showroom</h4>
                  <p className="text-zinc-800 font-medium">Route de l'Ain km 3,5</p>
                  <p className="text-zinc-500 text-[11px]">(À côté du kiosque Shell / station Shell)</p>
                  <p className="text-zinc-700 font-semibold">Sfax, Tunisie</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-200">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-950">Téléphones & WhatsApp</h4>
                  <div className="space-y-0.5 mt-1">
                    <p>
                      <a href="tel:+21625455300" className="text-zinc-950 font-bold hover:underline font-mono text-sm">
                        +216 25 455 300
                      </a>
                    </p>
                    <p>
                      <a href="tel:+21621121870" className="text-zinc-950 font-bold hover:underline font-mono text-sm">
                        +216 21 121 870
                      </a>
                    </p>
                  </div>
                  <p className="text-zinc-500 text-[11px] mt-1">Appels & commandes WhatsApp 7j/7</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-950">Email</h4>
                  <a href="mailto:contact@mobytek.tn" className="text-zinc-950 font-bold hover:underline">contact@mobytek.tn</a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0 border border-zinc-200">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-950">Horaires d'Ouverture du Magasin</h4>
                  <p className="text-zinc-700">Lundi au Samedi : 09h00 - 20h00</p>
                  <p className="text-zinc-500">Dimanche : Commandes en ligne actives</p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-zinc-100 space-y-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Réseaux Sociaux Officiels</span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.facebook.com/p/Mobytek-61574218696687/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold flex items-center gap-2 hover:bg-zinc-800 transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                
                <a
                  href="https://www.instagram.com/moby_tek"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center gap-2 hover:bg-zinc-800 transition shadow-sm border border-zinc-800"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href="https://wa.me/21625455300"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-950 border border-zinc-200 text-xs font-bold flex items-center gap-2 hover:bg-zinc-200 transition shadow-sm"
                >
                  <span>WhatsApp direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 p-5 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 pb-4">
            <h2 className="text-lg font-heading font-bold text-zinc-950">Envoyez-nous un message</h2>
            <p className="text-xs text-zinc-500">Besoin d'un devis, d'une confirmation de stock ou d'un conseil ?</p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-900 space-y-2 text-center animate-subtle-pulse">
              <CheckCircle2 className="w-10 h-10 text-zinc-950 mx-auto" />
              <h4 className="font-bold text-sm">Message transmis avec succès !</h4>
              <p className="text-xs text-zinc-600">Merci de nous avoir contactés. L'équipe Mobytek va vous répondre très rapidement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800">Votre Nom Complet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Anis Chaabane"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800">Numéro de Téléphone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 25 455 300"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-800">Adresse Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: anis@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-800">Objet de la demande</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  >
                    <option value="Renseignement produit">Disponibilité d'un smartphone ou accessoire</option>
                    <option value="Suivi de commande">Suivi de commande ou livraison express</option>
                    <option value="Service après-vente">Garantie ou SAV Mobytek</option>
                    <option value="Visite showroom">Renseignements sur le magasin à Sfax</option>
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-800">Votre Message *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Posez votre question sur les modèles, coques ou chargeurs disponibles..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma demande à l'équipe</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
