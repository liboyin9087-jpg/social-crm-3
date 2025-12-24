export type Language = 'zh-TW' | 'en';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'agent' | 'admin';
}

export interface Member {
  id: string;
  lineName: string;
  avatarUrl: string;
  oakUid: string;
  email: string | null;
  phone: string | null;
  level: 'Basic' | 'Gold' | 'VIP';
  tags: string[];
  lastActive: string;
}

export interface Message {
  id: string;
  senderId: string; // 'agent' or memberId
  text: string;
  type: 'text' | 'image' | 'sticker' | 'flex';
  timestamp: string;
  isWhisper?: boolean; // Internal note
  read?: boolean;
}

export interface Conversation {
  id: string;
  memberId: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  assignedTo?: string; // agentId
  isTyping?: boolean;
  messages: Message[];
}

export enum NavItem {
  Dashboard = 'dashboard',
  Inbox = 'inbox',
  Members = 'members',
  Broadcast = 'broadcast',
  Automation = 'automation',
  Analytics = 'analytics',
  Settings = 'settings',
  Kiosk = 'kiosk' // Special mode
}