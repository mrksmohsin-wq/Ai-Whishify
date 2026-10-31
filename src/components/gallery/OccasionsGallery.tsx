import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, Search, Filter } from 'lucide-react';
import { EVENT_TEMPLATES, ALL_EVENT_KEYS } from '../../config/eventsConfig';
import { EventType } from '../../types/wish';

interface OccasionsGalleryProps {
  onSelectOccasion: (eventType: EventType) => void;
  onPreviewSample: (eventType: EventType) => void;
}

export const OccasionsGallery: React.FC<OccasionsGalleryProps> = ({
  onSelectOccasion,
  onPreviewSample,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Celebration', 'Gratitude', 'Love', 'Milestone', 'Seasonal', 'Comfort & Care'];

  const filteredEvents = ALL_EVENT_KEYS.filter((key) => {
    const tmpl = EVENT_TEMPLATES[key];
    if (selectedCategory !== 'All' && tmpl.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.tagline.toLowerCase().includes(q) ||
        tmpl.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2 border border-rose-200">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          {ALL_EVENT_KEYS.length} Handcrafted Templates
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Celebration Experiences
        </h1>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          Every occasion features its own multi-step sequence, animations, sound design, and interactive surprises.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search occasions..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 bg-white"
          />
        </div>
      </div>

      {/* Grid of Occasions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEvents.map((key) => {
          const tmpl = EVENT_TEMPLATES[key];

          return (
            <div
              key={key}
              className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Card Banner */}
              <div
                className={`p-6 bg-gradient-to-br ${tmpl.colorScheme.bgGradient} text-white flex flex-col items-center text-center relative overflow-hidden`}
              >
                <div className="text-5xl my-2 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                  {tmpl.icon}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-black/20 text-white backdrop-blur-xs mb-1">
                  {tmpl.category}
                </span>
                <h3 className="font-extrabold text-lg text-white drop-shadow-xs">
                  {tmpl.name}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {tmpl.tagline}
                  </p>

                  {/* Steps preview list */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Sequence Highlights ({tmpl.steps.length} Steps)
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {tmpl.steps.slice(0, 3).map((st, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span className="line-clamp-1">{st.title}</span>
                        </li>
                      ))}
                      {tmpl.steps.length > 3 && (
                        <li className="text-[11px] text-slate-400 pl-3">
                          + {tmpl.steps.length - 3} more interactive activities
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onPreviewSample(key)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>Demo</span>
                  </button>

                  <button
                    onClick={() => onSelectOccasion(key)}
                    className="flex-1 py-2 px-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
                  >
                    <span>Create</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
