import React, { useState, useEffect } from "react";

function Hero_Section() {
  const slides = [
    {
      title: "SS Collection",
      subtitle: "Nagpur's Largest Multi-Brand Fashion & Sports Store",
      description:
        "Discover premium footwear, fashion apparel, accessories and sports equipment from the world's leading brands.",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1920",
      brands: ["Nike", "Puma", "Reebok", "Raymond", "Levi's"],
      followers: "101K+ Instagram Followers",
      button1: "Shop Collection",
      button2: "Explore Brands",
    },
    {
      title: "Premium Footwear",
      subtitle: "Step Into Style",
      description:
        "Explore sneakers, sports shoes, running shoes and casual footwear from top brands.",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1920",
      button1: "Shop Footwear",
      button2: "View Collection",
    },
    {
      title: "Fashion Collection",
      subtitle: "Wear Confidence",
      description:
        "Premium shirts, jeans, jackets and lifestyle fashion for every occasion.",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920",
      button1: "Shop Fashion",
      button2: "New Arrivals",
    },
    {
      title: "Sports Gear",
      subtitle: "Gear Up For Victory",
      description:
        "Cricket, badminton, football and fitness equipment for professionals and enthusiasts.",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1920",
      button1: "Shop Sports",
      button2: "Explore Gear",
    },
    {
      title: "Latest Arrivals",
      subtitle: "Fresh Styles Every Week",
      description:
        "Stay ahead with newly launched fashion trends and footwear collections.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920",
      button1: "View New Arrivals",
      button2: "Shop Now",
    },
    {
      title: "Mega Sale",
      subtitle: "Up To 50% OFF",
      description:
        "Exclusive discounts on fashion, footwear and sports accessories.",
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1920",
      button1: "Shop Deals",
      button2: "View Offers",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden mt-36" style={{ minHeight: '70vh', backgroundColor: '#111' }}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 flex min-h-[75vh] items-center px-6 py-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl text-white">
            <p className="uppercase tracking-[4px] text-yellow-400 font-semibold mb-4 text-xs sm:text-sm md:text-base">
              {slides[currentSlide].subtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-8">
              {slides[currentSlide].description}
            </p>

            {currentSlide === 0 && (
              <>
                <div className="flex flex-wrap items-center gap-3 text-pink-400 mb-6">
                  <span className="text-lg">📸</span>
                  <span className="font-medium text-sm md:text-base">
                    {slides[0].followers}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                  {slides[0].brands.map((brand, index) => (
                    <span
                      key={index}
                      className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-full text-xs md:text-sm"
                    >
                      {brand}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 md:gap-10 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">101K+</h3>
                    <p className="text-gray-300 text-xs md:text-sm">Followers</p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">6+</h3>
                    <p className="text-gray-300 text-xs md:text-sm">Stores</p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">4.7★</h3>
                    <p className="text-gray-300 text-xs md:text-sm">Rating</p>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                {slides[currentSlide].button1}
              </button>
              <button className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10 hover:border-white">
                {slides[currentSlide].button2}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-10 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero_Section;
