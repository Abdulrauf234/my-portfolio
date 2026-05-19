export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link?: string | null;
  featured: boolean;
  order: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount?: string | null;
  code?: string | null;
  imageUrl?: string | null;
  active: boolean;
  link?: string | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Vertex E-Commerce Platform",
    description: "A premium, ultra-fast headless Shopify e-commerce platform built with Next.js, featuring real-time custom product personalization and smooth micro-interactions.",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/Abdulrauf234",
    featured: true,
    order: 1,
  },
  {
    id: "2",
    title: "Aether Brand Identity Film",
    description: "A high-concept brand reveal video combining 3D product rendering, immersive sound design, and sleek cinematic editing to boost customer engagement.",
    category: "Video Editing",
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/Abdulrauf234",
    featured: true,
    order: 2,
  },
  {
    id: "3",
    title: "Neon Odyssey UI/UX System",
    description: "A futuristic cyberpunk-inspired UI/UX layout and visual guidelines designed for an elite mobile gaming platform, achieving a 45% uplift in user retention.",
    category: "Graphics Design",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/Abdulrauf234",
    featured: true,
    order: 3,
  },
  {
    id: "4",
    title: "Lumina SaaS Landing Hub",
    description: "High-converting premium website for an AI productivity tool. Minimalist dark layout, rich glassmorphism elements, and fully fluid animations.",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/Abdulrauf234",
    featured: false,
    order: 4,
  },
  {
    id: "5",
    title: "Apex Esports Promo Film",
    description: "High-octane commercial video editing containing heavy visual effects, custom title animations, and dynamic audio synchronizations.",
    category: "Video Editing",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/Abdulrauf234",
    featured: false,
    order: 5,
  },
  {
    id: "6",
    title: "Hyperion Corporate Identity Set",
    description: "A cohesive premium design set including bespoke modern logos, social media templates, and business brand collaterals for a web design agency.",
    category: "Graphics Design",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/Abdulrauf234",
    featured: false,
    order: 6,
  },
];

const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: "p1",
    title: "Brand Identity Launch Special",
    description: "Get a comprehensive corporate graphics and responsive landing page layout package. Limited to first 5 bookings.",
    discount: "25% OFF",
    code: "BRANDELITE25",
    active: true,
    link: "/contact",
  },
  {
    id: "p2",
    title: "Elite Short-Form Conversion Promo",
    description: "Submit a full-length YouTube video editing order and receive 2 highly engaging TikTok/Reels crop cuts absolutely free.",
    discount: "FREE BONUSES",
    code: "DYNAMICSHORTS",
    active: true,
    link: "/contact",
  },
];

const KEYS = {
  PROJECTS: "portfolio_projects",
  PROMOTIONS: "portfolio_promotions",
  MESSAGES: "portfolio_messages",
};

const isBrowser = typeof window !== "undefined";

function safeGet(key: string, defaultValue: string): string {
  if (!isBrowser) return defaultValue;
  try {
    const val = localStorage.getItem(key);
    if (val === null) {
      localStorage.setItem(key, defaultValue);
      return defaultValue;
    }
    return val;
  } catch (e) {
    console.error(`localStorage get failed for key "${key}":`, e);
    return defaultValue;
  }
}

function safeSet(key: string, value: string): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(`localStorage set failed for key "${key}":`, e);
  }
}

export function getProjects(): Project[] {
  const data = safeGet(KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse projects from storage", e);
    return INITIAL_PROJECTS;
  }
}

export function addProject(project: Omit<Project, "id" | "order">): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: projects.length + 1,
  };
  projects.push(newProject);
  safeSet(KEYS.PROJECTS, JSON.stringify(projects));
  return newProject;
}

export function getPromotions(): Promotion[] {
  const data = safeGet(KEYS.PROMOTIONS, JSON.stringify(INITIAL_PROMOTIONS));
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse promotions from storage", e);
    return INITIAL_PROMOTIONS;
  }
}

export function addPromotion(promotion: Omit<Promotion, "id">): Promotion {
  const promotions = getPromotions();
  const newPromo: Promotion = {
    ...promotion,
    id: `promo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  promotions.push(newPromo);
  safeSet(KEYS.PROMOTIONS, JSON.stringify(promotions));
  return newPromo;
}

export function getContactMessages(): ContactMessage[] {
  const data = safeGet(KEYS.MESSAGES, JSON.stringify([]));
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse contact messages from storage", e);
    return [];
  }
}

export function addContactMessage(message: Omit<ContactMessage, "id" | "status" | "createdAt">): ContactMessage {
  const messages = getContactMessages();
  const newMsg: ContactMessage = {
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  messages.unshift(newMsg); // Newest messages first
  safeSet(KEYS.MESSAGES, JSON.stringify(messages));
  return newMsg;
}
