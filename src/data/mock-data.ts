import { formatDistanceToNow } from 'date-fns';

// Types
export type ArticleType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  subject: string;
  starred: boolean;
  isFeatured?: boolean;
};

export type ThreadType = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  replies: number;
  views: number;
  category: string;
  tags: string[];
  isSticky?: boolean;
  isLocked?: boolean;
  lastReply?: {
    author: string;
    date: string;
  };
};

export type MessageType = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  time: string;
  unread: number;
};

export type AnnouncementType = {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  authorAvatar: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  isRead: boolean;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  department: string;
  joinDate: string;
  publications: number;
  followers: number;
  following: number;
};

// Generate dates relative to now for more realistic data
const getRelativeDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDistanceToNow(date, { addSuffix: true });
};

// Mock Articles
export const articles: ArticleType[] = [
  {
    id: '1',
    title: 'Advances in Quantum Computing: Breaking the Computational Barrier',
    description: 'This article explores recent breakthroughs in quantum computing and how they might reshape our computational capabilities.',
    imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    author: 'Dr. Emma Richards',
    authorAvatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    date: getRelativeDate(2),
    readTime: '8 min read',
    subject: 'Computer Science',
    starred: false,
    isFeatured: true
  },
  {
    id: '2',
    title: 'The Ethics of Artificial Intelligence in Healthcare',
    description: 'A comprehensive analysis of ethical considerations when implementing AI systems in healthcare environments.',
    imageUrl: 'https://images.pexels.com/photos/6476787/pexels-photo-6476787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    author: 'Prof. James Norton',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: getRelativeDate(3),
    readTime: '12 min read',
    subject: 'Healthcare',
    starred: true
  },
  {
    id: '3',
    title: 'Climate Change: New Models Predict Accelerated Warming',
    description: 'Recent climate models indicate faster warming than previously predicted, with implications for global policy.',
    imageUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    author: 'Dr. Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: getRelativeDate(5),
    readTime: '10 min read',
    subject: 'Environmental Science',
    starred: false
  },
  {
    id: '4',
    title: 'Neuroscience of Learning: Why Spaced Repetition Works',
    description: 'Exploring the neurological basis for the effectiveness of spaced repetition in learning and memory formation.',
    imageUrl: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    author: 'Prof. Michael Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    date: getRelativeDate(7),
    readTime: '9 min read',
    subject: 'Neuroscience',
    starred: true
  },
  {
    id: '5',
    title: 'The Future of Renewable Energy: Beyond Solar and Wind',
    description: 'Exploring emerging renewable energy technologies that could supplement or replace current solar and wind solutions.',
    imageUrl: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    author: 'Dr. Lisa Martinez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    date: getRelativeDate(9),
    readTime: '11 min read',
    subject: 'Energy Science',
    starred: false
  },
  {
    id: '6',
    title: 'Modern Approaches to Language Acquisition in Children',
    description: 'New research on how children acquire language and implications for education and development.',
    imageUrl: 'https://images.pexels.com/photos/8363033/pexels-photo-8363033.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    author: 'Prof. David Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    date: getRelativeDate(12),
    readTime: '14 min read',
    subject: 'Linguistics',
    starred: true
  },
  {
    id: '7',
    title: 'Economic Implications of Blockchain Technology',
    description: 'Analysis of how blockchain technology could transform economic systems and financial institutions.',
    imageUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    author: 'Dr. Rebecca Lee',
    authorAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    date: getRelativeDate(14),
    readTime: '13 min read',
    subject: 'Economics',
    starred: false
  },
  {
    id: '8',
    title: 'Biodiversity Loss: Causes, Consequences, and Solutions',
    description: 'Comprehensive review of the ongoing biodiversity crisis and potential mitigation strategies.',
    imageUrl: 'https://images.pexels.com/photos/2570524/pexels-photo-2570524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    author: 'Prof. Thomas Garcia',
    authorAvatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    date: getRelativeDate(18),
    readTime: '15 min read',
    subject: 'Biology',
    starred: true
  }
];

// Mock Forum Threads
export const forumThreads: ThreadType[] = [
  {
    id: '1',
    title: 'Discussion: Is computational thinking a fundamental skill for modern education?',
    author: 'Prof. Alan Smith',
    authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: getRelativeDate(1),
    replies: 28,
    views: 342,
    category: 'Education',
    tags: ['computational-thinking', 'curriculum', 'future-skills'],
    isSticky: true,
    lastReply: {
      author: 'Dr. Maria Lopez',
      date: getRelativeDate(0),
    }
  },
  {
    id: '2',
    title: 'Request for resources on quantitative research methods in social sciences',
    author: 'Sophia Williams',
    authorAvatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    date: getRelativeDate(3),
    replies: 15,
    views: 187,
    category: 'Research Methods',
    tags: ['quantitative', 'social-sciences', 'research'],
    lastReply: {
      author: 'Prof. James Chen',
      date: getRelativeDate(1),
    }
  },
  {
    id: '3',
    title: 'Experiences with implementing active learning in large lecture courses?',
    author: 'Dr. Robert Green',
    authorAvatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    date: getRelativeDate(4),
    replies: 42,
    views: 520,
    category: 'Teaching',
    tags: ['active-learning', 'large-classes', 'engagement'],
    lastReply: {
      author: 'Lisa Nakamura',
      date: getRelativeDate(0),
    }
  },
  {
    id: '4',
    title: 'Academic publishing: Open access vs. traditional journals',
    author: 'Dr. Emily Carter',
    authorAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    date: getRelativeDate(7),
    replies: 56,
    views: 689,
    category: 'Publishing',
    tags: ['open-access', 'journals', 'academic-publishing'],
    lastReply: {
      author: 'Prof. Daniel White',
      date: getRelativeDate(0),
    }
  },
  {
    id: '5',
    title: 'Ethics approval for online research during pandemic conditions',
    author: 'Marcus Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    date: getRelativeDate(8),
    replies: 19,
    views: 231,
    category: 'Research Ethics',
    tags: ['ethics', 'online-research', 'pandemic'],
    lastReply: {
      author: 'Dr. Sarah Kim',
      date: getRelativeDate(2),
    }
  },
  {
    id: '6',
    title: 'Announcement: Special issue on climate change adaptation',
    author: 'Prof. Diane Roberts',
    authorAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    date: getRelativeDate(10),
    replies: 8,
    views: 412,
    category: 'Announcements',
    tags: ['climate-change', 'special-issue', 'publication'],
    isLocked: true,
    lastReply: {
      author: 'Dr. Michael Davis',
      date: getRelativeDate(9),
    }
  }
];

