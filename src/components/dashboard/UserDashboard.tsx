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
  Copy,
  RotateCcw,
  TrendingUp,
  Activity,
  CheckCircle2,
  BarChart3,
  Inbox,
  Smile,
  ArrowUpRight,
  User as UserIcon,
  LogIn,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WishData, EventType } from '../../types/wish';
import { EVENT_TEMPLATES } from '../../config/eventsConfig';
import { recordWishView } from '../../services/wishService';
import { sound } from '../../utils/audioSynthesis';

interface UserDashboardProps {
  user: { uid?: string; name: string; email: string; avatar?: string } | null;
  wishes: WishData[];
  onRefreshWishes?: () => Promise<void>;
  onCreateNew: () => void;
  onEditWish: (wish: WishData) => void;
  onDuplicateWish?: (wish: WishData) => void;
  onDeleteWish: (id: string) => void;
  onShareWish: (wish: WishData) => void;
  onPreviewWish: (wish: WishData) => void;
  onOpenAuth: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  wishes,
  onRefreshWishes,
  onCreateNew,
  onEditWish,
  onDuplicateWish,
  onDeleteWish,
  onShareWish,
  onPreviewWish,
  onOpenAuth,
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'projects' | 'activity_analytics' | 'inbox'>('projects');
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'published' | 'scheduled' | 'drafts'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'views' | 'reactions' | 'name'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [simulatedWishId, setSimulatedWishId] = useState<string | null>(null);

  // Real Stats Calculations derived directly from wishes and activities
  const totalWishes = wishes.length;
  const publishedWishes = wishes.filter((w) => w.status === 'published' || !w.status).length;
  const scheduledWishes = wishes.filter((w) => w.isScheduled).length;
  const draftWishes = wishes.filter((w) => w.status === 'draft').length;

  const totalViews = wishes.reduce((sum, w) => sum + (w.viewsCount || 0), 0);
  const totalReactions = wishes.reduce((sum, w) => sum + (w.reactions?.length || 0), 0);
  const wishesWithViews = wishes.filter((w) => (w.viewsCount || 0) > 0).length;
  const activeReachRate = totalWishes > 0 ? Math.round((wishesWithViews / totalWishes) * 100) : 0;
  const engagementRate = totalViews > 0 ? Math.min(100, Math.round((totalReactions / totalViews) * 100)) : 0;

  // Occasions breakdown based on real user projects
  const occasionCounts: Record<string, { count: number; views: number; reactions: number }> = {};
  wishes.forEach((w) => {
    if (!occasionCounts[w.eventType]) {
      occasionCounts[w.eventType] = { count: 0, views: 0, reactions: 0 };
    }
    occasionCounts[w.eventType].count += 1;
    occasionCounts[w.eventType].views += w.viewsCount || 0;
    occasionCounts[w.eventType].reactions += w.reactions?.length || 0;
  });

  const sortedOccasions = Object.entries(occasionCounts).sort((a, b) => b[1].count - a[1].count);

  // Compile unified Real Activity Stream (views, creations, reactions)
  interface ActivityItem {
    id: string;
    type: 'reaction' | 'view' | 'created';
    wishId: string;
    wishTitle: string;
    recipientName: string;
    timestamp: string;
    detail: string;
    emoji?: string;
  }

  const activities: ActivityItem[] = [];

  wishes.forEach((w) => {
    // 1. Reactions
    if (w.reactions && w.reactions.length > 0) {
      w.reactions.forEach((r, idx) => {
        activities.push({
          id: `rx-${w.id}-${idx}`,
          type: 'reaction',
          wishId: w.id,
          wishTitle: w.title || `${w.recipientName}'s Greeting`,
          recipientName: r.name || w.recipientName,
          timestamp: r.createdAt || w.updatedAt || w.createdAt || new Date().toISOString(),
          detail: `"${r.reply}"`,
          emoji: r.emoji,
        });
      });
    }

    // 2. View activity
    if ((w.viewsCount || 0) > 0) {
      activities.push({
        id: `view-${w.id}`,
        type: 'view',
        wishId: w.id,
        wishTitle: w.title || `${w.recipientName}'s Greeting`,
        recipientName: w.recipientName,
        timestamp: w.lastViewedAt || w.updatedAt || w.createdAt || new Date().toISOString(),
        detail: `Opened and viewed ${w.viewsCount} time${(w.viewsCount || 0) > 1 ? 's' : ''}`,
      });
    }

    // 3. Project Creation
    if (w.createdAt) {
      activities.push({
        id: `create-${w.id}`,
        type: 'created',
        wishId: w.id,
        wishTitle: w.title || `${w.recipientName}'s Greeting`,
        recipientName: w.recipientName,
        timestamp: w.createdAt,
        detail: `Greeting created and ready to celebrate`,
      });
    }
  });

