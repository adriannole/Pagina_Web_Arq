import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import visualRef from "../../Assets/portadaJipijapa.jpg";

const actions = [
  {
    label: "Cartografía",
    hint: "Lectura territorial y capas de contexto.",
    slug: "cartografia",
  },
  {
    label: "Propuesta",
    hint: "Concepto arquitectónico y organización espacial.",
    slug: "propuesta",
  },
  {
    label: "Ubicación",
    hint: "Implantación, accesos y relación con el entorno.",
    slug: "ubicacion",
  },
  {
    label: "Propuesta gráfica",
    hint: "Lenguaje visual, diagramas y narrativa de proyecto.",
    slug: "propuesta-grafica",
  },
] as const;

// useInView hook using IntersectionObserver instead of Framer Motion's whileInView.
// IntersectionObserver runs on a separate thread and doesn't trigger React re-renders.
function useRevealOnScroll(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion preference
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
            // Once visible, stop observing — matches framer-motion's once:true
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "-12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export const Capabilities = memo(function Capabilities() {
  const sectionRef = useRevealOnScroll(0.1) as React.RefObject<HTMLElement>;
  const boardRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);

  // Stagger rail items using CSS custom property instead of Framer Motion stagger
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

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

    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="section capabilities"
      id="capacidades"
    >
      <div className="capabilities__header">
        <p
          className="capabilities__eyebrow glass-pill glass-pill--light cap-reveal cap-reveal--0"
          data-visible={undefined}
        >
          Capacidades
        </p>
        <h2 className="capabilities__title cap-reveal cap-reveal--1">
          Servicios y conceptos
        </h2>
        <p className="capabilities__subtitle cap-reveal cap-reveal--2">
          Plataforma de trabajo para diseñar desde el territorio: análisis, concepto y comunicación del proyecto.
        </p>
      </div>

      <div
        ref={boardRef}
        className="capabilities__board cap-board"
      >
        <figure className="capabilities__left cap-reveal-item">
          <div className="capabilities__left-inner">
            <img
              className="capabilities__image"
              src={visualRef}
              alt="Referencia arquitectónica de Jipijapa"
              loading="lazy"
              decoding="async"
            />
            <div className="capabilities__visual-glow" aria-hidden />
            <div className="capabilities__visual-grid" aria-hidden />
            <p className="capabilities__left-kicker">Referencia territorial</p>
          </div>
        </figure>

        <nav
          ref={railRef as React.RefObject<HTMLElement>}
          className="capabilities__rail"
          aria-label="Líneas de trabajo"
        >
          {actions.map((action, index) => (
            <Link
              key={action.slug}
              to={`/servicios/${action.slug}`}
              className="cap-rail cap-rail-item"
              data-route={action.slug}
              style={{ "--rail-i": index } as React.CSSProperties}
            >
              <span className="cap-rail__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="cap-rail__content">
                <span className="cap-rail__label">{action.label}</span>
                <span className="cap-rail__hint">{action.hint}</span>
              </span>
              <span className="cap-rail__line" aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
});
