import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  // Axios instance configured with base URL and authorization header
  const api = axios.create({
    baseURL: backendUrl,
  });

  // Request interceptor to attach JWT token
  api.interceptors.request.use(
    (config) => {
      const activeToken = localStorage.getItem('token');
      if (activeToken) {
        config.headers.Authorization = `Bearer ${activeToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Load current user profile and cart info if token is present
  const loadUser = async () => {
    const activeToken = localStorage.getItem('token');
    if (!activeToken) {
      setUser(null);
      setCartCount(0);
      setLoading(false);
      return;
    }

    try {
      // Endpoint is protected by authUser, which expects Bearer token
      const res = await api.get('/api/user/userlogin');
      if (res.data) {
        setUser(res.data);
        // Calculate cart count from user details
        const cartItems = res.data.cartData || [];
        const count = cartItems.reduce((acc, curr) => acc + (curr.count || 0), 0);
        setCartCount(count);
      } else {
        // Token is invalid/expired
        logout();
      }
    } catch (err) {
      console.error("Error loading user profile:", err.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post('/api/user/Logout');
      }
    } catch (e) {
      console.error("Logout API call error:", e.message);
    }
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCartCount(0);
  };

  // Helper function to force recalculation of cart count
  const refreshCart = async () => {
    if (!token) return;
    try {
      const res = await api.get('/api/product/getcart');
      if (res.data && res.data.cartData) {
        const cartItems = res.data.cartData;
        const count = cartItems.reduce((acc, curr) => acc + (curr.count || 0), 0);
        setCartCount(count);
      }
    } catch (err) {
      console.error("Error updating cart status:", err.message);
    }
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      loading,
      cartCount,
      login,
      logout,
      refreshCart,
      api,
      backendUrl
    }}>
      {children}
    </AuthContext.Provider>
  );
};
