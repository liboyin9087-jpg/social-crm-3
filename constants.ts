import { Conversation, Member, User, Language } from './types';

export const CURRENT_USER: User = {
  id: 'agent_01',
  name: 'Sarah Chen',
  avatarUrl: 'https://picsum.photos/id/64/100/100',
  role: 'agent'
};

export const MOCK_MEMBERS: Record<string, Member> = {
  'm_01': {
    id: 'm_01',
    lineName: 'Kenji Sato',
    avatarUrl: 'https://picsum.photos/id/1012/200/200',
    oakUid: 'OAK-88219',
    email: 'kenji.s@example.com',
    phone: '+886 912 345 678',
    level: 'VIP',
    tags: ['Potential', 'Taipei Store', 'SUV Interest'],
    lastActive: '10 mins ago'
  },
  'm_02': {
    id: 'm_02',
    lineName: 'Emily Wu',
    avatarUrl: 'https://picsum.photos/id/342/200/200',
    oakUid: 'OAK-11023',
    email: null,
    phone: null,
    level: 'Basic',
    tags: ['New User'],
    lastActive: '2 hours ago'
  },
  'm_03': {
    id: 'm_03',
    lineName: 'David Lee',
    avatarUrl: 'https://picsum.photos/id/1005/200/200',
    oakUid: 'OAK-55102',
    email: 'david.lee@corp.com',
    phone: '+886 988 111 222',
    level: 'Gold',
    tags: ['Frequent Buyer', 'Kaohsiung'],
    lastActive: '1 day ago'
  },
  'm_04': {
    id: 'm_04',
    lineName: 'Lisa Wong',
    avatarUrl: 'https://picsum.photos/id/1027/200/200',
    oakUid: 'OAK-99321',
    email: 'lisa.w@example.com',
    phone: '+886 922 333 444',
    level: 'Basic',
    tags: ['Price Sensitive', 'Sedan Interest'],
    lastActive: '3 days ago'
  },
  'm_05': {
    id: 'm_05',
    lineName: 'Michael Chang',
    avatarUrl: 'https://picsum.photos/id/100/200/200',
    oakUid: 'OAK-77112',
    email: null,
    phone: null,
    level: 'Gold',
    tags: ['Taipei Store', '2024 Event'],
    lastActive: '5 hours ago'
  }
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c_01',
    memberId: 'm_01',
    lastMessage: 'Is the new model available for test drive?',
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
    messages: [
      { id: 'msg_1', senderId: 'm_01', text: 'Hi, I saw your ad on Facebook.', type: 'text', timestamp: '10:30 AM', read: true },
      { id: 'msg_2', senderId: 'agent_01', text: 'Hello Kenji! Yes, we have a special promotion this week.', type: 'text', timestamp: '10:32 AM', read: true },
      { id: 'msg_3', senderId: 'm_01', text: 'Great. Is the new model available for test drive?', type: 'text', timestamp: '10:42 AM', read: false },
    ]
  },
  {
    id: 'c_02',
    memberId: 'm_02',
    lastMessage: 'Thanks for the info!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'msg_4', senderId: 'm_02', text: 'What are your opening hours?', type: 'text', timestamp: 'Yesterday', read: true },
      { id: 'msg_5', senderId: 'agent_01', text: 'We are open 10am to 9pm daily.', type: 'text', timestamp: 'Yesterday', read: true },
      { id: 'msg_6', senderId: 'm_02', text: 'Thanks for the info!', type: 'text', timestamp: 'Yesterday', read: true },
    ]
  },
  {
    id: 'c_03',
    memberId: 'm_03',
    lastMessage: '[Sticker]',
    lastMessageTime: 'Tuesday',
    unreadCount: 0,
    messages: [
        { id: 'msg_7', senderId: 'm_03', text: 'My order #12345 hasn\'t arrived.', type: 'text', timestamp: 'Tuesday', read: true },
        { id: 'msg_8', senderId: 'agent_01', text: 'Customer is asking about shipping delay.', type: 'text', timestamp: 'Tuesday', isWhisper: true },
        { id: 'msg_9', senderId: 'm_03', text: ' ', type: 'sticker', timestamp: 'Tuesday', read: true },
    ]
  }
];

