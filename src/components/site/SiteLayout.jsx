import { Outlet } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import CartSheet from '@/components/site/CartSheet';
import BackToTop from '@/components/site/BackToTop';
import { CartProvider } from '@/context/CartContext';

export default function SiteLayout() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartSheet />
        <BackToTop />
      </div>
    </CartProvider>
  );
}