  // Sort activities newest first
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Filter and sort wishes
  const filteredWishes = wishes
    .filter((wish) => {
      if (activeFilterTab === 'published' && wish.status !== 'published') return false;
      if (activeFilterTab === 'drafts' && wish.status !== 'draft') return false;
      if (activeFilterTab === 'scheduled' && !wish.isScheduled) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          wish.recipientName.toLowerCase().includes(q) ||
          wish.title?.toLowerCase().includes(q) ||
          wish.eventType.toLowerCase().includes(q) ||
          wish.senderName?.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'views') return (b.viewsCount || 0) - (a.viewsCount || 0);
      if (sortBy === 'reactions') return (b.reactions?.length || 0) - (a.reactions?.length || 0);
      if (sortBy === 'name') return a.recipientName.localeCompare(b.recipientName);
      // 'newest' default
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });

  // Handle live refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefreshWishes) {
      await onRefreshWishes();
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Simulate a real view for instant testing by creator
  const handleSimulateView = async (wishId: string, recipientName: string) => {
    setSimulatedWishId(wishId);
    sound.playConfettiPop();
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
    });

    try {
      await recordWishView(wishId);
      if (onRefreshWishes) {
        await onRefreshWishes();
      }
    } catch (err) {
      console.warn('View simulation notice:', err);
    } finally {
      setTimeout(() => setSimulatedWishId(null), 1500);
    }
  };

  const formatRelativeTime = (isoString?: string) => {
    if (!isoString) return 'Recently';
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* User Account / Welcome & Sync Bar */}
      {user ? (
        <div className="mb-8 p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl border-2 border-rose-300 object-cover shadow-sm shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
                {user.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Google Account Active</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
              <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-rose-600">
                <Activity className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>Real-Time Activity & Cloud Storage Synced</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold disabled:opacity-50"
              title="Refresh Live Activity"
            >
              <RotateCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-rose-600' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Sync Activity'}</span>
            </button>

            <button
              onClick={onCreateNew}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Greeting</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-6 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 rounded-3xl border border-rose-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-rose-700 border border-rose-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Real User Activity Synchronization</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">Sign In with Google to Save Your Projects</h2>
            <p className="text-xs text-slate-600 mt-1 max-w-lg">
              Sign in with your genuine Google account so your custom templates, live recipient views, and reactions are permanently tracked in your private cloud dashboard.
            </p>
          </div>

          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md active:scale-95 transition-all shrink-0"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In with Google</span>
          </button>
        </div>
      )}

      {/* Real Activity Analytics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Projects */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Projects
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalWishes}</div>
          <div className="mt-2 text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <span className="text-rose-600 font-bold">{publishedWishes} Live</span>
            <span>•</span>
            <span>{scheduledWishes} Scheduled</span>
          </div>
        </div>

        {/* Real Recipient Views */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Recipient Views
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-950 flex items-baseline gap-2">
            <span>{totalViews}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Real Visits
            </span>
          </div>
          <div className="mt-2 text-[11px] font-semibold text-slate-400">
            {activeReachRate}% of wishes opened by recipients
          </div>
        </div>

        {/* Reactions & Replies */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Reactions Received
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-950">{totalReactions}</div>
          <div className="mt-2 text-[11px] font-semibold text-slate-400">
            Heartfelt emoji responses & replies
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Engagement Rate
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-950">{engagementRate}%</div>
          <div className="mt-2 text-[11px] font-semibold text-slate-400">
            {engagementRate > 50 ? 'High emotional connection 🔥' : 'Growing response rate 📈'}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 mb-6 gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMainTab('projects')}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeMainTab === 'projects'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>My Projects ({totalWishes})</span>
          </button>

          <button
            onClick={() => setActiveMainTab('activity_analytics')}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeMainTab === 'activity_analytics'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Activity & Analytics</span>
            {activities.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeMainTab === 'activity_analytics' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
              }`}>
                {activities.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMainTab('inbox')}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeMainTab === 'inbox'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Reactions Inbox</span>
            {totalReactions > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeMainTab === 'inbox' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {totalReactions}
              </span>
            )}
          </button>
        </div>

        <div className="hidden sm:flex items-center text-xs text-slate-400">
          <span>Real user metrics synced</span>
        </div>
      </div>

      {/* TAB 1: PROJECTS & WISHES */}
      {activeMainTab === 'projects' && (
        <>
          {/* Filter, Sort & Search Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto">
              {[
                { id: 'all', label: `All (${totalWishes})` },
                { id: 'published', label: `Live & Sent (${publishedWishes})` },
                { id: 'scheduled', label: `Scheduled (${scheduledWishes})` },
                { id: 'drafts', label: `Drafts (${draftWishes})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilterTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeFilterTab === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-rose-500"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="views">Sort: Most Views</option>
                <option value="reactions">Sort: Most Reactions</option>
                <option value="name">Sort: Recipient Name</option>
              </select>

              {/* Search Field */}
              <div className="relative flex-1 sm:w-56">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wishes..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Wishes List */}
          {filteredWishes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No projects found in this tab</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                Create an animated greeting for a birthday, anniversary, or special milestone!
              </p>
              <button
                onClick={onCreateNew}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Greeting</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWishes.map((wish) => {
                const template = EVENT_TEMPLATES[wish.eventType] || EVENT_TEMPLATES.birthday;
                const hasReactions = wish.reactions && wish.reactions.length > 0;
                const isSimulating = simulatedWishId === wish.id;

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

                      <div className="flex items-center gap-1.5">
                        {(wish.secretCode || wish.password) && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/90 text-white flex items-center gap-0.5 backdrop-blur-xs"
                            title={`Passcode: ${wish.secretCode || wish.password}${
                              wish.secretCodeHint ? ` (Hint: ${wish.secretCodeHint})` : ''
                            }`}
                          >
                            <span>🔐</span>
                            <span>{wish.secretCode || wish.password}</span>
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/20 text-white backdrop-blur-xs">
                          {wish.status || 'published'}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          "{wish.personalMessage}"
                        </p>

                        {/* Real Activity & Metrics for this Wish */}
                        <div className="mt-3.5 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-slate-700 font-semibold" title="Real recipient visits">
                              <Eye className="w-3.5 h-3.5 text-indigo-500" />
                              <strong className="text-indigo-900">{wish.viewsCount || 0}</strong> views
                            </span>

                            <span className="flex items-center gap-1 text-slate-700 font-semibold" title="Recipient reactions">
                              <MessageCircle className="w-3.5 h-3.5 text-rose-500" />
                              <strong className="text-rose-900">{wish.reactions?.length || 0}</strong> replies
                            </span>
                          </div>

                          <span className="text-[10px] text-slate-400 font-medium">
                            {formatRelativeTime(wish.lastViewedAt || wish.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Recipient Reaction Preview Banner */}
                      {hasReactions && (
                        <div className="p-2.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs">
                          <div className="flex items-center justify-between mb-0.5">
                            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-800">
                              <span>{wish.reactions[0].emoji}</span>
                              <span>{wish.reactions[0].name || wish.recipientName}:</span>
                            </div>
                            <span className="text-[9px] text-rose-400">
                              {formatRelativeTime(wish.reactions[0].createdAt)}
                            </span>
                          </div>
                          <p className="text-[11px] text-rose-900 italic line-clamp-1">
                            "{wish.reactions[0].reply}"
                          </p>
                        </div>
                      )}

                      {/* Simulated Visit / Quick Tester Bar */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleSimulateView(wish.id, wish.recipientName)}
                          disabled={isSimulating}
                          className="w-full py-1.5 px-3 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-indigo-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
                          title="Simulate a real recipient visit to test view incrementation"
                        >
                          <Activity className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                          <span>{isSimulating ? 'Counting Visit...' : 'Simulate Recipient Visit (+1 View)'}</span>
                        </button>
                      </div>

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
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4 text-slate-500" />
                        </button>

                        {onDuplicateWish && (
                          <button
                            onClick={() => onDuplicateWish(wish)}
                            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Duplicate as New Template"
                          >
                            <Copy className="w-4 h-4 text-indigo-500" />
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete the project for ${wish.recipientName}?`)) {
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
        </>
      )}

      {/* TAB 2: REAL ACTIVITY & ANALYTICS */}
      {activeMainTab === 'activity_analytics' && (
        <div className="space-y-8">
          {/* Activity Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Real Activity Feed (2 Cols) */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900">Live Recipient Activity Feed</h3>
                    <p className="text-[11px] text-slate-400">Chronological history of greeting opens, views, and replies</p>
                  </div>
                </div>

                <button
                  onClick={handleRefresh}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Sync</span>
                </button>
              </div>

              {activities.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No activities recorded yet. Share your wish links with loved ones to see live views and replies appear here!
                </div>
              ) : (
                <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                  {activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 hover:bg-slate-100/70 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm shrink-0 mt-0.5">
                          {act.type === 'reaction' && (act.emoji || '❤️')}
                          {act.type === 'view' && '👀'}
                          {act.type === 'created' && '✨'}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800">
                            {act.type === 'reaction' && (
                              <span>
                                <strong className="text-rose-600">{act.recipientName}</strong> replied to{' '}
                                <span className="text-slate-600">"{act.wishTitle}"</span>
                              </span>
                            )}
                            {act.type === 'view' && (
                              <span>
                                Greeting for <strong className="text-indigo-600">{act.recipientName}</strong> was opened
                              </span>
                            )}
                            {act.type === 'created' && (
                              <span>
                                You created greeting for <strong className="text-slate-900">{act.recipientName}</strong>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{act.detail}</p>
                        </div>
                      </div>

                      <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                        {formatRelativeTime(act.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Occasions Distribution Breakdown (1 Col) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900">Occasions Celebrated</h3>
                    <p className="text-[11px] text-slate-400">Distribution by occasion category</p>
                  </div>
                </div>

                {sortedOccasions.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    No projects created yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedOccasions.map(([evtKey, data]) => {
                      const template = EVENT_TEMPLATES[evtKey as EventType];
                      const pct = Math.round((data.count / totalWishes) * 100);

                      return (
                        <div key={evtKey} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-700 flex items-center gap-1.5">
                              <span>{template?.icon || '🎉'}</span>
                              <span>{template?.name || evtKey}</span>
                            </span>
                            <span className="font-semibold text-slate-500">
                              {data.count} wish{data.count > 1 ? 'es' : ''} ({data.views} views)
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <button
                  onClick={onCreateNew}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Start New Occasion Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REACTIONS INBOX */}
      {activeMainTab === 'inbox' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900">Reactions & Love Notes Inbox</h3>
                <p className="text-xs text-slate-400">Replies and emoji reactions sent back by your recipients</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
              {totalReactions} Heartfelt Messages
            </span>
          </div>

          {totalReactions === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              <Smile className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-600">No recipient replies received yet</p>
              <p className="text-slate-400 mt-1 max-w-sm mx-auto">
                Once your friends or loved ones receive their greeting link, they can send you back an emoji reaction and a personalized thank-you reply!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishes
                .filter((w) => w.reactions && w.reactions.length > 0)
                .flatMap((w) =>
                  w.reactions.map((r, i) => ({
                    wish: w,
                    reaction: r,
                    key: `${w.id}-${i}`,
                  }))
                )
                .map(({ wish, reaction, key }) => (
                  <div
                    key={key}
                    className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/60 to-pink-50/40 border border-rose-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{reaction.emoji}</span>
                          <div>
                            <span className="font-black text-xs text-slate-900 block">
                              {reaction.name || wish.recipientName}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              For: {wish.title || `${wish.recipientName}'s Greeting`}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-rose-600 bg-white px-2 py-0.5 rounded-full border border-rose-100">
                          {formatRelativeTime(reaction.createdAt)}
                        </span>
                      </div>

                      <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-rose-100 text-xs text-slate-800 italic leading-relaxed">
                        "{reaction.reply}"
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-rose-100/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          sound.playConfettiPop();
                          confetti({ particleCount: 30, spread: 60 });
                        }}
                        className="text-rose-600 hover:text-rose-700 font-bold text-[11px] flex items-center gap-1"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span>Celebrate Love Note</span>
                      </button>

                      <button
                        onClick={() => onPreviewWish(wish)}
                        className="text-slate-500 hover:text-slate-800 font-medium text-[11px] flex items-center gap-1"
                      >
                        <span>View Greeting</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