export const CHART_DATA_VOLUME = [
  { name: '09:00', messages: 12 },
  { name: '10:00', messages: 35 },
  { name: '11:00', messages: 48 },
  { name: '12:00', messages: 20 },
  { name: '13:00', messages: 55 },
  { name: '14:00', messages: 80 },
  { name: '15:00', messages: 65 },
];

export const CHART_DATA_WEEKLY = [
  { name: 'Mon', active: 120, new: 20 },
  { name: 'Tue', active: 132, new: 25 },
  { name: 'Wed', active: 101, new: 15 },
  { name: 'Thu', active: 134, new: 30 },
  { name: 'Fri', active: 190, new: 45 },
  { name: 'Sat', active: 230, new: 60 },
  { name: 'Sun', active: 210, new: 55 },
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  'en': {
    'nav.dashboard': 'Dashboard',
    'nav.inbox': 'Inbox',
    'nav.members': 'Members',
    'nav.broadcast': 'Broadcast',
    'nav.automation': 'Automation',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    'nav.kiosk': 'Enter Kiosk Mode',
    'inbox.title': 'Inbox',
    'inbox.search': 'Search messages...',
    'inbox.filter.all': 'All',
    'inbox.filter.unread': 'Unread',
    'inbox.filter.followup': 'Follow Up',
    'inbox.empty': 'Select a conversation to start chatting',
    'chat.active': 'Active now',
    'chat.whisper': 'Whisper',
    'chat.reply': 'Reply',
    'chat.placeholder': 'Type a message...',
    'chat.whisper.placeholder': 'Internal team note...',
    'chat.whisper.hint': 'Internal team note (Customer won\'t see this)',
    'member.contact': 'Contact Info',
    'member.tags': 'Tags',
    'member.tags.placeholder': '+ Tag...',
    'member.tags.create': 'Create tag',
    'member.journey': 'Journey Timeline',
    'member.not_provided': 'Not provided',
    'action.back': 'Back',
    'action.details': 'Details',
  },
  'zh-TW': {
    'nav.dashboard': '儀表板',
    'nav.inbox': '訊息中心',
    'nav.members': '會員管理',
    'nav.broadcast': '群發廣播',
    'nav.automation': '自動化旅程',
    'nav.analytics': '數據分析',
    'nav.settings': '系統設定',
    'nav.kiosk': '進入 Kiosk 模式',
    'inbox.title': '訊息中心',
    'inbox.search': '搜尋訊息...',
    'inbox.filter.all': '全部',
    'inbox.filter.unread': '未讀',
    'inbox.filter.followup': '待追蹤',
    'inbox.empty': '請選擇左側對話以開始',
    'chat.active': '目前在線',
    'chat.whisper': '內部備註',
    'chat.reply': '回覆',
    'chat.placeholder': '輸入訊息...',
    'chat.whisper.placeholder': '輸入給團隊的內部筆記...',
    'chat.whisper.hint': '這是內部筆記（客戶看不到）',
    'member.contact': '聯絡資訊',
    'member.tags': '標籤管理',
    'member.tags.placeholder': '+ 新增標籤...',
    'member.tags.create': '建立新標籤',
    'member.journey': '互動旅程',
    'member.not_provided': '未提供',
    'action.back': '返回',
    'action.details': '資料',
  }
};

export const AVAILABLE_TAGS = [
  'VIP', 'Potential', 'New User', 'Taipei Store', 'Kaohsiung Store', 
  'SUV Interest', 'Sedan Interest', 'Frequent Buyer', 'High Value', 
  'Complaint', 'Pending Payment', 'Follow Up', '2024 Event', 'Walk-in',
  'Price Sensitive', 'Family Car', 'Electric Vehicle',
  '高潛力', '台北店', '高雄店', '客訴', '待付款', '2024活動', '休旅車愛好'
];