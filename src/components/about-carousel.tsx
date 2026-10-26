import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ambiente from "@/assets/ambiente.jpg";

// Coloque suas fotos em src/assets/sobre/ (jpg, jpeg, png ou webp).
// Elas aparecem sozinhas no carrossel, em ordem alfabética: 01.jpg, 02.jpg, 03.jpg...
const modules = import.meta.glob("../assets/sobre/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const ownPhotos = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src);

const slides = ownPhotos.length
  ? ownPhotos.map((src, i) => ({ src, alt: `Foto ${i + 1} do Mar & Brasa` }))
  : [{ src: ambiente, alt: "Representação ilustrativa de um ambiente de restaurante contemporâneo" }];

export function AboutCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const many = slides.length > 1;

  return (
    <div className="about-photos">
      <div className="about-carousel" ref={emblaRef}>
        <div className="about-carousel-track">
          {slides.map((slide, i) => (
            <div className="about-carousel-slide" key={slide.src}>
              <img src={slide.src} alt={slide.alt} loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
      </div>

      {many && (
        <>
          <button type="button" className="about-arrow about-arrow-prev" onClick={() => emblaApi?.scrollPrev()} aria-label="Foto anterior">
            <ArrowLeft size={20} />
          </button>
          <button type="button" className="about-arrow about-arrow-next" onClick={() => emblaApi?.scrollNext()} aria-label="Próxima foto">
            <ArrowRight size={20} />
          </button>
          <div className="about-dots">
            {slides.map((_, i) => (
              <button
                type="button"
                key={i}
                className={i === selected ? "is-active" : ""}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir para a foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="about-photo-caption">UM LUGAR PARA VIVER BONS MOMENTOS</div>
    </div>
  );
}
