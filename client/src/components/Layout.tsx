import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/store";
import { Search, ShoppingCart, User, Star } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <header className="bg-gradient-to-r from-black to-zinc-900 border-b-2 border-primary relative z-10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <Link href="/" className="text-3xl font-bold text-primary tracking-[2px] hover:text-primary/90 transition-colors uppercase font-serif">
                Amakha
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link href="/auth" className="bg-gradient-to-br from-primary to-orange-400 text-black px-5 py-2 rounded font-bold text-sm hover:scale-105 transition-transform">
                  Login / Register
              </Link>
              <Link href="/admin" className="relative bg-gradient-to-br from-primary to-orange-400 text-black px-6 py-2 rounded font-bold text-sm hover:scale-105 transition-transform overflow-hidden group">
                  <span className="absolute top-1 left-2 text-white text-xs animate-pulse">★</span>
                  <span className="absolute top-1 right-2 text-white text-xs animate-pulse delay-75">★</span>
                  Admin Panel
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-zinc-900 border-b border-primary/30">
          <div className="container mx-auto px-4">
            <ul className="flex flex-wrap justify-center md:justify-start gap-6 py-4">
              <li>
                <Link href="/" className={`text-primary font-medium px-3 py-2 rounded transition-all hover:bg-primary hover:text-black ${isActive('/') ? 'bg-primary text-black' : ''}`}>
                    Home
                </Link>
              </li>
              <li>
                <Link href="/category/perfume" className={`text-primary font-medium px-3 py-2 rounded transition-all hover:bg-primary hover:text-black ${isActive('/category/perfume') ? 'bg-primary text-black' : ''}`}>
                    Car Perfumes
                </Link>
              </li>
              <li>
                <Link href="/category/cologne" className={`text-primary font-medium px-3 py-2 rounded transition-all hover:bg-primary hover:text-black ${isActive('/category/cologne') ? 'bg-primary text-black' : ''}`}>
                    Colognes
                </Link>
              </li>
              <li>
                <Link href="/category/clothing" className={`text-primary font-medium px-3 py-2 rounded transition-all hover:bg-primary hover:text-black ${isActive('/category/clothing') ? 'bg-primary text-black' : ''}`}>
                    Clothing
                </Link>
              </li>
              <li>
                <Link href="/cart" className={`text-primary font-medium px-3 py-2 rounded transition-all hover:bg-primary hover:text-black flex items-center gap-2 ${isActive('/cart') ? 'bg-primary text-black' : ''}`}>
                    Shopping Cart
                    {cartCount > 0 && (
                      <span className="bg-primary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center -mt-1">
                        {cartCount}
                      </span>
                    )}
                </Link>
              </li>
              <li>
                <Link href="/track-order" className={`text-primary font-medium px-3 py-2 rounded transition-all hover:bg-primary hover:text-black ${isActive('/track-order') ? 'bg-primary text-black' : ''}`}>
                    Track Order
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-zinc-900 border-t-2 border-primary py-8 mt-12 text-center text-primary/60">
        <div className="container mx-auto px-4">
          <p className="mb-4">&copy; {new Date().getFullYear()} Amakha Store. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
