export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
}

export interface FilterOptions {
  searchQuery: string;
  priceRange: [number, number];
  eras: string[];
  conditions: string[];
  sizes: string[];
  materials: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  era: '50s' | '60s' | '70s' | '80s' | '90s';
  condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair';
  sizes: Size[];
  measurements: Measurements;
  material: string;
  provenance?: string;
  inStock: boolean;
}

export interface Size {
  name: string;
  available: boolean;
  quantity: number;
}

export interface Measurements {
  bust?: string;
  waist?: string;
  hips?: string;
  length?: string;
  shoulders?: string;
  sleeves?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface ShippingInfo {
  estimatedDelivery: string;
  methods: ShippingMethod[];
  returns: string;
}

export interface ShippingMethod {
  name: string;
  price: number;
  estimatedDays: number;
}

export interface ProductSpecs {
  material: string;
  designer?: string;
  madeIn?: string;
  care: string[];
  features: string[];
}