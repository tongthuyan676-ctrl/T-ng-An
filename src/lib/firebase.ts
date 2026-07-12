import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Configure Google Auth Provider with Google Sheets Scope
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');

let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google to get sheets access token
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Không thể lấy mã truy cập Google Sheets từ Firebase Auth');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Lỗi đăng nhập Google Auth:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// --- Firestore Database Helpers ---

// 1. Ebook Registrations
export interface EbookReg {
  id?: string;
  fullName: string;
  email: string;
  phoneZalo: string;
  status: 'Chưa thanh toán' | 'Đã thanh toán';
  createdAt: string;
  synced?: boolean;
  packageName?: string;
  price?: string;
}

export const saveEbookRegistration = async (data: Omit<EbookReg, 'status' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'ebook_registrations'), {
      ...data,
      status: 'Chưa thanh toán',
      createdAt: new Date().toISOString(),
      synced: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving ebook registration:', error);
    throw error;
  }
};

export const getEbookRegistrations = async (): Promise<EbookReg[]> => {
  try {
    const q = query(collection(db, 'ebook_registrations'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const results: EbookReg[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as EbookReg);
    });
    return results;
  } catch (error) {
    console.error('Error fetching ebook registrations:', error);
    return [];
  }
};

export const updateEbookRegStatus = async (id: string, status: 'Chưa thanh toán' | 'Đã thanh toán', synced?: boolean) => {
  try {
    const docRef = doc(db, 'ebook_registrations', id);
    const updateData: any = { status };
    if (synced !== undefined) {
      updateData.synced = synced;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating ebook registration status:', error);
    throw error;
  }
};

export const deleteEbookReg = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'ebook_registrations', id));
  } catch (error) {
    console.error('Error deleting ebook registration:', error);
    throw error;
  }
};

// 2. Coach Registrations
export interface CoachReg {
  id?: string;
  name: string;
  phone: string;
  email: string;
  industry: string;
  biggestChallenge: string;
  message: string;
  status: 'Chưa thanh toán' | 'Đã thanh toán';
  createdAt: string;
  synced?: boolean;
}

export const saveCoachRegistration = async (data: Omit<CoachReg, 'status' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'coach_registrations'), {
      ...data,
      status: 'Chưa thanh toán',
      createdAt: new Date().toISOString(),
      synced: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving coach registration:', error);
    throw error;
  }
};

export const getCoachRegistrations = async (): Promise<CoachReg[]> => {
  try {
    const q = query(collection(db, 'coach_registrations'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const results: CoachReg[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as CoachReg);
    });
    return results;
  } catch (error) {
    console.error('Error fetching coach registrations:', error);
    return [];
  }
};

export const updateCoachRegStatus = async (id: string, status: 'Chưa thanh toán' | 'Đã thanh toán', synced?: boolean) => {
  try {
    const docRef = doc(db, 'coach_registrations', id);
    const updateData: any = { status };
    if (synced !== undefined) {
      updateData.synced = synced;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating coach registration status:', error);
    throw error;
  }
};

export const deleteCoachReg = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'coach_registrations', id));
  } catch (error) {
    console.error('Error deleting coach registration:', error);
    throw error;
  }
};

// 3. Gift Registrations
export interface GiftReg {
  id?: string;
  fullName: string;
  email: string;
  phoneZalo: string;
  selectedGift: string;
  createdAt: string;
  synced?: boolean;
}

export const saveGiftRegistration = async (data: Omit<GiftReg, 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'gift_registrations'), {
      ...data,
      createdAt: new Date().toISOString(),
      synced: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving gift registration:', error);
    throw error;
  }
};

export const getGiftRegistrations = async (): Promise<GiftReg[]> => {
  try {
    const q = query(collection(db, 'gift_registrations'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const results: GiftReg[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as GiftReg);
    });
    return results;
  } catch (error) {
    console.error('Error fetching gift registrations:', error);
    return [];
  }
};

export const updateGiftRegSynced = async (id: string, synced: boolean) => {
  try {
    const docRef = doc(db, 'gift_registrations', id);
    await updateDoc(docRef, { synced });
  } catch (error) {
    console.error('Error updating gift registration sync status:', error);
    throw error;
  }
};

export const deleteGiftReg = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'gift_registrations', id));
  } catch (error) {
    console.error('Error deleting gift registration:', error);
    throw error;
  }
};

// 4. Corporate/Business Partnership Registrations
export interface CorpReg {
  id?: string;
  companyName: string;
  contactName: string;
  position: string;
  phoneZalo: string;
  email: string;
  partnershipType: string; // e.g., 'Đào tạo nhân sự', 'Coaching đội ngũ', 'Workshop/Sự kiện', 'Khác'
  message: string;
  createdAt: string;
  synced?: boolean;
}

export const saveCorpRegistration = async (data: Omit<CorpReg, 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'corp_registrations'), {
      ...data,
      createdAt: new Date().toISOString(),
      synced: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving corporate registration:', error);
    throw error;
  }
};

export const getCorpRegistrations = async (): Promise<CorpReg[]> => {
  try {
    const q = query(collection(db, 'corp_registrations'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const results: CorpReg[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as CorpReg);
    });
    return results;
  } catch (error) {
    console.error('Error fetching corporate registrations:', error);
    return [];
  }
};

export const updateCorpRegSynced = async (id: string, synced: boolean) => {
  try {
    const docRef = doc(db, 'corp_registrations', id);
    await updateDoc(docRef, { synced });
  } catch (error) {
    console.error('Error updating corporate registration sync status:', error);
    throw error;
  }
};

export const deleteCorpReg = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'corp_registrations', id));
  } catch (error) {
    console.error('Error deleting corporate registration:', error);
    throw error;
  }
};

// 5. Course Registrations
export interface CourseReg {
  id?: string;
  fullName: string;
  email: string;
  phoneZalo: string;
  courseId: string;
  courseTitle: string;
  price: string;
  status: 'Chưa thanh toán' | 'Đã thanh toán';
  createdAt: string;
  synced?: boolean;
}

export const saveCourseRegistration = async (data: Omit<CourseReg, 'status' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'course_registrations'), {
      ...data,
      status: 'Chưa thanh toán',
      createdAt: new Date().toISOString(),
      synced: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving course registration:', error);
    throw error;
  }
};

export const getCourseRegistrations = async (): Promise<CourseReg[]> => {
  try {
    const q = query(collection(db, 'course_registrations'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const results: CourseReg[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as CourseReg);
    });
    return results;
  } catch (error) {
    console.error('Error fetching course registrations:', error);
    return [];
  }
};

export const updateCourseRegStatus = async (id: string, status: 'Chưa thanh toán' | 'Đã thanh toán', synced?: boolean) => {
  try {
    const docRef = doc(db, 'course_registrations', id);
    const updateData: any = { status };
    if (synced !== undefined) {
      updateData.synced = synced;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating course registration status:', error);
    throw error;
  }
};

export const deleteCourseReg = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'course_registrations', id));
  } catch (error) {
    console.error('Error deleting course registration:', error);
    throw error;
  }
};

