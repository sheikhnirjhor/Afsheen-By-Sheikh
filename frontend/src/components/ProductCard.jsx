import { useApp } from '../context/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct, setCurrentView } = useApp();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discount = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleView = () => { setSelectedProduct(product.id); setCurrentView('product-details'); };

  return (
    <div className="bg-white border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer" onClick={handleView}>
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#E64545] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-{discount}%</span>
        )}
        {product.freeDelivery && (
          <span className="absolute top-2 right-2 bg-[#00B14F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Free Delivery</span>
        )}
        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <Heart size={14} className={wishlist.includes(product.id) ? 'fill-[#E64545] text-[#E64545]' : 'text-[#999]'} />
        </button>
      </div>
      <div className="p-3">
        <p className="text-[11px] text-[#F85606] font-medium mb-0.5">{product.category}</p>
        <h3 className="text-[12px] text-[#222] line-clamp-2 mb-1.5 leading-[1.4]">{product.name}</h3>
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[14px] font-bold text-[#F85606]">৳{product.price.toLocaleString()}</span>
          {hasDiscount && <span className="text-[11px] text-[#999] line-through">৳{product.originalPrice.toLocaleString()}</span>}
        </div>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-[10px] ${i < Math.floor(product.rating) ? 'text-[#FFC400]' : 'text-gray-200'}`}>★</span>
            ))}
          </div>
          <span className="text-[10px] text-[#999]">({product.reviewCount})</span>
          {product.sold > 0 && <span className="text-[10px] text-[#999] ml-auto">{product.sold} sold</span>}
        </div>
        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="w-full py-1.5 bg-[#F85606] text-white text-[11px] font-bold rounded hover:bg-[#E04D05] transition-colors flex items-center justify-center gap-1 cursor-pointer">
          <ShoppingBag size={12} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
