import { memo } from "react";

function Specifications({ product }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5">
      <details open className="border-b border-slate-200 pb-5">
        <summary className="cursor-pointer text-base font-extrabold uppercase text-slate-950">Product Details</summary>
        <p className="mt-4 text-sm leading-6 text-slate-700">{product.description}</p>

        <div className="mt-5">
          <p className="font-extrabold text-slate-950">Highlights</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {product.highlights.map((highlight) => (
              <li key={highlight}>- {highlight}</li>
            ))}
          </ul>
        </div>
      </details>

      <details open className="border-b border-slate-200 py-5">
        <summary className="cursor-pointer text-base font-extrabold uppercase text-slate-950">Material & Care</summary>
        <p className="mt-4 text-sm leading-6 text-slate-700">{product.material}</p>
      </details>

      <details open className="pt-5">
        <summary className="cursor-pointer text-base font-extrabold uppercase text-slate-950">Specifications</summary>
        <div className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {product.specifications.map((spec) => (
            <div key={spec.label} className="border-b border-slate-200 pb-3">
              <p className="text-xs text-slate-500">{spec.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-950">{spec.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p><span className="font-extrabold text-slate-950">Seller:</span> {product.seller}</p>
          <p><span className="font-extrabold text-slate-950">Warranty:</span> {product.warranty}</p>
        </div>
      </details>
    </section>
  );
}

export default memo(Specifications);