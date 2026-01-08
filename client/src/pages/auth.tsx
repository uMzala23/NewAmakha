import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useAuth } from "@/lib/authStore";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, LogIn, UserPlus } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  if (isAuthenticated && user) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-12">
          <div className="bg-zinc-900 border-2 border-primary rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-serif text-primary mb-2">Welcome back!</h2>
            <p className="text-zinc-400 mb-6">{user.name}</p>
            <p className="text-zinc-500 text-sm mb-8">{user.email}</p>
            <div className="space-y-3">
              <button
                onClick={() => setLocation('/my-orders')}
                className="w-full bg-gradient-to-br from-primary to-orange-400 text-black py-3 rounded font-bold hover:scale-[1.02] transition-transform"
              >
                View My Orders
              </button>
              <button
                onClick={() => setLocation('/')}
                className="w-full border border-zinc-700 text-zinc-300 py-3 rounded hover:border-primary hover:text-primary transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const success = login(email, password);
      if (success) {
        toast({ title: "Login successful!", description: "Welcome back to Amakha.", className: "bg-green-900 border-primary text-primary" });
        setLocation('/');
      } else {
        toast({ title: "Login failed", description: "Please check your credentials.", variant: "destructive" });
      }
    } else {
      const success = register(name, email, password);
      if (success) {
        toast({ title: "Account created!", description: "Welcome to Amakha.", className: "bg-green-900 border-primary text-primary" });
        setLocation('/');
      } else {
        toast({ title: "Registration failed", description: "Please fill all fields correctly.", variant: "destructive" });
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <div className="bg-zinc-900 border-2 border-primary rounded-xl p-8">
          <div className="flex mb-8 border-b border-zinc-800">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 text-lg font-medium transition-colors ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <LogIn className="inline mr-2" size={18} />
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 text-lg font-medium transition-colors ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <UserPlus className="inline mr-2" size={18} />
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 pl-10 text-white outline-none transition-colors"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 pl-10 text-white outline-none transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-zinc-700 focus:border-primary rounded p-3 pl-10 text-white outline-none transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={4}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-primary to-orange-400 text-black py-3 rounded font-bold text-lg hover:scale-[1.02] transition-transform mt-6"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
