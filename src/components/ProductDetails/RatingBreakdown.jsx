import { Star } from "lucide-react";
import { memo } from "react";

function RatingBreakdown({ rating, reviewCount, breakdown }) {
  return (
    <div className="grid gap-5 sm:grid-cols-[140px_minmax(0,1fr)]">
      <div className="border-slate-200 sm:border-r">
        <div className="flex items-center gap-2">
          <span className="text-5xl font-light text-slate-950">{rating}</span>
          <Star className="h-5 w-5 fill-teal-600 text-teal-600" />
        </div>
        <p className="mt-2 text-sm text-slate-600">{reviewCount} Verified Buyers</p>
      </div>

      <div className="space-y-2">
        {breakdown.map((item) => (
          <div key={item.stars} className="grid grid-cols-[28px_1fr_36px] items-center gap-2 text-xs text-slate-600">
            <span>{item.stars} ★</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div className={`h-full rounded-full bg-teal-600 ${item.barClass}`} />
            </div>
            <span>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(RatingBreakdown);