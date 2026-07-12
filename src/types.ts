/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string; 
  title: string;
  description: string;
  suitableFor: string;
  outcome: string;
  tuition: string; // "Học phí / thông tin chi tiết: cần bổ sung"
  iconName: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  channelName?: string;
  stats?: string;
}

export interface SocialChannel {
  name: string;
  platform: 'facebook' | 'tiktok' | 'youtube' | 'zalo' | 'website';
  url: string; // "cần bổ sung"
  handle: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface GiftItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessonsCount: number;
  price: string;
  youtubeId: string; // To embed YouTube player beautifully
  youtubeUrl: string; // Full link to open
  highlights: string[];
  zaloUrl?: string; // Optional custom Zalo group URL for each course
}

