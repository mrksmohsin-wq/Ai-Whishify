import React, { useState } from 'react';
import {
  Sparkles,
  Eye,
  Heart,
  Share2,
  Trash2,
  Edit,
  Clock,
  Calendar,
  Plus,
  MessageCircle,
  ExternalLink,
  Gift,
  Search,
} from 'lucide-react';
import { WishData } from '../../types/wish';
import { EVENT_TEMPLATES } from '../../config/eventsConfig';

interface UserDashboardProps {
  wishes: WishData[];
  onCreateNew: () => void;
  onEditWish: (wish: WishData) => void;
  onDeleteWish: (id: string) => void;
  onShareWish: (wish: WishData) => void;
  onPreviewWish: (wish: WishData) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  wishes,
  onCreateNew,
  onEditWish,
  onDeleteWish,
  onShareWish,
  onPreviewWish,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'scheduled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Stats calculation
  const totalWishes = wishes.length;
  const totalViews = wishes.reduce((sum, w) => sum + (w.viewsCount || 0), 0);
  const totalReactions = wishes.reduce((sum, w) => sum + (w.reactions?.length || 0), 0);

  const filteredWishes = wishes.filter((wish) => {
    if (activeTab === 'published' && wish.status !== 'published') return false;
    if (activeTab === 'scheduled' && !wish.isScheduled) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        wish.recipientName.toLowerCase().includes(q) ||
        wish.title?.toLowerCase().includes(q) ||
        wish.eventType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creator Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage your animated greetings, track views, and read recipient reactions
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Wish</span>
        </button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Total Greetings Created
            </div>
            <div className="text-3xl font-black text-rose-950 mt-1">{totalWishes}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <Gift className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Total Recipient Views
            </div>
            <div className="text-3xl font-black text-indigo-950 mt-1">{totalViews}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Reactions & Replies
            </div>
            <div className="text-3xl font-black text-amber-950 mt-1">{totalReactions}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'all', label: 'All Wishes' },
            { id: 'published', label: 'Published' },
            { id: 'scheduled', label: 'Scheduled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by recipient or event..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 bg-white"
          />
        </div>
      </div>

      {/* Wishes List */}
      {filteredWishes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No wishes found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Create an animated greeting for a birthday, anniversary, or special friend in just a couple minutes!
          </p>
          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Wish</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWishes.map((wish) => {
            const template = EVENT_TEMPLATES[wish.eventType] || EVENT_TEMPLATES.birthday;
            const hasReactions = wish.reactions && wish.reactions.length > 0;

            return (
              <div
                key={wish.id}
                className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Header Banner */}
                <div
                  className={`p-4 bg-gradient-to-r ${template.colorScheme.bgGradient} text-white flex items-center justify-between`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl drop-shadow-sm">{template.icon}</span>
                    <div>
                      <div className="font-extrabold text-sm drop-shadow-xs">
                        {wish.recipientName}
                      </div>
                      <div className="text-[11px] text-white/80 font-medium">
                        {template.name}
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/20 text-white backdrop-blur-xs">
                    {wish.status}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      "{wish.personalMessage}"
                    </p>

                    {/* Meta stats */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <strong>{wish.viewsCount || 0}</strong> views
                      </span>

                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                        <strong>{wish.reactions?.length || 0}</strong> reactions
                      </span>
                    </div>
                  </div>

                  {/* Recipient Reaction Preview Banner */}
                  {hasReactions && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-rose-800 mb-0.5">
                        <span>{wish.reactions[0].emoji}</span>
                        <span>{wish.reactions[0].name || 'Recipient'}:</span>
                      </div>
                      <p className="text-[11px] text-rose-900 italic line-clamp-1">
                        "{wish.reactions[0].reply}"
                      </p>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                    <button
                      onClick={() => onPreviewWish(wish)}
                      className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
                      title="Play Sequence"
                    >
                      <Eye className="w-4 h-4 text-rose-500" />
                      <span>Play</span>
                    </button>

                    <button
                      onClick={() => onShareWish(wish)}
                      className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
                      title="Share Link & QR"
                    >
                      <Share2 className="w-4 h-4 text-blue-500" />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={() => onEditWish(wish)}
                      className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Edit Wish"
                    >
                      <Edit className="w-4 h-4 text-slate-500" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete the wish for ${wish.recipientName}?`)) {
                          onDeleteWish(wish.id);
                        }
                      }}
                      className="p-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Wish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
