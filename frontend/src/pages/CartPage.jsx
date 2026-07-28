import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ChevronRight, Shield, Truck, CheckCircle } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/products';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, placeOrder, session, setCurrentView } = useApp();
  const [step, setStep] = useState('cart');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [address, setAddress] = useState({ name: '', phone: '', address: '', city: 'Dhaka', note: '' });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 120;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'GOLDEN15') { setDiscount(Math.round(subtotal * 0.15)); setCouponMsg('15% off applied!'); }
    else if (code === 'WELCOME10') { setDiscount(Math.round(subtotal * 0.1)); setCouponMsg('10% off applied!'); }
    else if (code === 'BRIDAL5000') { if (subtotal >= 15000) { setDiscount(5000); setCouponMsg('৳5,000 off!'); } else { setCouponMsg('Min. ৳15,000 required'); } }
    else if (code === 'FESTIVE20') { setDiscount(Math.round(subtotal * 0.2)); setCouponMsg('20% off applied!'); }
    else { setDiscount(0); setCouponMsg('Invalid code'); }
  };

  const handlePlaceOrder = () => {
    if (!address.name || !address.phone || !address.address) { alert('Please fill all required fields'); return; }
    const method = PAYMENT_METHODS.find(m => m.id === selectedPayment);
    placeOrder({ address, paymentMethod: method?.name || 'Cash on Delivery', total, items: cart.map(i => ({ ...i.product, quantity: i.quantity, size: i.selectedSize })), discount });
    setStep('confirmation');
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-[#00B14F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-[#00B14F]" />
        </div>
        <h1 className="text-[20px] font-bold text-[#222] mb-2">Order Placed!</h1>
        <p className="text-[12px] text-[#666] mb-6">Track your order from your dashboard.</p>
        <div className="flex gap-2 justify-center">
          <button onClick={() => setCurrentView('customer-dashboard')} className="px-4 py-2 bg-[#F85606] text-white text-[12px] font-bold rounded cursor-pointer">View Orders</button>
          <button onClick={() => setCurrentView('shop')} className="px-4 py-2 bg-gray-100 text-[#666] text-[12px] font-bold rounded cursor-pointer">Continue Shopping</button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center animate-fadeIn">
        <p className="text-[48px] mb-3">🛍️</p>
        <h1 className="text-[18px] font-bold text-[#222] mb-2">Your cart is empty</h1>
        <p className="text-[12px] text-[#999] mb-5">Discover our beautiful collection</p>
        <button onClick={() => setCurrentView('shop')} className="px-6 py-2 bg-[#F85606] text-white text-[12px] font-bold rounded cursor-pointer">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-3 animate-fadeIn">
      <div className="flex items-center gap-1 text-[11px] text-[#999] mb-3">
        <button onClick={() => setCurrentView('home')} className="hover:text-[#F85606] cursor-pointer">Home</button>
        <ChevronRight size={10} />
        <span className="text-[#222] font-medium">{step === 'cart' ? 'Shopping Cart' : 'Checkout'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">
        {/* Main */}
        <div>
          {step === 'cart' ? (
            <div className="bg-white rounded overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_40px] gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-[#666]">
                <span>Product</span><span>Price</span><span>Quantity</span><span>Total</span><span></span>
              </div>
              {cart.map(item => (
                <div key={`${item.product.id}-${item.selectedSize}`}
                  className="grid grid-cols-[80px_1fr] md:grid-cols-[2fr_1fr_1fr_1fr_40px] gap-3 px-4 py-3 border-b border-gray-100 items-center">
                  <div className="flex gap-3 items-center md:col-span-1">
                    <img src={item.product.image} alt="" className="w-16 h-16 rounded object-cover" />
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#222] line-clamp-2">{item.product.name}</p>
                      <p className="text-[10px] text-[#999] mt-0.5">Size: {item.selectedSize}</p>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#666] hidden md:block">৳{item.product.price.toLocaleString()}</p>
                  <div className="flex items-center border border-gray-200 rounded w-fit">
                    <button onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center cursor-pointer"><Minus size={12} /></button>
                    <span className="w-7 text-center text-[12px] font-bold">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center cursor-pointer"><Plus size={12} /></button>
                  </div>
                  <p className="text-[12px] font-bold text-[#F85606]">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => removeFromCart(item.product.id, item.selectedSize)} className="text-[#999] hover:text-[#E64545] cursor-pointer"><Trash2 size={14} /></button>
                </div>
              ))}
              <div className="px-4 py-3">
                <button onClick={() => setCurrentView('shop')} className="text-[11px] text-[#F85606] font-bold hover:underline cursor-pointer">← Continue Shopping</button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded p-4">
              <h2 className="text-[14px] font-bold text-[#222] mb-3">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Full Name *" value={address.name} onChange={e => setAddress({...address, name: e.target.value})}
                  className="px-3 py-2.5 border border-gray-200 rounded text-[12px]" />
                <input type="tel" placeholder="Phone *" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})}
                  className="px-3 py-2.5 border border-gray-200 rounded text-[12px]" />
                <input type="text" placeholder="Address *" value={address.address} onChange={e => setAddress({...address, address: e.target.value})}
                  className="md:col-span-2 px-3 py-2.5 border border-gray-200 rounded text-[12px]" />
                <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})}
                  className="px-3 py-2.5 border border-gray-200 rounded text-[12px]" />
                <input type="text" placeholder="Delivery Note" value={address.note} onChange={e => setAddress({...address, note: e.target.value})}
                  className="px-3 py-2.5 border border-gray-200 rounded text-[12px]" />
              </div>
              <h2 className="text-[14px] font-bold text-[#222] mt-5 mb-3">Payment Method</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {PAYMENT_METHODS.map(m => (
                  <button key={m.id} onClick={() => setSelectedPayment(m.id)}
                    className={`p-3 border rounded text-center cursor-pointer transition-colors ${
                      selectedPayment === m.id ? 'border-[#F85606] bg-[#F85606]/5 ring-1 ring-[#F85606]' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className="text-[20px] block mb-0.5">{m.icon}</span>
                    <p className="text-[10px] font-medium text-[#222]">{m.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded p-4 h-fit sticky top-20">
          <h2 className="text-[13px] font-bold text-[#222] mb-3">Order Summary</h2>
          <div className="flex gap-1.5 mb-3">
            <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)}
              placeholder="Voucher code" className="flex-1 px-2.5 py-2 border border-gray-200 rounded text-[11px]" />
            <button onClick={applyCoupon} className="px-3 py-2 bg-gray-100 text-[11px] font-bold rounded cursor-pointer">Apply</button>
          </div>
          {couponMsg && <p className={`text-[11px] mb-2 ${discount > 0 ? 'text-[#00B14F]' : 'text-[#E64545]'}`}>{couponMsg}</p>}

          <div className="space-y-2 pb-3 border-b border-gray-100">
            <div className="flex justify-between text-[12px]"><span className="text-[#666]">Subtotal</span><span>৳{subtotal.toLocaleString()}</span></div>
            {discount > 0 && <div className="flex justify-between text-[12px]"><span className="text-[#00B14F]">Discount</span><span className="text-[#00B14F]">-৳{discount.toLocaleString()}</span></div>}
            <div className="flex justify-between text-[12px]"><span className="text-[#666]">Shipping</span><span>{shipping === 0 ? <span className="text-[#00B14F]">Free</span> : `৳${shipping}`}</span></div>
          </div>
          <div className="flex justify-between py-3 mb-3">
            <span className="text-[13px] font-bold">Total</span>
            <span className="text-[15px] font-bold text-[#F85606]">৳{total.toLocaleString()}</span>
          </div>

          {step === 'cart' ? (
            <button onClick={() => setStep('checkout')}
              className="w-full py-2.5 bg-[#F85606] text-white text-[13px] font-bold rounded hover:bg-[#E04D05] cursor-pointer">
              PROCEED TO CHECKOUT
            </button>
          ) : (
            <button onClick={handlePlaceOrder}
              className="w-full py-2.5 bg-[#E64545] text-white text-[13px] font-bold rounded hover:bg-[#D13B3B] cursor-pointer">
              PLACE ORDER — ৳{total.toLocaleString()}
            </button>
          )}

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] text-[#999]"><Shield size={11} className="text-[#F85606]" /> Secure checkout</div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#999]"><Truck size={11} className="text-[#F85606]" /> Fast delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}
