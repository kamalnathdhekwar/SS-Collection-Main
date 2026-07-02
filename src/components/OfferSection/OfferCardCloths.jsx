import {
  ArrowRight,
  BadgePercent,
  Clock3,
  Gift,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Truck,
  Zap,
} from "lucide-react";

function OfferSection() {
  const countdown = [
    { value: "02", label: "DAYS" },
    { value: "18", label: "HRS" },
    { value: "34", label: "MINS" },
    { value: "59", label: "SECS" },
  ];

  const features = [
    { label: "100% Original", icon: ShieldCheck },
    { label: "Easy Returns", icon: RefreshCcw },
    { label: "Free Shipping", icon: Truck },
    { label: "Secure Payments", icon: ShieldCheck },
  ];

  return (
    <section className="w-full bg-slate-50 px-3 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1480px]">
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-violet-50" />
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute -bottom-28 right-16 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl" />
          <div className="absolute left-[43%] top-0 hidden h-full w-40 -skew-x-12 bg-violet-200/40 lg:block" />
          <div className="absolute left-[47%] top-0 hidden h-full w-24 -skew-x-12 bg-white/50 lg:block" />

          <div className="relative grid min-h-[640px] grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative order-1 min-h-[520px] overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-violet-700 px-4 pb-8 pt-7 sm:min-h-[620px] sm:px-8 lg:order-1 lg:min-h-[640px] lg:px-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.18),transparent_30%)]" />
              <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-white/20" />
              <div className="absolute bottom-10 left-10 h-20 w-20 rounded-full bg-white/10 blur-xl" />

              <div className="relative z-20 mx-auto flex max-w-xl items-center justify-between gap-4 text-white sm:max-w-2xl">
                <span className="text-2xl font-black italic tracking-tight sm:text-4xl">NIKE</span>
                <span className="h-10 w-px bg-white/40" />
                <span className="text-2xl font-black tracking-tight sm:text-4xl">PUMA</span>
                <span className="h-10 w-px bg-white/40" />
                <span className="font-serif text-2xl font-black tracking-tight sm:text-4xl">Raymond</span>
              </div>

              <div className="relative z-10 mx-auto mt-8 h-[390px] max-w-xl sm:h-[480px] lg:h-[500px]">
                <div className="absolute left-1/2 top-16 z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-white/20 blur-2xl sm:h-80 sm:w-80" />

                <img
                  src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=90"
                  alt="Black premium jacket"
                  className="absolute left-[24%] top-4 z-30 h-72 w-52 -rotate-3 rounded-3xl object-cover shadow-2xl transition duration-500 animate-[bounce_7s_ease-in-out_infinite] group-hover:scale-105 sm:h-96 sm:w-72"
                />

                <img
                  src="https://images.unsplash.com/photo-1520975682031-a9a3f3a5db8f?auto=format&fit=crop&w=700&q=90"
                  alt="Blue denim jacket"
                  className="absolute left-0 top-20 z-20 h-60 w-44 rotate-[-8deg] rounded-3xl object-cover shadow-2xl transition duration-500 animate-[bounce_8s_ease-in-out_infinite] group-hover:scale-105 sm:h-80 sm:w-60"
                />

                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=90"
                  alt="Light blue shirt"
                  className="absolute right-0 top-16 z-20 h-64 w-44 rotate-6 rounded-3xl object-cover shadow-2xl transition duration-500 animate-[bounce_7.5s_ease-in-out_infinite] group-hover:scale-105 sm:h-80 sm:w-60"
                />

                <img
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=90"
                  alt="Folded blue jeans"
                  className="absolute bottom-6 left-[14%] z-40 h-40 w-52 rotate-[-10deg] rounded-2xl object-cover shadow-2xl transition duration-500 group-hover:scale-105 sm:h-48 sm:w-72"
                />

                <img
                  src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=90"
                  alt="Folded maroon shirt"
                  className="absolute bottom-6 right-[8%] z-50 h-40 w-52 rotate-6 rounded-2xl object-cover shadow-2xl transition duration-500 group-hover:scale-105 sm:h-48 sm:w-72"
                />

                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=90"
                  alt="Folded white shirts"
                  className="absolute bottom-0 right-[2%] z-30 h-32 w-44 rotate-3 rounded-2xl object-cover shadow-xl transition duration-500 group-hover:scale-105 sm:h-40 sm:w-60"
                />

                <div className="absolute left-7 top-14 z-50 grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-violet-700 text-center text-xl font-black text-white shadow-2xl ring-4 ring-white/40 animate-pulse">
                  MEGA<br />SALE
                </div>

                <div className="absolute right-3 top-24 z-50 grid h-24 w-24 place-items-center rounded-full bg-slate-950 text-center text-sm font-black uppercase text-white shadow-2xl sm:h-28 sm:w-28">
                  Limited<br />Stock!
                </div>
              </div>

              <div className="relative z-20 mx-auto mt-2 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-xl backdrop-blur-md sm:text-sm">
                <Star className="h-4 w-4 fill-white" />
                Premium Brands • Premium Quality • Premium You
              </div>
            </div>

            <div className="relative order-2 flex items-center px-5 py-8 sm:px-8 lg:order-2 lg:px-10 xl:px-12">
              <div className="mx-auto w-full max-w-xl lg:max-w-none">
                <div className="mb-5 inline-flex animate-pulse items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-purple-500/25">
                  <Zap className="h-4 w-4 fill-amber-300 text-amber-300" />
                  Limited Time Offer
                </div>

                <p className="text-2xl font-black uppercase tracking-tight text-slate-950 sm:text-3xl">UP TO</p>

                <h2 className="mt-1 bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700 bg-clip-text text-7xl font-black leading-none tracking-tight text-transparent sm:text-8xl xl:text-9xl">
                  70% OFF
                </h2>

                <h3 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight text-slate-950 sm:text-4xl">
                  On Branded Clothing
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xl font-black uppercase text-slate-950 sm:text-2xl">
                  <span>Jeans</span>
                  <span className="text-purple-600">•</span>
                  <span>Jackets</span>
                  <span className="text-purple-600">•</span>
                  <span>Shirts</span>
                </div>

                <div className="mt-6 grid max-w-lg grid-cols-3 items-center gap-4">
                  <div className="text-3xl font-black italic text-slate-950 sm:text-4xl">NIKE</div>
                  <div className="border-x border-slate-200 text-center text-3xl font-black text-slate-950 sm:text-4xl">PUMA</div>
                  <div className="bg-red-600 px-3 py-2 text-center font-serif text-2xl font-black text-white sm:text-3xl">Raymond</div>
                </div>

                <p className="mt-6 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
                  Upgrade your wardrobe with top brands you love! Premium quality styles at unbeatable prices.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-fuchsia-300 bg-white/80 shadow-sm backdrop-blur">
                  <div className="grid grid-cols-[76px_1fr] sm:grid-cols-[90px_1fr_1fr]">
                    <div className="grid place-items-center bg-gradient-to-br from-indigo-600 to-purple-600 p-5 text-white">
                      <Tag className="h-9 w-9" />
                    </div>

                    <div className="border-r border-dashed border-fuchsia-300 p-4">
                      <p className="text-xl font-black uppercase text-slate-950 sm:text-2xl">Buy 2 Get 1 Free*</p>
                      <p className="mt-1 text-sm font-black uppercase text-slate-900 sm:text-base">On All Clothing</p>
                    </div>

                    <div className="col-span-2 flex items-center gap-4 border-t border-fuchsia-100 p-4 sm:col-span-1 sm:border-t-0">
                      <Gift className="h-10 w-10 shrink-0 text-fuchsia-600" />
                      <div>
                        <p className="text-base font-black uppercase text-slate-950">Free Item</p>
                        <p className="text-sm font-bold uppercase text-slate-700">Lowest Price</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 text-sm font-black uppercase text-slate-950">
                    <Clock3 className="h-5 w-5" />
                    Hurry! Offer Ends In
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {countdown.map((item, index) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className="rounded-xl bg-purple-100 px-3 py-2 text-center shadow-sm">
                          <p className="text-2xl font-black text-purple-700">{item.value}</p>
                          <p className="text-[10px] font-black uppercase text-purple-600">{item.label}</p>
                        </div>
                        {index < countdown.length - 1 && (
                          <span className="hidden text-xl font-black text-purple-600 sm:block">:</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-700 to-fuchsia-600 px-7 text-base font-black uppercase text-white shadow-xl shadow-purple-500/25 transition duration-300 hover:scale-[1.03]"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-purple-500 bg-white px-7 text-base font-black uppercase text-purple-700 shadow-sm transition duration-300 hover:scale-[1.03] hover:bg-purple-700 hover:text-white"
                  >
                    Explore Collection
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl bg-white/90 p-3 shadow-xl backdrop-blur sm:grid-cols-4">
                  {features.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-2 border-slate-200 px-2 py-2 sm:border-r sm:last:border-r-0">
                      <Icon className="h-7 w-7 shrink-0 text-purple-700" />
                      <span className="text-xs font-black uppercase leading-tight text-slate-950 sm:text-sm">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferSection;