import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/authStore";
import { useOrders } from "@/lib/orderStore";
import { Link } from "wouter";
import { Package, Clock, Truck, CheckCircle, XCircle, ShoppingBag } from "lucide-react";

export default function MyOrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const { getOrdersByEmail } = useOrders();
  
  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-12 text-center">
          <div className="bg-zinc-900 border-2 border-primary rounded-xl p-8">
            <ShoppingBag className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-primary mb-4">Please Login</h2>
            <p className="text-zinc-400 mb-6">You need to be logged in to view your orders.</p>
            <Link href="/auth" className="inline-block bg-gradient-to-br from-primary to-orange-400 text-black px-6 py-3 rounded font-bold hover:scale-105 transition-transform">
              Login / Register
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const orders = getOrdersByEmail(user.email);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-purple-500/20 text-purple-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400'
  };

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock size={16} />,
    processing: <Package size={16} />,
    shipped: <Truck size={16} />,
    delivered: <CheckCircle size={16} />,
    cancelled: <XCircle size={16} />
  };

  return (
    <Layout>
      <h1 className="text-3xl font-serif text-primary text-center mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <div className="max-w-md mx-auto text-center">
          <div className="bg-zinc-900 border-2 border-primary rounded-xl p-8">
            <ShoppingBag className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h2 className="text-xl text-primary mb-4">No orders yet</h2>
            <p className="text-zinc-400 mb-6">Start shopping to see your orders here.</p>
            <Link href="/" className="inline-block bg-gradient-to-br from-primary to-orange-400 text-black px-6 py-3 rounded font-bold hover:scale-105 transition-transform">
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="font-mono text-primary font-bold text-lg">{order.id}</p>
                  <p className="text-zinc-500 text-sm">{order.createdAt.toLocaleDateString()}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${statusColors[order.status]}`}>
                  {statusIcons[order.status]}
                  {order.status.toUpperCase()}
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-zinc-300">{item.productName} x{item.quantity}</span>
                    <span className="text-primary">R{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 mt-4 pt-4 flex justify-between items-center">
                <span className="text-zinc-500">Total</span>
                <span className="text-2xl font-bold text-primary">R{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
