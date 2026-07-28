import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function ProductDetailPage() {
  const { selectedProduct, addToCart, wishlist, toggleWishlist, reviews, addReview, setSelectedProduct, setCurrentView } = useApp();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const product = PRODUCTS.find(p => p.id === selectedProduct);
  if (!product) return <div className="max-w-[1200px] mx-auto px-4 py-20 text-center"><p className="text-[14px] text-[#999]">Product not found</p></div>;

  const productReviews = reviews.filter(r => r.productId === product.id);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discount = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const submitReview = () => {
    if (!reviewText.trim()) return;
    addReview({ productId: product.id, rating: reviewRating, comment: reviewText, name: 'You' });
    setReviewText('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-3 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-[#999] mb-3 flex-wrap">
        <button onClick={() => setCurrentView('home')} className="hover:text-[#F85606] cursor-pointer">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => setCurrentView('shop')} className="hover:text-[#F85606] cursor-pointer">Shop</button>
        <ChevronRight size={10} />
        <span className="text-[#222] font-medium">{product.name.slice(0, 40)}...</span>
      </div>

      <div className="bg-white rounded p-4 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6">
          {/* Image */}
          <div className="relative bg-gray-50 rounded overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
            {discount > 0 && <span className="absolute top-3 left-3 bg-[#E64545] text-white text-[11px] font-bold px-2 py-1 rounded">-{discount}% OFF</span>}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-[16px] font-bold text-[#222] mb-2 leading-snug">{product.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-[#FFC400] fill-[#FFC400]' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-[12px] text-[#999]">({product.reviewCount} ratings)</span>
              <span className="text-[12px] text-[#999]">{product.sold || 0} sold</span>
            </div>

            <div className="bg-[#FFF0E6] rounded p-3 mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[22px] font-bold text-[#F85606]">৳{product.price.toLocaleString()}</span>
                {hasDiscount && <span className="text-[14px] text-[#999] line-through">৳{product.originalPrice.toLocaleString()}</span>}
                {discount > 0 && <span className="text-[12px] font-bold text-[#E64545]">{discount}% OFF</span>}
              </div>
            </div>

            {product.freeDelivery && (
              <div className="flex items-center gap-2 text-[12px] text-[#00B14F] mb-3">
                <Truck size={14} /> Free Delivery
              </div>
            )}

            {/* Size */}
            <div className="mb-3">
              <p className="text-[12px] font-bold text-[#222] mb-1.5">Size</p>
              <div className="flex gap-1.5">
                {product.sizes?.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 border rounded text-[11px] cursor-pointer ${selectedSize === s ? 'border-[#F85606] text-[#F85606] bg-[#F85606]/5 font-bold' : 'border-gray-200 text-[#666]'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <p className="text-[12px] font-bold text-[#222] mb-1.5">Quantity</p>
              <div className="flex items-center border border-gray-200 rounded w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-[#666] hover:bg-gray-50 cursor-pointer text-[14px]">−</button>
                <span className="w-10 text-center text-[13px] font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[#666] hover:bg-gray-50 cursor-pointer text-[14px]">+</button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mb-4">
              <button onClick={() => addToCart(product, selectedSize, quantity)}
                className="flex-1 py-2.5 bg-[#F85606] text-white text-[13px] font-bold rounded hover:bg-[#E04D05] flex items-center justify-center gap-1.5 cursor-pointer">
                <ShoppingBag size={14} /> Add to Cart
              </button>
              <button onClick={() => { addToCart(product, selectedSize, quantity); setCurrentView('cart'); }}
                className="flex-1 py-2.5 bg-[#E64545] text-white text-[13px] font-bold rounded hover:bg-[#D13B3B] cursor-pointer">
                Buy Now
              </button>
              <button onClick={() => toggleWishlist(product.id)}
                className={`w-10 h-10 border rounded flex items-center justify-center cursor-pointer ${wishlist.includes(product.id) ? 'border-[#E64545] text-[#E64545]' : 'border-gray-200 text-[#999]'}`}>
                <Heart size={16} className={wishlist.includes(product.id) ? 'fill-[#E64545]' : ''} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border border-gray-100 rounded p-3 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-[#666]"><Truck size={13} className="text-[#F85606]" /> Delivery within 2-5 business days</div>
              <div className="flex items-center gap-2 text-[11px] text-[#666]"><RotateCcw size={13} className="text-[#F85606]" /> 7-day exchange policy</div>
              <div className="flex items-center gap-2 text-[11px] text-[#666]"><Shield size={13} className="text-[#F85606]" /> 100% authentic products</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded p-4 mb-3">
        <div className="flex border-b border-gray-100 mb-3">
          {['desc', 'specs', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[12px] font-bold border-b-2 cursor-pointer capitalize ${
                activeTab === tab ? 'border-[#F85606] text-[#F85606]' : 'border-transparent text-[#666]'
              }`}>
              {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : `Reviews (${productReviews.length})`}
            </button>
          ))}
        </div>
        {activeTab === 'desc' && <p className="text-[12px] text-[#666] leading-relaxed">{product.description}</p>}
        {activeTab === 'specs' && (
          <div className="space-y-1.5">
            {[['Category', product.category], ['Size', product.sizes?.join(', ')], ['Rating', `${product.rating}/5`], ['In Stock', product.inStock ? 'Yes' : 'No']].map(([k, v]) => (
              <div key={k} className="flex text-[12px]"><span className="w-32 text-[#999]">{k}</span><span className="text-[#222] font-medium">{v}</span></div>
            ))}
          </div>
        )}
        {activeTab === 'reviews' && (
          <div>
            <button onClick={() => setShowReviewForm(!showReviewForm)}
              className="mb-3 px-3 py-1.5 bg-[#F85606] text-white text-[11px] font-bold rounded cursor-pointer">Write a Review</button>
            {showReviewForm && (
              <div className="border border-gray-200 rounded p-3 mb-3 animate-slideDown">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-[11px] text-[#666]">Rating:</span>
                  {[...Array(5)].map((_, i) => (
                    <button key={i} onClick={() => setReviewRating(i + 1)} className="cursor-pointer">
                      <Star size={16} className={i < reviewRating ? 'text-[#FFC400] fill-[#FFC400]' : 'text-gray-200'} />
                    </button>
                  ))}
                </div>
                <textarea value={reviewText} onChange={e => setReviewText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded text-[12px] h-20 resize-none mb-2" placeholder="Your review..." />
                <button onClick={submitReview} className="px-4 py-1.5 bg-[#222] text-white text-[11px] font-bold rounded cursor-pointer">Submit</button>
              </div>
            )}
            {productReviews.length === 0 ? <p className="text-[12px] text-[#999]">No reviews yet.</p> :
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">{productReviews.map((r, i) => <ReviewCard key={i} review={r} />)}</div>
            }
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-white rounded p-4">
          <h2 className="text-[14px] font-bold text-[#222] mb-3">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}


//updated