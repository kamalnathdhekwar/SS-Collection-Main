import { BadgePercent } from "lucide-react";
import { memo } from "react";

function OffersSection({ offers }) {
  return (
    <section className="border-t border-slate-200 pt-6">
      <h3 className="mb-4 inline-flex items-center gap-2 text-base font-extrabold uppercase text-slate-950">
        Best Offers
        <BadgePercent className="h-5 w-5" />
      </h3>

      <div className="space-y-4">
        {offers.map((offer) => (
          <article key={offer.title} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-extrabold text-slate-950">{offer.title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">{offer.description}</p>
            <button type="button" className="mt-2 text-xs font-extrabold uppercase text-rose-500">
              Terms & Condition
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(OffersSection);