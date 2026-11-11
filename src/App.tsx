import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { ExchangePage } from './pages/ExchangePage';
import { SellPage } from './pages/SellPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { MessagesPage } from './pages/MessagesPage';
import { DashboardPage } from './pages/DashboardPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SellerProfilePage } from './pages/SellerProfilePage';
import { ShieldCheck, RotateCcw } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, currentUser, resetDemoData } = useApp();

  const renderView = () => {
    switch (activeView) {
      case 'landing':
        return <LandingPage />;
      case 'explore':
        return <ExplorePage />;
      case 'exchange':
        return <ExchangePage />;
      case 'sell':
        return <SellPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <CartPage />;
      case 'my-listings':
        return <MyListingsPage />;
      case 'my-orders':
        return <MyOrdersPage />;
      case 'messages':
        return <MessagesPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'sustainability':
        return <SustainabilityPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'seller-profile':
        return <SellerProfilePage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Demo Bar */}
      <aside aria-label="Demo environment notice" className="bg-emerald-950 text-emerald-200 text-[11px] py-1.5 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="truncate">
              <strong>College Hackathon Demo:</strong> Signed in as <strong>{currentUser.name}</strong> ({currentUser.college})
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-white transition-colors"
              title="Reset sample listings, orders & chats"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Top Navigation */}
      <Navbar />

      {/* Dynamic View Container */}
      <main className="flex-1">{renderView()}</main>

      {/* Footer */}
      <Footer />

      {/* Interactive Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
