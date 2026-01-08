import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useAuth } from "@/lib/authStore";
import { useOrders, Order } from "@/lib/orderStore";
import { useProducts, Product } from "@/lib/productStore";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, ShoppingCart, Users, DollarSign, 
  Eye, CheckCircle, Truck, XCircle, Clock,
  Lock, LogIn, Plus, Pencil, Trash2, X, Upload
} from "lucide-react";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { adminLogin } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(username, password)) {
      toast({ title: "Admin login successful!", className: "bg-green-900 border-primary text-primary" });
      onLogin();
    } else {
      toast({ title: "Invalid credentials", description: "Use admin / admin123", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-zinc-900 border-2 border-primary rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-serif text-primary">Admin Login</h2>
          <p className="text-zinc-500 text-sm mt-2">Enter your admin credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none transition-colors" placeholder="admin" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none transition-colors" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full bg-gradient-to-br from-primary to-orange-400 text-black py-3 rounded font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
            <LogIn size={18} /> Sign In to Dashboard
          </button>
        </form>
        <p className="text-zinc-600 text-xs text-center mt-4">Demo: admin / admin123</p>
      </div>
    </div>
  );
}

function OrderRow({ order, onUpdateStatus }: { order: Order; onUpdateStatus: (id: string, status: Order['status']) => void }) {
  const [expanded, setExpanded] = useState(false);
  const statusColors: Record<Order['status'], string> = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    processing: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    delivered: 'bg-green-500/20 text-green-400 border-green-500/50',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/50'
  };
  const statusIcons: Record<Order['status'], React.ReactNode> = {
    pending: <Clock size={14} />, processing: <Package size={14} />, shipped: <Truck size={14} />, delivered: <CheckCircle size={14} />, cancelled: <XCircle size={14} />
  };

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
      <div className="p-4 flex flex-wrap items-center gap-4 cursor-pointer hover:bg-white/5" onClick={() => setExpanded(!expanded)}>
        <div className="font-mono text-primary font-bold">{order.id}</div>
        <div className="flex-1 min-w-[150px]">
          <p className="text-white font-medium">{order.customerName}</p>
          <p className="text-zinc-500 text-sm">{order.customerEmail}</p>
        </div>
        <div className="text-xl font-bold text-primary">R{order.total.toFixed(2)}</div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${statusColors[order.status]}`}>
          {statusIcons[order.status]} {order.status.toUpperCase()}
        </div>
        <Eye size={18} className="text-zinc-500" />
      </div>
      {expanded && (
        <div className="border-t border-zinc-800 p-4 bg-black/50 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div><p className="text-zinc-500">Phone</p><p className="text-white">{order.customerPhone}</p></div>
            <div><p className="text-zinc-500">Address</p><p className="text-white">{order.address}, {order.city}</p></div>
            <div><p className="text-zinc-500">Date</p><p className="text-white">{order.createdAt.toLocaleDateString()}</p></div>
          </div>
          <div>
            <p className="text-zinc-500 text-sm mb-2">Items:</p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-zinc-900 p-2 rounded">
                  <span className="text-white">{item.productName} x{item.quantity}</span>
                  <span className="text-primary">R{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <p className="text-zinc-500 text-sm mr-2">Update Status:</p>
            {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as Order['status'][]).map((status) => (
              <button key={status} onClick={(e) => { e.stopPropagation(); onUpdateStatus(order.id, status); }} className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${order.status === status ? statusColors[status] : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}>
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductForm({ onClose, editProduct }: { onClose: () => void; editProduct?: Product }) {
  const { addProduct, updateProduct } = useProducts();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: editProduct?.name || '',
    category: editProduct?.category || 'perfume' as 'perfume' | 'cologne' | 'clothing',
    description: editProduct?.description || '',
    price: editProduct?.price?.toString() || '',
    stock: editProduct?.stock?.toString() || '',
    image_url: editProduct?.image_url || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: form.name,
      category: form.category,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      image_url: form.image_url || '/products/download.jpg'
    };
    
    if (editProduct) {
      updateProduct(editProduct.id, productData);
      toast({ title: "Product updated!", className: "bg-green-900 border-primary text-primary" });
    } else {
      addProduct(productData);
      toast({ title: "Product added!", className: "bg-green-900 border-primary text-primary" });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border-2 border-primary rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-serif text-primary">{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Product Name *</label>
            <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none" placeholder="Amakha Premium Cologne" />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Category *</label>
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value as any})} className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none">
              <option value="perfume">Car Perfume</option>
              <option value="cologne">Cologne</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Description *</label>
            <textarea required value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none min-h-[80px]" placeholder="Product description..." />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Price (R) *</label>
              <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none" placeholder="1299.00" />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Stock *</label>
              <input required type="number" min="0" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none" placeholder="50" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">Image URL</label>
            <input type="text" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none" placeholder="/products/image.jpg or https://..." />
            <p className="text-zinc-600 text-xs mt-1">Leave empty for default image</p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-gradient-to-br from-primary to-orange-400 text-black py-3 rounded font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              <Upload size={18} /> {editProduct ? 'Update Product' : 'Add Product'}
            </button>
            <button type="button" onClick={onClose} className="px-6 border border-zinc-700 text-zinc-400 rounded hover:border-white hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const { products, deleteProduct } = useProducts();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated && user?.isAdmin);
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { toast } = useToast();

  const handleStatusUpdate = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    toast({ title: "Order updated", description: `Order ${orderId} is now ${status}`, className: "bg-green-900 border-primary text-primary" });
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast({ title: "Product deleted", className: "bg-green-900 border-primary text-primary" });
    }
  };

  if (!isLoggedIn) {
    return <Layout><AdminLogin onLogin={() => setIsLoggedIn(true)} /></Layout>;
  }

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalProducts: products.length
  };

  return (
    <Layout>
      {showProductForm && (
        <ProductForm 
          onClose={() => { setShowProductForm(false); setEditingProduct(undefined); }} 
          editProduct={editingProduct} 
        />
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-primary">Admin Dashboard</h1>
        <button onClick={() => { logout(); setIsLoggedIn(false); }} className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded hover:border-red-500 hover:text-red-500 transition-colors">
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center"><ShoppingCart className="text-primary" /></div>
            <div><p className="text-zinc-500 text-sm">Total Orders</p><p className="text-2xl font-bold text-white">{stats.totalOrders}</p></div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center"><Clock className="text-yellow-400" /></div>
            <div><p className="text-zinc-500 text-sm">Pending</p><p className="text-2xl font-bold text-white">{stats.pendingOrders}</p></div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center"><DollarSign className="text-green-400" /></div>
            <div><p className="text-zinc-500 text-sm">Revenue</p><p className="text-2xl font-bold text-white">R{stats.totalRevenue.toLocaleString()}</p></div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center"><Package className="text-purple-400" /></div>
            <div><p className="text-zinc-500 text-sm">Products</p><p className="text-2xl font-bold text-white">{stats.totalProducts}</p></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-zinc-800">
        <button onClick={() => setActiveTab('orders')} className={`pb-3 px-4 font-medium transition-colors ${activeTab === 'orders' ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-zinc-300'}`}>
          Orders
        </button>
        <button onClick={() => setActiveTab('products')} className={`pb-3 px-4 font-medium transition-colors ${activeTab === 'products' ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-zinc-300'}`}>
          Products
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-serif text-primary mb-6">Recent Orders</h2>
          <div className="space-y-3">
            {orders.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">No orders yet</p>
            ) : (
              orders.map((order) => <OrderRow key={order.id} order={order} onUpdateStatus={handleStatusUpdate} />)
            )}
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif text-primary">Products</h2>
            <button onClick={() => setShowProductForm(true)} className="bg-gradient-to-br from-primary to-orange-400 text-black px-4 py-2 rounded font-bold hover:scale-105 transition-transform flex items-center gap-2">
              <Plus size={18} /> Add Product
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="pb-3 text-zinc-500 font-medium text-sm">Image</th>
                  <th className="pb-3 text-zinc-500 font-medium text-sm">Name</th>
                  <th className="pb-3 text-zinc-500 font-medium text-sm">Category</th>
                  <th className="pb-3 text-zinc-500 font-medium text-sm">Price</th>
                  <th className="pb-3 text-zinc-500 font-medium text-sm">Stock</th>
                  <th className="pb-3 text-zinc-500 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-zinc-800/50 hover:bg-white/5">
                    <td className="py-3">
                      <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded bg-black" />
                    </td>
                    <td className="py-3 text-white font-medium">{product.name}</td>
                    <td className="py-3 text-zinc-400 capitalize">{product.category}</td>
                    <td className="py-3 text-primary font-bold">R{product.price.toFixed(2)}</td>
                    <td className="py-3 text-zinc-300">{product.stock}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingProduct(product); setShowProductForm(true); }} className="p-2 text-zinc-500 hover:text-primary hover:bg-primary/10 rounded transition-colors">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}
