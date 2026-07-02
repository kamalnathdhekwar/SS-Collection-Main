import {
  ArrowRight,
  BadgePercent,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

function OfferSection() {
  const features = [
    { label: "100% Original Products", icon: ShieldCheck },
    { label: "Easy Returns", icon: RefreshCcw },
    { label: "Free Shipping", icon: Truck },
    { label: "Secure Payments", icon: ShieldCheck },
  ];

  return (
    <section className="w-full bg-slate-50 px-3 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />
          <div className="absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-sky-200/60 blur-3xl" />
          <div className="absolute right-1/3 top-10 h-32 w-32 rounded-full bg-amber-200/50 blur-2xl" />

          <div className="relative grid min-h-[520px] grid-cols-1 items-center gap-8 bg-gradient-to-br from-white via-rose-50/70 to-sky-50/80 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12 xl:p-14">
            <div className="z-10 max-w-2xl">
              <div className="mb-5 inline-flex animate-pulse items-center gap-2 rounded-full border border-rose-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-rose-700 shadow-sm backdrop-blur">
                <BadgePercent className="h-4 w-4" />
                Limited Time Offer
              </div>

              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  Exclusive Deal
                </p>

                <h2 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
                  UP TO
                  <span className="mt-1 block bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    60% OFF
                  </span>
                </h2>

                <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  On Branded Shoes
                </h3>

                <p className="text-sm font-semibold text-slate-500 sm:text-base">
                  Nike • Adidas • Puma • Skechers • Campus
                </p>

                <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Upgrade your style with premium branded footwear. Enjoy huge
                  discounts for a limited time.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-amber-900 sm:text-base">
                      Buy 2 Pairs of Shoes
                    </p>
                    <p className="text-2xl font-black text-slate-950">
                      Get 1 Pair FREE*
                    </p>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg">
                    Offer Ends Soon
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-extrabold text-white shadow-lg transition duration-300 hover:scale-[1.03] hover:bg-rose-600"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shop Shoes
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 text-sm font-extrabold text-slate-900 shadow-sm backdrop-blur transition duration-300 hover:scale-[1.03] hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {features.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur"
                  >
                    <Icon className="h-4 w-4 text-emerald-600" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 min-h-[320px] lg:min-h-[460px]">
              <div className="absolute left-2 top-4 z-20 rounded-2xl bg-white px-4 py-3 text-center shadow-xl animate-[bounce_5s_ease-in-out_infinite]">
                <p className="text-xs font-extrabold uppercase text-slate-500">
                  Limited Stock
                </p>
                <p className="text-xl font-black text-rose-600">60% OFF</p>
              </div>

              <div className="absolute bottom-8 right-2 z-20 rounded-full bg-slate-950 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow-xl">
                Trending
              </div>

              <div className="absolute right-8 top-10 z-20 rounded-full bg-amber-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-slate-950 shadow-xl">
                Sale
              </div>

              <div className="relative mx-auto flex h-full max-w-xl items-center justify-center">
                <div className="absolute h-72 w-72 rounded-full bg-white/80 shadow-2xl sm:h-96 sm:w-96" />
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90"
                  alt="Premium branded running shoes offer"
                  className="relative z-10 w-full max-w-[560px] rotate-[-8deg] object-contain drop-shadow-2xl transition duration-700 animate-[bounce_6s_ease-in-out_infinite] group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferSection;