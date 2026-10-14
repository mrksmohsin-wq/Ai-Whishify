import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { PhotoMemory } from '../../types/wish';

interface PhotoSlideshowActivityProps {
  photos?: PhotoMemory[];
  recipientName: string;
}

export const PhotoSlideshowActivity: React.FC<PhotoSlideshowActivityProps> = ({
  photos = [],
  recipientName,
}) => {
  // Default sample memories if user didn't upload photos
  const displayPhotos: PhotoMemory[] =
    photos.length > 0
      ? photos
      : [
          {
            url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
            caption: 'A sunny day filled with endless smiles and golden memories',
          },
          {
            url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
            caption: 'Laughing until our faces hurt - one of our greatest moments!',
          },
          {
            url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
            caption: 'Celebrating life, dancing, and dreaming big dreams',
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayPhotos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === displayPhotos.length - 1 ? 0 : prev + 1));
  };

  const current = displayPhotos[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      {/* Header */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-800 mb-2 border border-indigo-200">
        <Camera className="w-3.5 h-3.5 text-indigo-600" />
        Precious Memories
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Moments with {recipientName}
      </h2>
      <p className="text-xs md:text-sm text-slate-600 mb-4">
        Every snapshot tells a story of love, laughter, and friendship
      </p>

      {/* Polaroid Frame */}
      <div className="relative group w-full max-w-sm bg-white p-3 md:p-4 rounded-xl shadow-2xl border border-slate-200 transform rotate-1 transition-all duration-300 hover:rotate-0 hover:scale-[1.02]">
        {/* Tape decoration at top */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-amber-100/80 backdrop-blur-xs border border-amber-300/60 rotate-2 shadow-xs z-10" />

        {/* Photo Container */}
        <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-slate-100 shadow-inner">
          <img
            src={current.url}
            alt={current.caption || 'Memory photo'}
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={(e) => {
              // Fallback image if broken URL
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80';
            }}
          />

          {/* Nav arrows overlay */}
          {displayPhotos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Photo Counter badge */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-[11px] text-white font-medium backdrop-blur-xs">
            {currentIndex + 1} / {displayPhotos.length}
          </div>
        </div>

        {/* Caption */}
        <div className="pt-4 pb-2 text-center min-h-[50px] flex items-center justify-center px-2">
          <p className="font-handwriting text-lg md:text-xl text-slate-800 leading-snug">
            {current.caption || 'Cherished times together ✨'}
          </p>
        </div>
      </div>

      {/* Thumbnails strip */}
      {displayPhotos.length > 1 && (
        <div className="flex items-center gap-2 mt-4 overflow-x-auto max-w-xs py-1">
          {displayPhotos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                currentIndex === idx ? 'border-rose-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={photo.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
