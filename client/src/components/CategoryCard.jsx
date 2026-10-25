import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Headphones, Zap, Watch, ShieldCheck, BatteryCharging, Car } from 'lucide-react';
import realPowerbankImg from '../assets/powerbank-real.jpg';

const iconMap = {
  Smartphone: Smartphone,
  Headphones: Headphones,
  Zap: Zap,
  Watch: Watch,
  ShieldCheck: ShieldCheck,
  BatteryCharging: BatteryCharging,
  Car: Car
};

const fallbackImages = {
  powerbanks: realPowerbankImg,
  smartphones: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
  'audio-ecouteurs': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
  'chargeurs-cables': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
  'montres-connectees': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  'protection-coques': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
  'auto-gadgets': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || ShieldCheck;
  const [hasError, setHasError] = useState(false);

  const isPowerbank = category.slug === 'powerbanks' || 
                      category.name?.toLowerCase().includes('powerbank') || 
                      category.name?.toLowerCase().includes('énergie');

  const targetImage = isPowerbank 
    ? realPowerbankImg 
    : (category.image_url || fallbackImages[category.slug]);

  const displaySrc = hasError 
    ? (fallbackImages[category.slug] || realPowerbankImg) 
    : targetImage;

  return (
    <Link
      to={`/catalogue?category=${category.id}`}
      className="group bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-black transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Category Image Header */}
      <div className="relative h-44 w-full overflow-hidden bg-zinc-100 flex items-center justify-center">
        <img
          src={displaySrc}
          alt={category.name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        
        {/* Floating Category Icon */}
        <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-white text-zinc-950 flex items-center justify-center shadow-md group-hover:bg-black group-hover:text-white transition-all duration-200">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <h3 className="font-heading font-bold text-zinc-950 text-lg group-hover:text-zinc-600 transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mt-1 font-normal">
            {category.description}
          </p>
        </div>

        <div className="pt-2 flex items-center text-xs font-bold text-zinc-900 group-hover:text-black gap-1.5 transition duration-200">
          <span>Découvrir le rayon</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}
