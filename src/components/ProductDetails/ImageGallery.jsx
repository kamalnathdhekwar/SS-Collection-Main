import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useState } from "react";

function ImageGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="lg:sticky lg:top-24 lg:self-start">
      <div className="grid gap-3 md:grid-cols-[82px_minmax(0,1fr)]">
        <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-slate-100 transition ${
                activeIndex === index ? "border-rose-500 ring-2 ring-rose-100" : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>

        <div className="group relative order-1 overflow-hidden rounded-md bg-slate-100 md:order-2">
          <img
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt || productName}
            className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(ImageGallery);