export type ProductCondition = 'Like New' | 'Good' | 'Fair' | 'Needs Repair';

export type ProductCategory =
  | 'Textbooks and Academic Books'
  | 'Electronics'
  | 'Stationery'
  | 'Lab Equipment'
  | 'Hostel Essentials'
  | 'Sports Equipment'
  | 'Clothing and Accessories'
  | 'Furniture'
  | 'Miscellaneous';

export interface Student {
  id: string;
  name: string;
  college: string;
  department: string;
  academicYear: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  joinedDate: string;
  completedSales: number;
  isCurrentUser?: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  price: number; // in INR ₹
  originalPrice?: number;
  discountPercentage?: number;
  condition: ProductCondition;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  college: string;
  dateListed: string;
  isSold?: boolean;
  isUserListing?: boolean;
  views?: number;
  likesCount?: number;
  pickupSpot?: string;
}

export interface ExchangeListing {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  condition: ProductCondition;
  images: string[];
  wantedItems: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  college: string;
  dateListed: string;
  isCompleted?: boolean;
  isUserListing?: boolean;
}

export interface ExchangeRequest {
  id: string;
  exchangeId: string;
  exchangeTitle: string;
  senderId: string;
  senderName: string;
  senderCollege: string;
  offeredItemTitle: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  timestamp: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Order Placed' | 'Awaiting Confirmation' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  pickupLocation: string;
  pickupSlot: string;
  status: OrderStatus;
  orderDate: string;
  buyerName: string;
  isDemoOrder: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isFromMe: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantCollege: string;
  productId?: string;
  productTitle?: string;
  productPrice?: number;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

export interface Offer {
  id: string;
  productId: string;
  productTitle: string;
  originalPrice: number;
  offeredPrice: number;
  message: string;
  status: 'Submitted' | 'Accepted' | 'Countered' | 'Declined';
  date: string;
}
