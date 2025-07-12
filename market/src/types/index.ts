// Core Entity Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "vendor" | "admin";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  label: string; // e.g., "Home", "Office"
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  businessNameHa: string;
  description: string;
  descriptionHa: string;
  logo?: string;
  bannerImage?: string;
  businessAddress: Address;
  businessPhone: string;
  businessEmail: string;
  status: "pending" | "approved" | "suspended" | "rejected";
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  categories: string[];
  bankAccount?: BankAccount;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccount {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  nameHa: string;
  value: string;
  valueHa: string;
  priceAdjustment: number; // Can be positive or negative
  stock: number;
  sku?: string;
  images?: string[];
}

export interface Product {
  id: string;
  vendorId: string;
  vendor?: Vendor;
  name: string;
  nameHa: string;
  description: string;
  descriptionHa: string;
  category: string;
  categoryHa: string;
  subcategory?: string;
  subcategoryHa?: string;
  basePrice: number;
  currency: string;
  images: string[];
  variants: ProductVariant[];
  features: string[];
  featuresHa: string[];
  materials: string[];
  materialsHa: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  status: "draft" | "active" | "inactive" | "out_of_stock";
  rating: number;
  totalReviews: number;
  totalSales: number;
  isHandmade: boolean;
  isFeatured: boolean;
  tags: string[];
  tagsHa: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  priceAtTime: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  priceAtTime: number;
  vendorId: string;
  vendor: Vendor;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user: User;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: "cash_on_delivery" | "bank_transfer" | "card" | "mobile_money";
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  courierName?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  orderId: string;
  vendorId: string;
  rating: number;
  title: string;
  titleHa: string;
  comment: string;
  commentHa: string;
  images?: string[];
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  lastMessage?: Message;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
}

export interface VendorFinance {
  vendorId: string;
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  totalSales: number;
  platformFeeRate: number;
  currency: string;
  lastPayoutDate?: string;
  nextPayoutDate: string;
}

export interface Payout {
  id: string;
  vendorId: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed";
  bankAccount: BankAccount;
  processedAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type:
    | "order_update"
    | "low_stock"
    | "new_review"
    | "payout"
    | "message"
    | "system";
  title: string;
  titleHa: string;
  message: string;
  messageHa: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  location?: string;
  isHandmade?: boolean;
  sortBy?: "newest" | "price_low" | "price_high" | "rating" | "popular";
  page?: number;
  limit?: number;
}

export interface SearchResults<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  facets?: {
    categories: { name: string; count: number }[];
    priceRanges: { min: number; max: number; count: number }[];
    ratings: { rating: number; count: number }[];
  };
}

export interface ApiResponse<T> {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  status: "error";
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: "user" | "vendor";
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Component Props Types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  labelHa: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "file";
  required?: boolean;
  placeholder?: string;
  placeholderHa?: string;
  options?: { value: string; label: string; labelHa: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
}

// Dashboard Metrics
export interface VendorMetrics {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  activeProducts: number;
  pendingOrders: number;
  lowStockProducts: number;
  monthlyRevenue: { month: string; revenue: number }[];
  topProducts: { product: Product; sales: number }[];
}

export interface AdminMetrics {
  totalUsers: number;
  totalVendors: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingVendors: number;
  activeDisputes: number;
  monthlyGrowth: {
    month: string;
    users: number;
    vendors: number;
    revenue: number;
  }[];
}
