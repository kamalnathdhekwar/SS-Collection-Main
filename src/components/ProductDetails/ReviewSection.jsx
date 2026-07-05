import { ShieldCheck, Star } from "lucide-react";
import { memo } from "react";
import RatingBreakdown from "./RatingBreakdown";

function ReviewSection({ product }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5">
      <h3 className="mb-5 text-base font-extrabold uppercase text-slate-950">Ratings</h3>

      <RatingBreakdown
        rating={product.rating}
        reviewCount={product.reviewCount}
        breakdown={product.ratingBreakdown}
      />

      <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
        {product.reviews.map((review) => (
          <article key={review.id} className="rounded-lg bg-slate-50 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded bg-teal-600 px-2 py-1 text-xs font-bold text-white">
                {review.rating}
                <Star className="h-3 w-3 fill-white" />
              </span>
              <p className="font-extrabold text-slate-950">{review.name}</p>
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Buyer
                </span>
              )}
              <span className="text-xs text-slate-500">{review.date}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(ReviewSection);