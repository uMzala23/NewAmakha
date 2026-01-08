import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/lib/productStore";
import { Link } from "wouter";

export default function Home() {
  const { products } = useProducts();

  return (
    <Layout>
      <section className="bg-gradient-to-br from-zinc-900 to-black border-2 border-primary rounded-xl p-10 md:p-16 text-center mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616135898717-d7c71d318721?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary tracking-wide drop-shadow-md">Welcome to Amakha</h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">Premium Car Perfumes, Luxury Colognes & Exclusive Branded Apparel</p>
          <Link href="/category/perfume" className="inline-block bg-gradient-to-br from-primary to-orange-400 text-black text-lg font-bold px-10 py-4 rounded shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]">
            Shop Now
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="h-px bg-primary/30 flex-1"></div>
          <h2 className="text-3xl md:text-4xl font-serif text-center px-8 text-primary">Featured Products</h2>
          <div className="h-px bg-primary/30 flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
