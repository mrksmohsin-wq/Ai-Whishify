/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/home/LandingPage';
import { OccasionsGallery } from './components/gallery/OccasionsGallery';
import { WishCreationWizard } from './components/wizard/WishCreationWizard';
import { WishSequencePlayer } from './components/player/WishSequencePlayer';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { PricingPage } from './components/pricing/PricingPage';
import { ShareWishModal } from './components/share/ShareWishModal';
import { AuthModal } from './components/auth/AuthModal';
import { PinGateModal } from './components/player/PinGateModal';
import { WishData, EventType } from './types/wish';
import { EVENT_TEMPLATES } from './config/eventsConfig';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'gallery' | 'dashboard' | 'pricing' | 'create' | 'player'>('home');
  const [selectedEventType, setSelectedEventType] = useState<EventType>('birthday');
  const [activeWish, setActiveWish] = useState<WishData | null>(null);
  const [editingWish, setEditingWish] = useState<WishData | null>(null);
  const [wishesList, setWishesList] = useState<WishData[]>([]);
  const [shareModalWish, setShareModalWish] = useState<WishData | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPlayerPreviewMode, setIsPlayerPreviewMode] = useState(false);
  const [isPinGateOpen, setIsPinGateOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try {
      const saved = localStorage.getItem('ai_wishify_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Fetch all wishes from the backend
  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (data.wishes) {
        setWishesList(data.wishes);
      }
    } catch (err) {
      console.error('Error fetching wishes:', err);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  // Parse URL hash for direct recipient links (/#w=:id or /#preview=:id)
  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash.startsWith('#w=')) {
        const wishId = hash.replace('#w=', '');
        await loadWishById(wishId, false);
      } else if (hash.startsWith('#preview=')) {
        const wishId = hash.replace('#preview=', '');
        await loadWishById(wishId, true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const loadWishById = async (id: string, isPreview: boolean) => {
    try {
      const res = await fetch(`/api/wishes/${id}?trackView=${!isPreview}`);
      const data = await res.json();
      if (data.wish) {
        setActiveWish(data.wish);
        setIsPlayerPreviewMode(isPreview);

        // Check if password protected
        if (data.wish.password && !isPreview) {
          setIsPinGateOpen(true);
        } else {
          setCurrentView('player');
        }
      }
    } catch (err) {
      console.error('Failed to load wish by ID:', err);
    }
  };

  const handleStartCreating = (eventType?: EventType) => {
    if (eventType) {
      setSelectedEventType(eventType);
    }
    setEditingWish(null);
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveWish = async (wish: WishData, publishNow: boolean) => {
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wish),
      });
      const data = await res.json();
      if (data.wish) {
        setActiveWish(data.wish);
        await fetchWishes();
        if (publishNow) {
          setShareModalWish(data.wish);
        } else {
          setCurrentView('dashboard');
        }
      }
    } catch (err) {
      console.error('Error saving wish:', err);
    }
  };

  const handleLivePreview = (wish: WishData) => {
    setActiveWish(wish);
    setIsPlayerPreviewMode(true);
    setCurrentView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviewSample = (eventType: EventType) => {
    const template = EVENT_TEMPLATES[eventType] || EVENT_TEMPLATES.birthday;
    const sample: WishData = {
      id: `sample-${eventType}`,
      eventType: eventType,
      title: template.sampleWish.title || template.name,
      recipientName: template.sampleWish.recipientName || 'Mohsin',
      recipientNickname: template.sampleWish.recipientNickname || 'Mo',
      senderName: template.sampleWish.senderName || 'Liam & Friends',
      relationship: template.sampleWish.relationship || 'Best Friend',
      personalMessage: template.sampleWish.personalMessage || 'Wishing you the happiest celebration ever!',
      tone: 'emotional',
      language: 'English (United States)',
      colorTheme: template.colorScheme,
      musicTrack: template.defaultMusic,
      age: template.sampleWish.age,
      cakeFlavor: template.sampleWish.cakeFlavor,
      teacherSubject: template.sampleWish.teacherSubject,
      teacherSchool: template.sampleWish.teacherSchool,
      yearsTogether: template.sampleWish.yearsTogether,
      howWeMet: template.sampleWish.howWeMet,
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
          caption: 'Special unforgettable moments together ✨',
        },
        {
          url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
          caption: 'Laughter, joy, and forever memories ❤️',
        },
      ],
      giftRevealedItem: template.sampleWish.giftRevealedItem || {
        type: 'voucher',
        title: 'Celebration Voucher',
        message: 'A wonderful treat on us to celebrate your big day!',
      },
      isScheduled: false,
      status: 'published',
      viewsCount: 1,
      reactions: [],
      createdAt: new Date().toISOString(),
    };

    setActiveWish(sample);
    setIsPlayerPreviewMode(true);
    setCurrentView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteWish = async (id: string) => {
    try {
      await fetch(`/api/wishes/${id}`, { method: 'DELETE' });
      await fetchWishes();
    } catch (err) {
      console.error('Error deleting wish:', err);
    }
  };

  const handleAuthSuccess = (userData: { name: string; email: string; avatar?: string }) => {
    setUser(userData);
    localStorage.setItem('ai_wishify_user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('ai_wishify_user');
  };

  // If PIN Gate is active for a password-protected wish
  if (isPinGateOpen && activeWish) {
    return (
      <PinGateModal
        recipientName={activeWish.recipientName}
        expectedPin={activeWish.password || ''}
        onUnlocked={() => {
          setIsPinGateOpen(false);
          setCurrentView('player');
        }}
      />
    );
  }

  // If in Player mode (full screen immersive recipient experience)
  if (currentView === 'player' && activeWish) {
    return (
      <WishSequencePlayer
        wish={activeWish}
        isPreview={isPlayerPreviewMode}
        onBackToEdit={() => {
          setEditingWish(activeWish);
          setCurrentView('create');
          window.location.hash = '';
        }}
        onCreateOwn={() => {
          setCurrentView('create');
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <LandingPage
            onStartCreating={handleStartCreating}
            onExploreOccasions={() => {
              setCurrentView('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPreviewSample={handlePreviewSample}
            onViewPricing={() => {
              setCurrentView('pricing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'gallery' && (
          <OccasionsGallery
            onSelectOccasion={(event) => handleStartCreating(event)}
            onPreviewSample={handlePreviewSample}
          />
        )}

        {currentView === 'dashboard' && (
          <UserDashboard
            wishes={wishesList}
            onCreateNew={() => handleStartCreating('birthday')}
            onEditWish={(wish) => {
              setEditingWish(wish);
              setSelectedEventType(wish.eventType);
              setCurrentView('create');
            }}
            onDeleteWish={handleDeleteWish}
            onShareWish={(wish) => setShareModalWish(wish)}
            onPreviewWish={(wish) => {
              setActiveWish(wish);
              setIsPlayerPreviewMode(true);
              setCurrentView('player');
            }}
          />
        )}

        {currentView === 'pricing' && (
          <PricingPage
            onSelectPlan={(plan) => {
              if (!user) {
                setIsAuthModalOpen(true);
              } else {
                alert(`You are now enrolled in the ${plan.toUpperCase()} tier! Happy wishing! ✨`);
                setCurrentView('create');
              }
            }}
          />
        )}

        {currentView === 'create' && (
          <WishCreationWizard
            initialEvent={selectedEventType}
            initialWish={editingWish || undefined}
            onSaveWish={handleSaveWish}
            onLivePreview={handleLivePreview}
            onCancel={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectOccasion={(event) => handleStartCreating(event)}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Share / Delivery Modal */}
      {shareModalWish && (
        <ShareWishModal
          wish={shareModalWish}
          onClose={() => setShareModalWish(null)}
          onOpenPlayer={(preview) => {
            setActiveWish(shareModalWish);
            setIsPlayerPreviewMode(preview);
            setShareModalWish(null);
            setCurrentView('player');
          }}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
