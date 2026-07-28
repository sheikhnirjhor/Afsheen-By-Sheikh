import { useApp } from './context/AppContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import Notification from './components/Notification';
import LiveChatWidget from './components/LiveChatWidget';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  const { currentView, notification, session } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomePage />;
      case 'shop': return <ShopPage />;
      case 'product-details': return <ProductDetailPage />;
      case 'cart': return <CartPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage />;
      case 'register': return <RegisterPage />;
      case 'admin-dashboard': return <AdminDashboard />;
      case 'moderator-dashboard': return <ModeratorDashboard />;
      case 'customer-dashboard': return <CustomerDashboard />;
      default: return <HomePage />;
    }
  };

  const isAuth = currentView === 'login' || currentView === 'register';
  const isDashboard = currentView.endsWith('-dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuth && !isDashboard && <TopBar />}
      {!isAuth && !isDashboard && <Header />}
      {!isAuth && !isDashboard && <CategoryNav />}
      <main className="flex-1">{renderView()}</main>
      {!isAuth && !isDashboard && <Footer />}
      {!isAuth && <MobileNav />}
      {session?.role === 'customer' && !isAuth && <LiveChatWidget />}
      <Notification notification={notification} />
    </div>
  );
}

export default App;
