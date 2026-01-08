import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useOrders } from "@/lib/orderStore";
import { Search, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const { getOrderById } = useOrders();
  const [searchedOrder, setSearchedOrder] = useState<ReturnType<typeof getOrderById> | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const order = getOrderById(orderId.toUpperCase());
    setSearchedOrder(order);
    setSearched(true);
  };

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];
  const getStepIndex = (status: string) => {
    if (status === 'cancelled') return -1;
    return statusSteps.indexOf(status);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-4xl font-serif text-primary text-center mb-8">Track Your Order</h2>
        
        <div className="bg-zinc-900 border-2 border-primary rounded-xl p-8 mb-10 shadow-lg">
          <form onSubmit={handleTrack} className="flex gap-4">
            <input 
              type="text" 
              placeholder="Enter your Order ID (e.g., ORD-10001)" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 bg-black border border-zinc-700 text-white px-4 py-3 rounded focus:border-primary outline-none transition-colors"
              required
            />
            <button 
              type="submit"
              className="bg-gradient-to-br from-primary to-orange-400 text-black px-8 py-3 rounded font-bold hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Search size={18} />
              Track
            </button>
          </form>
        </div>

        {searched && !searchedOrder && (
          <div className="bg-zinc-900 border border-red-500/50 rounded-xl p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl text-red-400 mb-2">Order Not Found</h3>
            <p className="text-zinc-500">Please check your order ID and try again.</p>
            <p className="text-zinc-600 text-sm mt-2">Try: ORD-10001, ORD-10002, or ORD-10003</p>
          </div>
        )}

        {searchedOrder && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Order {searchedOrder.id}</h3>
                <p className="text-zinc-500">{searchedOrder.customerName}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">R{searchedOrder.total.toFixed(2)}</p>
                <p className="text-zinc-500 text-sm">{searchedOrder.createdAt.toLocaleDateString()}</p>
              </div>
            </div>

            {searchedOrder.status === 'cancelled' ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
                <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-red-400 font-bold">Order Cancelled</p>
              </div>
            ) : (
              <div className="relative mt-8">
                <div className="absolute top-5 left-0 w-full h-1 bg-zinc-800 z-0"></div>
                <div 
                  className="absolute top-5 left-0 h-1 bg-primary z-0 transition-all duration-1000"
                  style={{ width: `${(getStepIndex(searchedOrder.status) / 3) * 100}%` }}
                ></div>

                <div className="relative z-10 flex justify-between">
                  {[
                    { icon: Clock, label: "Pending" },
                    { icon: Package, label: "Processing" },
                    { icon: Truck, label: "Shipped" },
                    { icon: CheckCircle, label: "Delivered" }
                  ].map((step, index) => {
                    const currentIndex = getStepIndex(searchedOrder.status);
                    const isComplete = index <= currentIndex;
                    return (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isComplete ? 'bg-primary border-primary text-black' : 'bg-black border-zinc-600 text-zinc-600'}`}>
                          <step.icon size={18} />
                        </div>
                        <span className={`text-xs font-medium ${isComplete ? 'text-primary' : 'text-zinc-600'}`}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <h4 className="text-zinc-500 text-sm mb-3">Order Items:</h4>
              <div className="space-y-2">
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-zinc-300">{item.productName} x{item.quantity}</span>
                    <span className="text-primary">R{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
