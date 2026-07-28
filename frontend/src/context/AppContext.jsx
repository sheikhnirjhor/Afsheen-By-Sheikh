import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { INITIAL_PRODUCTS, DEMO_USERS, COUPONS } from '../data/products';

const AppContext = createContext();
const getStored = (key, fb) => { try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fb; } catch { return fb; } };
const setStored = (key, data) => { try { localStorage.setItem(key, JSON.stringify(data)); } catch {} };

export function AppProvider({ children }) {
  const [products, setProducts] = useState(() => getStored('as_products', INITIAL_PRODUCTS));
  const [cart, setCart] = useState(() => getStored('as_cart', []));
  const [orders, setOrders] = useState(() => getStored('as_orders', []));
  const [reviews, setReviews] = useState(() => getStored('as_reviews', []));
  const [session, setSession] = useState(() => getStored('as_session', null));
  const [users, setUsers] = useState(() => getStored('as_users', DEMO_USERS));
  const [chatMessages, setChatMessages] = useState(() => getStored('as_chat', []));
  const [coupons] = useState(COUPONS);
  const [currentView, setCurrentView] = useState('home');
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState(() => getStored('as_wishlist', []));
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [flashSaleEnd] = useState(() => {
    const d = new Date(); d.setHours(d.getHours() + 6); return d.getTime();
  });

  useEffect(() => { setStored('as_products', products); }, [products]);
  useEffect(() => { setStored('as_cart', cart); }, [cart]);
  useEffect(() => { setStored('as_orders', orders); }, [orders]);
  useEffect(() => { setStored('as_reviews', reviews); }, [reviews]);
  useEffect(() => { setStored('as_session', session); }, [session]);
  useEffect(() => { setStored('as_users', users); }, [users]);
  useEffect(() => { setStored('as_chat', chatMessages); }, [chatMessages]);
  useEffect(() => { setStored('as_wishlist', wishlist); }, [wishlist]);

  const notify = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const loginDirect = useCallback((user) => {
    const s = { ...user }; delete s.password;
    if (!s.loyaltyPoints) s.loyaltyPoints = Math.floor(Math.random() * 500 + 100);
    setSession(s);
    notify(`Welcome, ${s.name}!`);
    return s;
  }, [notify]);

  const register = useCallback((data) => {
    if (users.find(u => u.email === data.email)) { notify('Email already registered', 'error'); return null; }
    const u = { ...data, role: 'customer', loyaltyPoints: 100 };
    setUsers(p => [...p, u]);
    const s = { ...u }; delete s.password;
    setSession(s);
    notify('Account created successfully!');
    return s;
  }, [users, notify]);

  const logout = useCallback(() => { setSession(null); setCurrentView('home'); notify('Logged out'); }, [notify]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  }, []);

  const addToCart = useCallback((product, size = 'One Size', qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id && i.selectedSize === size);
      if (exists) return prev.map(i => i.product.id === product.id && i.selectedSize === size ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { product, quantity: qty, selectedSize: size }];
    });
    notify('Added to cart!');
  }, [notify]);

  const updateCartQuantity = useCallback((productId, selectedSize, newQty) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter(i => !(i.product.id === productId && i.selectedSize === selectedSize)));
    } else {
      setCart(prev => prev.map(i => i.product.id === productId && i.selectedSize === selectedSize ? { ...i, quantity: newQty } : i));
    }
  }, []);

  const removeFromCart = useCallback((productId, selectedSize) => {
    setCart(prev => prev.filter(i => !(i.product.id === productId && i.selectedSize === selectedSize)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const placeOrder = useCallback((orderData) => {
    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      ...orderData,
      userId: session?.id,
      customerName: session?.name,
      date: new Date().toLocaleDateString('en-BD'),
      status: 'Pending',
      statusHistory: [{ status: 'Pending', date: new Date().toISOString(), note: 'Order placed' }],
    };
    setOrders(p => [order, ...p]);
    setCart([]);
    notify('Order placed successfully!');
    return order;
  }, [session, notify]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(p => p.map(o => o.id === orderId ? { ...o, status, statusHistory: [...(o.statusHistory || []), { status, date: new Date().toISOString() }] } : o));
    notify(`Order updated to ${status}`);
  }, [notify]);

  const addProduct = useCallback((p) => {
    const np = { ...p, id: `p${Date.now()}`, rating: p.rating || 4.5, reviewCount: p.reviewCount || 0, sold: p.sold || 0 };
    setProducts(prev => [np, ...prev]);
    notify('Product added!');
  }, [notify]);

  const updateProduct = useCallback((product) => {
    setProducts(p => p.map(prod => prod.id === product.id ? product : prod));
    notify('Product updated');
  }, [notify]);

  const deleteProduct = useCallback((id) => {
    setProducts(p => p.filter(prod => prod.id !== id));
    notify('Product deleted');
  }, [notify]);

  const addReview = useCallback((review) => {
    const r = { ...review, id: `r${Date.now()}`, date: new Date().toISOString() };
    setReviews(p => [...p, r]);
    notify('Review submitted!');
    return r;
  }, [notify]);

  const addCoupon = useCallback(() => { notify('Coupon created (demo only)'); }, [notify]);

  const sendChatMessage = useCallback((userId, text, sender = 'user') => {
    const m = { id: `c${Date.now()}`, userId, sender, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), timestamp: new Date().toISOString(), read: false };
    setChatMessages(p => [...p, m]);
  }, []);

  return (
    <AppContext.Provider value={{
      products, cart, orders, reviews, session, users, chatMessages, coupons,
      currentView, notification, selectedProduct, wishlist, megaMenuOpen, flashSaleEnd,
      setCurrentView, setSelectedProduct, setMegaMenuOpen,
      addToCart, updateCartQuantity, removeFromCart, clearCart,
      placeOrder, updateOrderStatus,
      addProduct, updateProduct, deleteProduct, addReview, addCoupon,
      toggleWishlist, loginDirect, register, logout,
      sendChatMessage, notify,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
export default AppContext;
