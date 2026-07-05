import { Star } from "lucide-react";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { formatPrice, getSimilarProducts } from "../../utils/getProductById";

function SimilarProducts({ product }) {
  const similarProducts = useMemo(() => getSimilarProducts(product), [product]);

  if (!similarProducts.length) return null;

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5">
      <h3 className="mb-5 text-base font-extrabold uppercase text-slate-950">Similar Products</h3>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {similarProducts.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.routeId || item.id}`}
            state={{ productId: item.id }}
            className="w-48 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img src={item.images[0].src} alt={item.name} className="aspect-[4/5] w-full object-cover" loading="lazy" />
            <div className="p-3">
              <p className="truncate text-sm font-extrabold text-slate-950">{item.brand}</p>
              <p className="mt-1 line-clamp-2 text-xs text-slate-600">{item.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-extrabold">{formatPrice(item.price)}</span>
                <span className="text-xs text-slate-400 line-through">{formatPrice(item.mrp)}</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1 rounded bg-teal-600 px-2 py-1 text-xs font-bold text-white">
                {item.rating}
                <Star className="h-3 w-3 fill-white" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default memo(SimilarProducts);