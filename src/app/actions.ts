'use server';

import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  doc, 
  updateDoc, 
  increment,
  getDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { generateVideoHooks, GenerateVideoHooksInput } from '@/ai/flows/generate-video-hooks-flow';

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  views: number;
  description?: string;
  viralSummary?: string;
  viralTitle?: string;
  createdAt?: any;
}

export async function getTrendingVideos(limitCount: number = 20): Promise<Video[]> {
  try {
    const vidsCol = collection(db, 'videos');
    const q = query(vidsCol, orderBy('views', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Video[];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export async function incrementVideoViews(videoId: string) {
  try {
    const videoRef = doc(db, 'videos', videoId);
    await updateDoc(videoRef, {
      views: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}

export async function addVideo(data: Omit<Video, 'id' | 'views'>) {
  try {
    const vidsCol = collection(db, 'videos');
    const docRef = await addDoc(vidsCol, {
      ...data,
      views: 0,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding video:', error);
    throw error;
  }
}

export async function generateAIHooks(input: GenerateVideoHooksInput) {
  return await generateVideoHooks(input);
}
