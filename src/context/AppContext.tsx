import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Student,
  Product,
  ExchangeListing,
  ExchangeRequest,
  CartItem,
  Order,
  Conversation,
  Message,
  Offer,
  ProductCategory,
} from '../types';
import {
  CURRENT_USER,
  MOCK_STUDENTS,
  MOCK_PRODUCTS,
  MOCK_EXCHANGES,
  MOCK_ORDERS,
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES,
  INITIAL_WISHLIST_IDS,
  INITIAL_CART,
} from '../data/mockData';

export type ViewType =
  | 'landing'
  | 'explore'
  | 'exchange'
  | 'sell'
  | 'wishlist'
  | 'cart'
  | 'my-listings'
  | 'my-orders'
  | 'messages'
  | 'dashboard'
  | 'sustainability'
  | 'product-detail'
  | 'seller-profile';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // State
  currentUser: Student;
  updateCurrentUser: (data: Partial<Student>) => void;
  selectedCampus: string;
  setSelectedCampus: (campus: string) => void;
  products: Product[];
  exchangeListings: ExchangeListing[];
  wishlist: string[];
  cart: CartItem[];
  orders: Order[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  exchangeRequests: ExchangeRequest[];
  offers: Offer[];
  
  // Navigation
  activeView: ViewType;
  selectedProductId: string | null;
  selectedSellerId: string | null;
  selectedConversationId: string | null;
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  navigate: (view: ViewType, payload?: { productId?: string; sellerId?: string; conversationId?: string }) => void;
  
  // Actions
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (pickupLocation: string, pickupSlot: string) => { success: boolean; orderId?: string };
  
  // Listing Management
  createProduct: (productData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'dateListed'>) => void;
  updateProduct: (id: string, productData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleMarkSold: (id: string) => void;
  
  // Exchange Management
  createExchange: (data: Omit<ExchangeListing, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'dateListed'>) => void;
  deleteExchange: (id: string) => void;
  requestExchange: (exchangeId: string, offeredItemTitle: string, message: string) => void;
  
  // Offers & Messaging
  makeOffer: (productId: string, offeredPrice: number, messageText: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startChatWithSeller: (sellerId: string, productId?: string) => void;
  
  // Utilities
  students: Student[];
  getStudentById: (id: string) => Student | undefined;
  getProductById: (id: string) => Product | undefined;
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'recampus_user_v2',
  CAMPUS: 'recampus_campus_v2',
  PRODUCTS: 'recampus_products_v2',
  EXCHANGES: 'recampus_exchanges_v2',
  WISHLIST: 'recampus_wishlist_v2',
  CART: 'recampus_cart_v2',
  ORDERS: 'recampus_orders_v2',
  CONVERSATIONS: 'recampus_conversations_v2',
  MESSAGES: 'recampus_messages_v2',
  REQUESTS: 'recampus_requests_v2',
  OFFERS: 'recampus_offers_v2',
};

const normalizeImagePath = (path: string) => {
  if (path.includes('hero_campus_marketplace')) return '/images/hero_campus_marketplace.jpg';
  if (path.includes('student_textbooks_calculators')) return '/images/student_textbooks_calculators.jpg';
  if (path.includes('campus_tech_electronics')) return '/images/campus_tech_electronics.jpg';
  if (path.includes('student_exchange_handshake')) return '/images/student_exchange_handshake.jpg';
  return path;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Student Profile
  const [currentUser, setCurrentUser] = useState<Student>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : CURRENT_USER;
    } catch {
      return CURRENT_USER;
    }
  });

  const [selectedCampus, setSelectedCampus] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CAMPUS) || 'All Campuses';
    } catch {
      return 'All Campuses';
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map((p) => ({
          ...p,
          images: p.images.map(normalizeImagePath),
        }));
      }
      return MOCK_PRODUCTS;
    } catch {
      return MOCK_PRODUCTS;
    }
  });

  // Exchanges
  const [exchangeListings, setExchangeListings] = useState<ExchangeListing[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXCHANGES);
      if (saved) {
        const parsed: ExchangeListing[] = JSON.parse(saved);
        return parsed.map((e) => ({
          ...e,
          images: e.images.map(normalizeImagePath),
        }));
      }
      return MOCK_EXCHANGES;
    } catch {
      return MOCK_EXCHANGES;
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : INITIAL_WISHLIST_IDS;
    } catch {
      return INITIAL_WISHLIST_IDS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
      // fallback to initial sample cart items
      return INITIAL_CART.map((item) => {
        const prod = MOCK_PRODUCTS.find((p) => p.id === item.productId);
        return prod ? { product: prod, quantity: item.quantity } : null;
      }).filter(Boolean) as CartItem[];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : MOCK_ORDERS;
    } catch {
      return MOCK_ORDERS;
    }
  });

  // Conversations & Messages
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      return saved ? JSON.parse(saved) : MOCK_CONVERSATIONS;
    } catch {
      return MOCK_CONVERSATIONS;
    }
  });

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : MOCK_MESSAGES;
    } catch {
      return MOCK_MESSAGES;
    }
  });

  // Exchange Requests
  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Offers
  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation State
  const [activeView, setActiveView] = useState<ViewType>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      localStorage.setItem(STORAGE_KEYS.CAMPUS, selectedCampus);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.EXCHANGES, JSON.stringify(exchangeListings));
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(exchangeRequests));
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [
    currentUser,
    selectedCampus,
    products,
    exchangeListings,
    wishlist,
    cart,
    orders,
    conversations,
    messages,
    exchangeRequests,
    offers,
  ]);

  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (
    view: ViewType,
    payload?: { productId?: string; sellerId?: string; conversationId?: string }
  ) => {
    if (payload?.productId) setSelectedProductId(payload.productId);
    if (payload?.sellerId) setSelectedSellerId(payload.sellerId);
    if (payload?.conversationId) setSelectedConversationId(payload.conversationId);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCurrentUser = (data: Partial<Student>) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
    showToast('Profile updated', 'Your student information has been saved.');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item removed from your saved list.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Wishlist', 'Item saved to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('Added to Cart', `${product.title.slice(0, 32)}... added to your cart.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Removed from Cart', 'Item removed from your demo bag.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = (pickupLocation: string, pickupSlot: string) => {
    if (cart.length === 0) return { success: false };

    const totalAmount = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      totalAmount,
      pickupLocation,
      pickupSlot,
      status: 'Order Placed',
      orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      buyerName: currentUser.name,
      isDemoOrder: true,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1b4332', '#2d6a4f', '#52b788', '#d8f3dc'],
      });
    } catch {
      // ignore
    }

    showToast('Demo Order Placed!', `Pickup scheduled at ${pickupLocation}. No payment processed.`);
    return { success: true, orderId };
  };

  // Product listing creation
  const createProduct = (
    productData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'dateListed'>
  ) => {
    const newId = 'prod-user-' + Date.now();
    const discount =
      productData.originalPrice && productData.originalPrice > productData.price
        ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
        : undefined;

    const newProduct: Product = {
      ...productData,
      id: newId,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerAvatar: currentUser.avatar,
      dateListed: 'Just now',
      discountPercentage: discount,
      isUserListing: true,
      views: 1,
      likesCount: 0,
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast('Listing Published!', 'Your item is now live in the campus marketplace.');
    navigate('my-listings');
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...productData };
          if (updated.originalPrice && updated.originalPrice > updated.price) {
            updated.discountPercentage = Math.round(
              ((updated.originalPrice - updated.price) / updated.originalPrice) * 100
            );
          }
          return updated;
        }
        return p;
      })
    );
    showToast('Listing Updated', 'Your changes have been saved.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setWishlist((prev) => prev.filter((pId) => pId !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    showToast('Listing Deleted', 'Your listing was removed.', 'info');
  };

  const toggleMarkSold = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSold: !p.isSold } : p))
    );
    showToast('Listing Status Changed', 'Item status updated.');
  };

  // Exchange Management
  const createExchange = (
    data: Omit<ExchangeListing, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'dateListed'>
  ) => {
    const newId = 'exch-user-' + Date.now();
    const newListing: ExchangeListing = {
      ...data,
      id: newId,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerAvatar: currentUser.avatar,
      dateListed: 'Just now',
      isUserListing: true,
    };

    setExchangeListings((prev) => [newListing, ...prev]);
    showToast('Exchange Listed!', 'Your swap proposal is now visible to students.');
    navigate('exchange');
  };

  const deleteExchange = (id: string) => {
    setExchangeListings((prev) => prev.filter((e) => e.id !== id));
    showToast('Exchange Removed', 'Swap listing removed.', 'info');
  };

  const requestExchange = (
    exchangeId: string,
    offeredItemTitle: string,
    message: string
  ) => {
    const exchange = exchangeListings.find((e) => e.id === exchangeId);
    if (!exchange) return;

    const newRequest: ExchangeRequest = {
      id: 'req-' + Date.now(),
      exchangeId,
      exchangeTitle: exchange.title,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderCollege: currentUser.college,
      offeredItemTitle,
      message,
      status: 'Pending',
      timestamp: 'Just now',
    };

    setExchangeRequests((prev) => [newRequest, ...prev]);

    // Also auto-start or update conversation
    startChatWithSeller(exchange.sellerId);
    showToast(
      'Exchange Request Sent!',
      `You proposed "${offeredItemTitle}" to ${exchange.sellerName}.`
    );
  };

  const makeOffer = (productId: string, offeredPrice: number, messageText: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const newOffer: Offer = {
      id: 'off-' + Date.now(),
      productId,
      productTitle: product.title,
      originalPrice: product.price,
      offeredPrice,
      message: messageText,
      status: 'Submitted',
      date: 'Today',
    };

    setOffers((prev) => [newOffer, ...prev]);

    // Send as message in chat with seller
    startChatWithSeller(product.sellerId, product.id);

    showToast(
      'Offer Submitted!',
      `You made an offer of ₹${offeredPrice} for "${product.title.slice(0, 24)}...".`
    );
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: 'msg-' + Date.now(),
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFromMe: true,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text.trim(),
              lastTimestamp: 'Just now',
            }
          : c
      )
    );

    // Realistic auto-reply simulation from campus seller after 1.5 seconds!
    setTimeout(() => {
      const conv = conversations.find((c) => c.id === conversationId);
      const sellerName = conv ? conv.participantName.split(' ')[0] : 'Seller';
      const autoReplies = [
        `Sounds great! I can meet you tomorrow around 3:30 PM outside the student library. Does that work?`,
        `Thanks for reaching out! The item is in top shape as listed. Happy to demonstrate it on campus.`,
        `Deal! Let's meet at the North Quad canteen. I'll bring the original case/box too.`,
        `Sure, I can do that price. Are you free this afternoon between classes?`,
      ];
      const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

      const sellerMsg: Message = {
        id: 'msg-reply-' + Date.now(),
        conversationId,
        senderId: conv?.participantId || 'seller',
        senderName: conv?.participantName || 'Seller',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFromMe: false,
      };

      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), sellerMsg],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: randomReply,
                lastTimestamp: 'Just now',
                unreadCount: 1,
              }
            : c
        )
      );
    }, 1400);
  };

  const startChatWithSeller = (sellerId: string, productId?: string) => {
    const student = MOCK_STUDENTS.find((s) => s.id === sellerId);
    if (!student) return;

    let existingConv = conversations.find((c) => c.participantId === sellerId);
    const product = productId ? products.find((p) => p.id === productId) : undefined;

    if (!existingConv) {
      const newConvId = 'conv-' + Date.now();
      existingConv = {
        id: newConvId,
        participantId: student.id,
        participantName: student.name,
        participantAvatar: student.avatar,
        participantCollege: student.college,
        productId: product?.id,
        productTitle: product?.title,
        productPrice: product?.price,
        lastMessage: product ? `Inquired about ${product.title}` : 'Started conversation',
        lastTimestamp: 'Just now',
        unreadCount: 0,
      };

      setConversations((prev) => [existingConv!, ...prev]);
      setMessages((prev) => ({
        ...prev,
        [newConvId]: [
          {
            id: 'init-' + Date.now(),
            conversationId: newConvId,
            senderId: currentUser.id,
            senderName: currentUser.name,
            text: product
              ? `Hi ${student.name.split(' ')[0]}! I'm interested in "${product.title}". Is it still available on campus?`
              : `Hi ${student.name.split(' ')[0]}! I saw your campus listings and would love to connect.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isFromMe: true,
          },
        ],
      }));
    }

    setSelectedConversationId(existingConv.id);
    setActiveView('messages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStudentById = (id: string) => MOCK_STUDENTS.find((s) => s.id === id);
  const getProductById = (id: string) => products.find((p) => p.id === id);

  const resetDemoData = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    setCurrentUser(CURRENT_USER);
    setSelectedCampus('All Campuses');
    setProducts(MOCK_PRODUCTS);
    setExchangeListings(MOCK_EXCHANGES);
    setWishlist(INITIAL_WISHLIST_IDS);
    setCart(
      INITIAL_CART.map((item) => {
        const prod = MOCK_PRODUCTS.find((p) => p.id === item.productId);
        return prod ? { product: prod, quantity: item.quantity } : null;
      }).filter(Boolean) as CartItem[]
    );
    setOrders(MOCK_ORDERS);
    setConversations(MOCK_CONVERSATIONS);
    setMessages(MOCK_MESSAGES);
    setExchangeRequests([]);
    setOffers([]);
    setActiveView('landing');
    setSelectedProductId(null);
    setSelectedSellerId(null);
    setSelectedConversationId(null);
    setSearchQuery('');
    setSelectedCategory('All');
    showToast('Demo Data Restored', 'All sample listings, exchanges and orders reset.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        selectedCampus,
        setSelectedCampus,
        products,
        exchangeListings,
        wishlist,
        cart,
        orders,
        conversations,
        messages,
        exchangeRequests,
        offers,
        activeView,
        selectedProductId,
        selectedSellerId,
        selectedConversationId,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        navigate,
        toggleWishlist,
        isWishlisted,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        createProduct,
        updateProduct,
        deleteProduct,
        toggleMarkSold,
        createExchange,
        deleteExchange,
        requestExchange,
        makeOffer,
        sendMessage,
        startChatWithSeller,
        students: MOCK_STUDENTS,
        getStudentById,
        getProductById,
        toasts,
        showToast,
        removeToast,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
