import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/lib/productStore";
import { useRoute } from "wouter";

export default function CategoryPage() {
  const [match, params] = useRoute("/category/:category");
  const category = params?.category as 'perfume' | 'cologne' | 'clothing';
  const { products } = useProducts();

  const categoryTitles = {
    perfume: "Car Perfumes",
    cologne: "Colognes",
    clothing: "Clothing"
  };

  const filteredProducts = products.filter(p => p.category === category);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8 mt-4">
        <div className="h-px bg-primary/30 flex-1"></div>
        <h2 className="text-3xl md:text-4xl font-serif text-center px-8 text-primary">
          {categoryTitles[category] || "Products"}
        </h2>
        <div className="h-px bg-primary/30 flex-1"></div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-zinc-500">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
}