// Mock Messages
export const messages: MessageType[] = [
  {
    id: '1',
    userId: 'u1',
    name: 'Dr. Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isOnline: true,
    lastMessage: "I've reviewed your research proposal and have some feedback",
    time: getRelativeDate(0).replace(' ago', ''),
    unread: 2
  },
  {
    id: '2',
    userId: 'u2',
    name: 'Prof. Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    isOnline: false,
    lastMessage: 'Are you available for the department meeting tomorrow?',
    time: getRelativeDate(0).replace(' ago', ''),
    unread: 0
  },
  {
    id: '3',
    userId: 'u3',
    name: 'Emma Richards',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    isOnline: true,
    lastMessage: 'Thanks for the paper recommendation, very helpful',
    time: getRelativeDate(1).replace(' ago', ''),
    unread: 0
  },
  {
    id: '4',
    userId: 'u4',
    name: 'Prof. James Norton',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: false,
    lastMessage: 'The conference has been rescheduled to next month',
    time: getRelativeDate(2).replace(' ago', ''),
    unread: 1
  },
  {
    id: '5',
    userId: 'u5',
    name: 'Lisa Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    isOnline: true,
    lastMessage: "I've shared my notes from the lecture series",
    time: getRelativeDate(3).replace(' ago', ''),
    unread: 0
  }
];

// Mock Announcements
export const announcements: AnnouncementType[] = [
  {
    id: '1',
    title: 'Important: Changes to Research Funding Application Process',
    content: 'Beginning next month, all research funding applications will follow a new submission protocol. Please review the updated guidelines on the research portal.',
    date: getRelativeDate(0),
    author: 'Dr. William Harris',
    authorAvatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    priority: 'high',
    category: 'Administrative',
    isRead: false
  },
  {
    id: '2',
    title: 'Annual Academic Conference Registration Now Open',
    content: 'Registration for the Annual Academic Conference is now open. Early bird registration discounts are available until the end of the month.',
    date: getRelativeDate(1),
    author: 'Prof. Elizabeth Taylor',
    authorAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    priority: 'medium',
    category: 'Events',
    isRead: true
  },
  {
    id: '3',
    title: 'Library Resource Update: New Journal Subscriptions',
    content: 'The university library has added subscriptions to 15 new journals across various disciplines. Access is available immediately through the library portal.',
    date: getRelativeDate(3),
    author: 'Margaret Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/72.jpg',
    priority: 'low',
    category: 'Resources',
    isRead: false
  },
  {
    id: '4',
    title: 'System Maintenance: Academic Portal Downtime',
    content: 'The academic portal will be unavailable due to scheduled maintenance this Saturday from 2:00 AM to 6:00 AM Eastern Time.',
    date: getRelativeDate(4),
    author: 'IT Department',
    authorAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    priority: 'medium',
    category: 'Technical',
    isRead: true
  },
  {
    id: '5',
    title: 'Deadline Extension: Summer Research Program Applications',
    content: 'Due to high demand, the application deadline for the Summer Research Program has been extended by two weeks to May 15th.',
    date: getRelativeDate(5),
    author: 'Dr. Rachel Green',
    authorAvatar: 'https://randomuser.me/api/portraits/women/39.jpg',
    priority: 'high',
    category: 'Programs',
    isRead: false
  },
  {
    id: '6',
    title: 'New Faculty Onboarding Sessions Scheduled',
    content: 'Welcome sessions for new faculty members have been scheduled for the first week of the upcoming semester. Please check your email for specific dates and times.',
    date: getRelativeDate(7),
    author: 'Human Resources',
    authorAvatar: 'https://randomuser.me/api/portraits/women/85.jpg',
    priority: 'medium',
    category: 'Administrative',
    isRead: true
  }
];

// Mock User Data
export const userData: UserType = {
  id: 'u001',
  name: 'Dr. Jane Smith',
  email: 'jane.smith@academia.edu',
  role: 'Associate Professor',
  avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
  department: 'Computer Science',
  joinDate: '2018-05-15',
  publications: 37,
  followers: 285,
  following: 142
};

// Mock subjects/categories for filtering
export const subjects = [
  'Computer Science',
  'Healthcare',
  'Environmental Science',
  'Neuroscience',
  'Energy Science',
  'Linguistics',
  'Economics',
  'Biology',
  'Physics',
  'Mathematics',
  'Psychology',
  'Sociology',
  'Literature',
  'History',
  'Engineering'
];

export const forumCategories = [
  'Education',
  'Research Methods',
  'Teaching',
  'Publishing',
  'Research Ethics',
  'Announcements',
  'General Discussion',
  'Career Development',
  'Technology',
  'Networking'
];

export const announcementCategories = [
  'Administrative',
  'Events',
  'Resources',
  'Technical',
  'Programs',
  'Academic',
  'Deadlines',
  'Policies',
  'Awards',
  'Opportunities'
];