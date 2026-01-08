import { Layout } from "@/components/Layout";
import { useProducts } from "@/lib/productStore";
import { useCart } from "@/lib/store";
import { useRoute, Link } from "wouter";
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const [match, params] = useRoute("/product/:id");
  const id = params ? parseInt(params.id) : 0;
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  
  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl text-primary mb-4">Product not found</h2>
          <Link href="/" className="text-white hover:underline">Return Home</Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    for(let i=0; i<quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to cart",
      description: `${product.name} (x${quantity}) has been added to your cart.`,
      className: "bg-green-900 border-primary text-primary"
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shopping
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-zinc-900 border-2 border-primary/50 rounded-xl overflow-hidden p-2">
            <img src={product.image_url} alt={product.name} className="w-full h-auto rounded-lg object-cover aspect-square" />
          </div>

          <div>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">{product.category}</span>
            <h1 className="text-4xl font-serif text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.round(product.rating) ? "currentColor" : "none"} className={i < Math.round(product.rating) ? "text-primary" : "text-zinc-600"} />
                ))}
              </div>
              <span className="text-zinc-400">({product.review_count} Reviews)</span>
            </div>

            <div className="text-4xl font-bold text-primary mb-8 font-serif">R{product.price.toFixed(2)}</div>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8 border-b border-zinc-800 pb-8">{product.description}</p>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-zinc-700 rounded bg-black">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-white hover:text-primary transition-colors">-</button>
                <span className="px-4 py-3 text-white font-bold w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-3 text-white hover:text-primary transition-colors">+</button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-gradient-to-br from-primary to-orange-400 text-black py-3 px-8 rounded font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-zinc-400"><Truck className="text-primary" /><span>Fast Delivery</span></div>
              <div className="flex items-center gap-3 text-zinc-400"><ShieldCheck className="text-primary" /><span>Authentic Product</span></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
