export interface Artisan {
  id: string;
  name: string;
  bio: string;
  location: string;
  image: string;
  specialty: string;
  since: number;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: ProductCategory;
  artisan: Artisan;
  artisanId: string;
  inStock: boolean;
  isHalal: boolean;
  isSustainable: boolean;
  isSameDay: boolean;
  tags: string[];
  story: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export type ProductCategory = 
  | 'jewelry'
  | 'home'
  | 'food'
  | 'wellness'
  | 'art'
  | 'candles'
  | 'accessories';

export interface CartItem {
  product: Product;
  quantity: number;
  videoMessage?: VideoMessage;
  singingTelegram?: SingingTelegram;
}

export interface VideoMessage {
  file?: File;
  url?: string;
  message: string;
}

export interface SingingTelegram {
  enabled: boolean;
  song: 'birthday' | 'toronto-anthem' | 'love-song' | 'custom';
  customMessage?: string;
  price: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: OrderStatus;
  customer: CustomerInfo;
  createdAt: string;
  estimatedDelivery: string;
  tracking: TrackingEvent[];
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out-for-delivery'
  | 'delivered';

export interface TrackingEvent {
  status: OrderStatus;
  timestamp: string;
  description: string;
  location?: { lat: number; lng: number };
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface CorporateRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  products: string[];
  quantity: number;
  budget: string;
  deadline: string;
  branding: boolean;
  logoUrl?: string;
  message: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  artisan: Artisan;
  publishedAt: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  product?: string;
}

export interface FilterState {
  category: ProductCategory | 'all';
  priceRange: [number, number];
  artisan: string | 'all';
  isHalal: boolean;
  isSustainable: boolean;
  isSameDay: boolean;
  sortBy: 'best-match' | 'price-low' | 'price-high' | 'newest';
}

export interface QuizAnswer {
  recipient: string;
  occasion: string;
  budget: string;
  interests: string[];
}
