import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  adminLogin: (username: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  login: (email, password) => {
    if (email && password.length >= 4) {
      set({ 
        user: { id: 1, name: email.split('@')[0], email, isAdmin: false },
        isAuthenticated: true 
      });
      return true;
    }
    return false;
  },
  adminLogin: (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      set({ 
        user: { id: 0, name: 'Administrator', email: 'admin@amakha.com', isAdmin: true },
        isAuthenticated: true 
      });
      return true;
    }
    return false;
  },
  register: (name, email, password) => {
    if (name && email && password.length >= 4) {
      set({ 
        user: { id: Date.now(), name, email, isAdmin: false },
        isAuthenticated: true 
      });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
