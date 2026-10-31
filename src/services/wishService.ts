import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  arrayUnion,
  increment,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { WishData, RecipientReaction } from '../types/wish';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Save or Update a Wish in Firestore
export async function saveWishToFirestore(wish: WishData): Promise<WishData> {
  const wishId = wish.id || 'wish-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  const currentUserId = auth.currentUser?.uid;
  const currentUserEmail = auth.currentUser?.email || undefined;

  const wishPayload: WishData = {
    ...wish,
    id: wishId,
    userId: currentUserId || wish.userId || 'anonymous',
    userEmail: currentUserEmail || wish.userEmail || undefined,
    viewsCount: wish.viewsCount || 0,
    reactions: wish.reactions || [],
    createdAt: wish.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: wish.status || 'published',
  };

  const path = `wishes/${wishId}`;
  try {
    await setDoc(doc(db, 'wishes', wishId), wishPayload);
    return wishPayload;
  } catch (error) {
    console.warn('Firestore write failed, falling back to server storage:', error);
    // Fallback to Express backend storage if offline or permission denied
    const res = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wishPayload),
    });
    const data = await res.json();
    return data.wish || wishPayload;
  }
}

// Get all wishes created by current logged-in user
export async function getUserWishesFromFirestore(userId: string): Promise<WishData[]> {
  const path = 'wishes';
  try {
    const q = query(collection(db, 'wishes'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const wishes: WishData[] = [];
    snapshot.forEach((d) => {
      wishes.push(d.data() as WishData);
    });
    return wishes;
  } catch (error) {
    console.warn('Firestore query failed, fetching from server API:', error);
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      return (data.wishes || []).filter((w: WishData) => !w.userId || w.userId === userId);
    } catch {
      return [];
    }
  }
}

// Fetch a single wish by ID (for recipient view or editing)
export async function getWishByIdFromFirestore(wishId: string): Promise<WishData | null> {
  const path = `wishes/${wishId}`;
  try {
    const snapshot = await getDoc(doc(db, 'wishes', wishId));
    if (snapshot.exists()) {
      return snapshot.data() as WishData;
    }
  } catch (error) {
    console.warn('Firestore get failed, checking server API:', error);
  }

  // Fallback to server API
  try {
    const res = await fetch(`/api/wishes/${wishId}`);
    if (res.ok) {
      const data = await res.json();
      return data.wish || null;
    }
  } catch (err) {
    console.error('Error fetching wish from API:', err);
  }
  return null;
}

// Record a recipient view count
export async function recordWishView(wishId: string): Promise<void> {
  const now = new Date().toISOString();
  // 1. Update in Firestore
  try {
    const wishRef = doc(db, 'wishes', wishId);
    await updateDoc(wishRef, {
      viewsCount: increment(1),
      lastViewedAt: now,
    });
  } catch (err) {
    console.warn('Firestore view track notice:', err);
  }

  // 2. Also notify backend API to keep server storage in sync
  try {
    await fetch(`/api/wishes/${wishId}?trackView=true`);
  } catch {
    // Ignore offline errors
  }
}

// Add a recipient reaction and reply
export async function addWishReaction(wishId: string, reaction: RecipientReaction): Promise<void> {
  const reactionWithId: RecipientReaction = {
    ...reaction,
    id: reaction.id || 'rx-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    createdAt: reaction.createdAt || new Date().toISOString(),
  };

  // 1. Update in Firestore
  try {
    const wishRef = doc(db, 'wishes', wishId);
    await updateDoc(wishRef, {
      reactions: arrayUnion(reactionWithId),
      lastActivityAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Firestore reaction notice:', err);
  }

  // 2. Sync to server API
  try {
    await fetch(`/api/wishes/${wishId}/reaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reactionWithId),
    });
  } catch {
    // Ignore offline errors
  }
}

// Delete a user wish
export async function deleteWishFromFirestore(wishId: string): Promise<void> {
  const path = `wishes/${wishId}`;
  try {
    await deleteDoc(doc(db, 'wishes', wishId));
  } catch (error) {
    console.warn('Firestore delete failed, deleting via server API:', error);
    await fetch(`/api/wishes/${wishId}`, { method: 'DELETE' });
  }
}
