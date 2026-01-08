import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  category: 'perfume' | 'cologne' | 'clothing';
  description: string;
  price: number;
  stock: number;
  image_url: string;
  review_count: number;
  rating: number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Amakha Black Oud Car Perfume', category: 'perfume', description: 'Luxurious oriental fragrance with notes of oud, amber and sandalwood. Long-lasting premium car air freshener.', price: 1299.00, stock: 50, image_url: '/products/cologn.jpg', review_count: 12, rating: 5 },
  { id: 2, name: 'Amakha Ocean Breeze Car Perfume', category: 'perfume', description: 'Fresh aquatic scent with hints of sea salt and citrus. Perfect for a clean, refreshing atmosphere.', price: 999.00, stock: 75, image_url: '/products/download.jpg', review_count: 8, rating: 4 },
  { id: 3, name: 'Amakha Leather & Wood Car Perfume', category: 'perfume', description: 'Sophisticated blend of rich leather and cedarwood. Masculine and elegant fragrance.', price: 1399.00, stock: 40, image_url: '/products/download (1).jpg', review_count: 15, rating: 5 },
  { id: 4, name: 'Amakha Signature Cologne', category: 'cologne', description: 'Premium eau de parfum with notes of bergamot, jasmine and musk. Our signature scent for the modern individual.', price: 2499.00, stock: 30, image_url: '/products/colognehi.jpg', review_count: 24, rating: 5 },
  { id: 5, name: 'Amakha Royal Oud Cologne', category: 'cologne', description: 'Luxurious oud-based cologne with amber and rose. Long-lasting oriental fragrance.', price: 2999.00, stock: 25, image_url: '/products/product_11_1765189986.jpg', review_count: 10, rating: 5 },
  { id: 6, name: 'Amakha Fresh Sport Cologne', category: 'cologne', description: 'Energizing citrus cologne with mint and marine notes. Perfect for active lifestyles.', price: 2199.00, stock: 45, image_url: '/products/product_12_1764931738.jpg', review_count: 5, rating: 4 },
  { id: 7, name: 'Amakha Premium Black T-Shirt', category: 'clothing', description: 'High-quality cotton t-shirt with embroidered gold Amakha logo. Available in sizes S-XXL.', price: 899.00, stock: 100, image_url: '/products/tee.jpg', review_count: 32, rating: 4.5 },
  { id: 8, name: 'Amakha Gold Edition T-Shirt', category: 'clothing', description: 'Limited edition t-shirt with metallic gold print. Premium fabric blend for maximum comfort.', price: 1099.00, stock: 60, image_url: '/products/hoodie.jpg', review_count: 18, rating: 5 },
  { id: 9, name: 'Amakha Classic Polo Shirt', category: 'clothing', description: 'Elegant polo shirt with subtle Amakha branding. Perfect for casual elegance.', price: 1299.00, stock: 80, image_url: '/products/hanger.jpg', review_count: 7, rating: 4 },
  { id: 10, name: 'Amakha Luxury Hoodie', category: 'clothing', description: 'Premium fleece hoodie with embroidered logo. Comfortable and stylish.', price: 1899.00, stock: 50, image_url: '/products/hoodie.jpg', review_count: 22, rating: 5 }
];

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'review_count' | 'rating'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

export const useProducts = create<ProductStore>((set, get) => ({
  products: initialProducts,
  addProduct: (productData) => {
    const maxId = Math.max(...get().products.map(p => p.id), 0);
    const newProduct: Product = {
      ...productData,
      id: maxId + 1,
      review_count: 0,
      rating: 0
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  },
  deleteProduct: (id) => {
    set((state) => ({ products: state.products.filter(p => p.id !== id) }));
  }
}));
