import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 max-w-md">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-sm font-medium text-slate-100">{toastMessage}</span>
        <button
          onClick={() => setToastMessage(null)}
          className="text-slate-400 hover:text-white p-1 ml-2 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
