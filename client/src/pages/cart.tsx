import { Layout } from "@/components/Layout";
import { useCart } from "@/lib/store";
import { Link } from "wouter";
import { Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully (Mockup).",
        className: "bg-green-900 border-primary text-primary"
    });
    setTimeout(() => {
        clearCart();
        setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="bg-zinc-900 border-2 border-primary rounded-xl p-16 text-center shadow-lg max-w-2xl mx-auto mt-10">
            <ShoppingBag className="w-24 h-24 text-zinc-700 mx-auto mb-6" />
            <h2 className="text-3xl font-serif text-primary mb-4">Your cart is empty</h2>
            <p className="text-zinc-400 mb-8 text-lg">Start shopping to add items to your cart</p>
            <Link href="/" className="inline-block bg-gradient-to-br from-primary to-orange-400 text-black text-lg font-bold px-8 py-3 rounded hover:scale-105 transition-transform">
                Continue Shopping
            </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-3xl font-serif text-primary text-center mb-10">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
            <div className="bg-zinc-900 border-2 border-primary rounded-xl overflow-hidden">
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b border-zinc-800 last:border-0 hover:bg-white/5 transition-colors">
                        <img 
                            src={item.image_url} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover rounded bg-black border border-white/10"
                        />
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg font-medium text-primary mb-1">{item.name}</h3>
                            <p className="text-zinc-400 text-sm">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-primary rounded bg-black">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-3 py-1 text-primary hover:bg-primary hover:text-black transition-colors"
                                >-</button>
                                <span className="px-3 py-1 text-white min-w-[40px] text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-3 py-1 text-primary hover:bg-primary hover:text-black transition-colors"
                                >+</button>
                            </div>
                            <div className="text-xl font-bold text-primary w-24 text-right">
                                R{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-full transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Summary & Checkout */}
        <div className="lg:col-span-1">
            <div className="bg-zinc-900 border-2 border-primary rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-serif text-primary mb-6 pb-4 border-b border-zinc-800">Order Summary</h3>
                
                <div className="flex justify-between items-center mb-4 text-zinc-300">
                    <span>Subtotal</span>
                    <span>R{total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-zinc-300">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                
                <div className="flex justify-between items-center mb-8 text-2xl font-bold text-primary pt-4 border-t border-zinc-800">
                    <span>Total</span>
                    <span>R{total().toFixed(2)}</span>
                </div>

                {!isCheckingOut ? (
                    <button 
                        onClick={() => setIsCheckingOut(true)}
                        className="w-full bg-gradient-to-br from-primary to-orange-400 text-black py-3 rounded font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    >
                        Proceed to Checkout
                    </button>
                ) : (
                    <form onSubmit={handleCheckout} className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div>
                            <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Full Name</label>
                            <input required type="text" className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-2 text-white outline-none transition-colors" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Email</label>
                            <input required type="email" className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-2 text-white outline-none transition-colors" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Address</label>
                            <textarea required className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-2 text-white outline-none transition-colors min-h-[80px]" placeholder="123 Main St..." />
                        </div>
                        
                        <div className="pt-2 gap-3 flex flex-col">
                             <button 
                                type="submit"
                                className="w-full bg-gradient-to-br from-primary to-orange-400 text-black py-3 rounded font-bold hover:scale-[1.02] transition-transform"
                            >
                                Confirm Order
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsCheckingOut(false)}
                                className="w-full bg-transparent border border-zinc-700 text-zinc-400 py-2 rounded hover:text-white hover:border-white transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
      </div>
    </Layout>
  );
}
