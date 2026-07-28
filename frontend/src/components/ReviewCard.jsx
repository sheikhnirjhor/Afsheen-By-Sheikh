import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-100 rounded p-4">
      <div className="flex items-center gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} className={i < review.rating ? 'text-[#FFC400] fill-[#FFC400]' : 'text-gray-200'} />
        ))}
      </div>
      <p className="text-[12px] text-[#666] mb-2">"{review.comment}"</p>
      <div className="border-t border-gray-100 pt-2">
        <p className="text-[11px] font-bold text-[#222]">{review.name}</p>
        {review.location && <p className="text-[10px] text-[#999]">{review.location}</p>}
      </div>
    </div>
  );
}
