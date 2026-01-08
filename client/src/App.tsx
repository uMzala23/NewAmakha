import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CategoryPage from "@/pages/category";
import CartPage from "@/pages/cart";
import TrackOrderPage from "@/pages/order-tracking";
import ProductDetailPage from "@/pages/product-detail";
import AuthPage from "@/pages/auth";
import AdminPage from "@/pages/admin";
import MyOrdersPage from "@/pages/my-orders";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:category" component={CategoryPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/track-order" component={TrackOrderPage} />
      <Route path="/product/:id" component={ProductDetailPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/my-orders" component={MyOrdersPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
