import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useAuth } from "@/lib/authStore";
import { useOrders, Order } from "@/lib/orderStore";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { 
  Package, ShoppingCart, Users, DollarSign, 
  Eye, CheckCircle, Truck, XCircle, Clock,
  Lock, LogIn
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
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none transition-colors"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 text-white outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-primary to-orange-400 text-black py-3 rounded font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Sign In to Dashboard
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
    pending: <Clock size={14} />,
    processing: <Package size={14} />,
    shipped: <Truck size={14} />,
    delivered: <CheckCircle size={14} />,
    cancelled: <XCircle size={14} />
  };

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
      <div 
        className="p-4 flex flex-wrap items-center gap-4 cursor-pointer hover:bg-white/5"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="font-mono text-primary font-bold">{order.id}</div>
        <div className="flex-1 min-w-[150px]">
          <p className="text-white font-medium">{order.customerName}</p>
          <p className="text-zinc-500 text-sm">{order.customerEmail}</p>
        </div>
        <div className="text-xl font-bold text-primary">R{order.total.toFixed(2)}</div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${statusColors[order.status]}`}>
          {statusIcons[order.status]}
          {order.status.toUpperCase()}
        </div>
        <Eye size={18} className="text-zinc-500" />
      </div>

      {expanded && (
        <div className="border-t border-zinc-800 p-4 bg-black/50 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-zinc-500">Phone</p>
              <p className="text-white">{order.customerPhone}</p>
            </div>
            <div>
              <p className="text-zinc-500">Address</p>
              <p className="text-white">{order.address}, {order.city}</p>
            </div>
            <div>
              <p className="text-zinc-500">Date</p>
              <p className="text-white">{order.createdAt.toLocaleDateString()}</p>
            </div>
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
              <button
                key={status}
                onClick={(e) => { e.stopPropagation(); onUpdateStatus(order.id, status); }}
                className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${order.status === status ? statusColors[status] : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated && user?.isAdmin);
  const { toast } = useToast();

  const handleStatusUpdate = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    toast({ title: "Order updated", description: `Order ${orderId} is now ${status}`, className: "bg-green-900 border-primary text-primary" });
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      </Layout>
    );
  }

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalProducts: products.length
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-primary">Admin Dashboard</h1>
        <button 
          onClick={() => { logout(); setIsLoggedIn(false); }}
          className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded hover:border-red-500 hover:text-red-500 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-primary" />
            </div>
            <div>
              <p className="text-zinc-500 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-400" />
            </div>
            <div>
              <p className="text-zinc-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-white">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-400" />
            </div>
            <div>
              <p className="text-zinc-500 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-white">R{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Package className="text-purple-400" />
            </div>
            <div>
              <p className="text-zinc-500 text-sm">Products</p>
              <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-serif text-primary mb-6">Recent Orders</h2>
        <div className="space-y-3">
          {orders.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">No orders yet</p>
          ) : (
            orders.map((order) => (
              <OrderRow key={order.id} order={order} onUpdateStatus={handleStatusUpdate} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
