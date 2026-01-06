import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Search, Package, Truck, CheckCircle } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [trackingResult, setTrackingResult] = useState<null | { status: string, step: number }>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock tracking logic
    setTrackingResult({
        status: "Shipped",
        step: 3
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-4xl font-serif text-primary text-center mb-8">Track Your Order</h2>
        
        <div className="bg-zinc-900 border-2 border-primary rounded-xl p-8 mb-10 shadow-lg">
            <form onSubmit={handleTrack} className="flex gap-4">
                <input 
                    type="text" 
                    placeholder="Enter your Order ID (e.g., ORD-12345)" 
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

        {trackingResult && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Order #{orderId || "12345"}</h3>
                        <p className="text-primary">Status: {trackingResult.status}</p>
                    </div>
                    <div className="text-right text-zinc-400 text-sm">
                        Estimated Delivery: <br />
                        <span className="text-white font-medium">Jan 12, 2026</span>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -translate-y-1/2 z-0"></div>
                    <div 
                        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000"
                        style={{ width: '75%' }}
                    ></div>

                    <div className="relative z-10 flex justify-between">
                        {[
                            { icon: Package, label: "Processing" },
                            { icon: CheckCircle, label: "Confirmed" },
                            { icon: Truck, label: "Shipped" },
                            { icon: CheckCircle, label: "Delivered" }
                        ].map((step, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index < 3 ? 'bg-primary border-primary text-black' : 'bg-black border-zinc-600 text-zinc-600'}`}>
                                    <step.icon size={18} />
                                </div>
                                <span className={`text-xs font-medium ${index < 3 ? 'text-primary' : 'text-zinc-600'}`}>{step.label}</span>
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
