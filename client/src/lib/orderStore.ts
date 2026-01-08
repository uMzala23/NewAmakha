import { create } from 'zustand';

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByEmail: (email: string) => Order[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD-10001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+27 82 123 4567',
    address: '123 Main Street',
    city: 'Cape Town',
    items: [
      { productId: 1, productName: 'Amakha Black Oud Car Perfume', quantity: 2, price: 1299 },
      { productId: 7, productName: 'Amakha Premium Black T-Shirt', quantity: 1, price: 899 }
    ],
    total: 3497,
    status: 'pending',
    createdAt: new Date('2026-01-06')
  },
  {
    id: 'ORD-10002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+27 83 456 7890',
    address: '456 Oak Avenue',
    city: 'Johannesburg',
    items: [
      { productId: 4, productName: 'Amakha Signature Cologne', quantity: 1, price: 2499 }
    ],
    total: 2499,
    status: 'processing',
    createdAt: new Date('2026-01-05')
  },
  {
    id: 'ORD-10003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    customerPhone: '+27 84 789 0123',
    address: '789 Pine Road',
    city: 'Durban',
    items: [
      { productId: 10, productName: 'Amakha Luxury Hoodie', quantity: 2, price: 1899 }
    ],
    total: 3798,
    status: 'shipped',
    createdAt: new Date('2026-01-04')
  }
];

export const useOrders = create<OrderStore>((set, get) => ({
  orders: mockOrders,
  addOrder: (orderData) => {
    const orderId = `ORD-${10000 + get().orders.length + 1}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      status: 'pending',
      createdAt: new Date()
    };
    set((state) => ({ orders: [newOrder, ...state.orders] }));
    return orderId;
  },
  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    }));
  },
  getOrderById: (orderId) => {
    return get().orders.find((order) => order.id === orderId);
  },
  getOrdersByEmail: (email) => {
    return get().orders.filter((order) => order.customerEmail.toLowerCase() === email.toLowerCase());
  }
}));
