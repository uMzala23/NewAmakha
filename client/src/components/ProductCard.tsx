import { Product } from "@/data/products";
import { useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    for(let i=0; i<quantity; i++) {
        addItem(product);
    }
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
      className: "bg-green-900 border-primary text-primary"
    });
  };

  return (
    <div className="bg-zinc-900 border-2 border-primary rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,215,0,0.2)] group flex flex-col h-full">
      <Link href={`/product/${product.id}`}>
        <div className="bg-black rounded-lg mb-4 overflow-hidden aspect-square border border-white/5 relative cursor-pointer">
            <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </div>
      </Link>
      
      <div className="flex flex-col flex-1">
        {product.review_count > 0 && (
            <div className="flex justify-center items-center gap-1 mb-2 text-primary">
            {[...Array(5)].map((_, i) => (
                <Star 
                key={i} 
                size={16} 
                fill={i < Math.round(product.rating) ? "currentColor" : "none"} 
                className={i < Math.round(product.rating) ? "text-primary" : "text-zinc-600"}
                />
            ))}
            <span className="text-zinc-400 text-xs ml-1">({product.review_count})</span>
            </div>
        )}

        <Link href={`/product/${product.id}`} className="text-xl font-medium mb-2 text-primary/90 group-hover:text-primary transition-colors cursor-pointer line-clamp-2 block">
            {product.name}
        </Link>
        
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-1">
            {product.description}
        </p>

        <div className="text-2xl font-bold text-primary mb-4 font-serif">
            R{product.price.toFixed(2)}
        </div>

        <form onSubmit={handleAddToCart} className="flex gap-2 justify-center items-center mt-auto">
            <input 
            type="number" 
            min="1" 
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-16 p-2 bg-black border border-primary text-primary rounded text-center focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button 
            type="submit"
            className="bg-gradient-to-br from-primary to-orange-400 text-black px-6 py-2 rounded font-bold hover:scale-105 transition-transform active:scale-95"
            >
            Add to Cart
            </button>
        </form>

        <Link href={`/product/${product.id}`} className="block mt-3 text-sm text-primary hover:underline opacity-80 hover:opacity-100">
            {product.review_count > 0 ? 'View Reviews' : 'Be the first to review'}
        </Link>
      </div>
    </div>
  );
}
