import { memo, useEffect, useRef } from "react";
import creditsImage from "../../Assets/CREDITOS.jpeg";

export const Credits = memo(function Credits() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section credits" id="creditos">
      <div ref={rowRef} className="credits__row credits-reveal">
        <figure className="credits__media">
          <img
            className="credits__image"
            src={creditsImage}
            alt="Imagen de créditos"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="credits__content">
          <p className="credits__eyebrow">Créditos</p>
          <h2 className="credits__title">Taller Grupo 5</h2>
          <p className="credits__author">Arq. Flavio</p>
        </div>
      </div>
    </section>
  );
});
