import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import cartografiaHeroImage from "../../Assets/portadaJipijapa.jpg";

type ServiceKey = "cartografia" | "propuesta" | "ubicacion" | "propuesta-grafica";

type ServiceContent = {
  title: string;
  subtitle: string;
  bullets: string[];
};

type CartografiaPdf = {
  title: string;
  category: string;
  description: string;
  file: string;
};

const cartografiaPdfs: CartografiaPdf[] = [
  {
    title: "Lectura territorial",
    category: "Contexto 01",
    description: "Capas base para entender escala urbana, paisaje y condiciones iniciales del entorno.",
    file: "/pdfs/cartografia/01-lectura-territorial.pdf",
  },
  {
    title: "Topografia y relieve",
    category: "Contexto 02",
    description: "Análisis de pendientes, cotas y comportamiento físico del terreno para la implantación.",
    file: "/pdfs/cartografia/02-topografia-relieve.pdf",
  },
  {
    title: "Morfologia urbana",
    category: "Contexto 03",
    description: "Relación entre llenos, vacíos, tejidos construidos y bordes activos del sector.",
    file: "/pdfs/cartografia/03-morfologia-urbana.pdf",
  },
  {
    title: "Movilidad y accesos",
    category: "Conexiones 04",
    description: "Flujos peatonales, vehiculares, rutas de llegada y nodos de conexión relevantes.",
    file: "/pdfs/cartografia/04-movilidad-accesos.pdf",
  },
  {
    title: "Asoleamiento y clima",
    category: "Ambiente 05",
    description: "Lectura ambiental para orientar decisiones de confort, sombra y exposición solar.",
    file: "/pdfs/cartografia/05-asoleamiento-clima.pdf",
  },
  {
    title: "Equipamientos cercanos",
    category: "Programa 06",
    description: "Mapa de servicios, hitos y piezas urbanas que estructuran la vida cotidiana.",
    file: "/pdfs/cartografia/06-equipamientos-cercanos.pdf",
  },
  {
    title: "Normativa y restricciones",
    category: "Tecnico 07",
    description: "Síntesis de condicionantes normativas, retiros, alturas y parámetros de ocupación.",
    file: "/pdfs/cartografia/07-normativa-restricciones.pdf",
  },
  {
    title: "Oportunidades de implantacion",
    category: "Estrategia 08",
    description: "Cruce de datos para detectar zonas de potencial, tensión y respuesta arquitectónica.",
    file: "/pdfs/cartografia/08-oportunidades-implantacion.pdf",
  },
  {
    title: "Sintesis cartografica",
    category: "Cierre 09",
    description: "Documento integrador con criterios de diseño derivados del análisis territorial.",
    file: "/pdfs/cartografia/09-sintesis-cartografica.pdf",
  },
];

const serviceContent: Record<ServiceKey, ServiceContent> = {
  cartografia: {
    title: "Cartografía",
    subtitle: "Lectura territorial y capas de contexto para decidir con base técnica.",
    bullets: [
      "Diagnóstico de condiciones físicas, normativas y ambientales del lugar.",
      "Identificación de oportunidades y restricciones de implantación.",
      "Mapa de relaciones urbanas: accesos, flujos y hitos del entorno.",
    ],
  },
  propuesta: {
    title: "Propuesta",
    subtitle: "Concepto arquitectónico y organización espacial alineados al programa.",
    bullets: [
      "Definición de estrategia formal, volumétrica y funcional del proyecto.",
      "Zonificación por usos y jerarquía de espacios principales y de apoyo.",
      "Criterios de materialidad y confort para guiar el desarrollo del diseño.",
    ],
  },
  ubicacion: {
    title: "Ubicación",
    subtitle: "Implantación, accesos y relación con el entorno inmediato.",
    bullets: [
      "Análisis de orientación, asoleamiento y relación con el contexto construido.",
      "Resolución de ingresos peatonales, vehiculares y logística de operación.",
      "Ajuste del proyecto al terreno y a la escala barrial/urbana.",
    ],
  },
  "propuesta-grafica": {
    title: "Propuesta gráfica",
    subtitle: "Lenguaje visual, diagramas y narrativa técnica del proyecto.",
    bullets: [
      "Sistema gráfico para comunicar decisiones de diseño con claridad.",
      "Láminas de apoyo: esquemas, diagramas y vistas de lectura rápida.",
      "Estructura narrativa para presentaciones académicas o de cliente.",
    ],
  },
};

export function ServicePage() {
  const { slug } = useParams<{ slug: ServiceKey }>();
  const detail = slug ? serviceContent[slug as ServiceKey] : undefined;

  if (!detail) {
    return (
      <div className="service-page">
        <div className="service-page__panel">
          <p className="service-page__eyebrow">Servicio</p>
          <h1 className="service-page__title">Contenido no encontrado</h1>
          <p className="service-page__subtitle">El enlace no corresponde a un servicio válido.</p>
          <Link to="/" className="service-page__back">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (slug === "cartografia") {
    return <CartografiaPortfolio />;
  }

  return (
    <div className="service-page">
      <div className="service-page__panel">
        <p className="service-page__eyebrow">Servicio</p>
        <h1 className="service-page__title">{detail.title}</h1>
        <p className="service-page__subtitle">{detail.subtitle}</p>
        <ul className="service-page__list">
          {detail.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link to="/" className="service-page__back">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function CartografiaPortfolio() {
  const [activePdf, setActivePdf] = useState<CartografiaPdf | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const indexY = useTransform(scrollYProgress, [0, 0.28], [0, shouldReduceMotion ? 0 : -120]);
  const indexOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.2]);

  useEffect(() => {
    if (!activePdf) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePdf(null);
      }
    };

    document.body.classList.add("body--modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("body--modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePdf]);

  return (
    <main className="cartografia">
      <div className="cartografia__ambient" aria-hidden>
        <span className="cartografia__orb cartografia__orb--one" />
        <span className="cartografia__orb cartografia__orb--two" />
        <span className="cartografia__orb cartografia__orb--three" />
        <span className="cartografia__grid" />
      </div>

      <header className="cartografia__topbar">
        <Link to="/" className="cartografia__brand">
          Jipijapa
        </Link>
        <a className="cartografia__toplink" href="#documentos">
          Recorrer portafolio
        </a>
      </header>

      <section className="cartografia__hero" aria-labelledby="cartografia-title">
        <motion.div
          className="cartografia__hero-inner"
          style={{ y: indexY, opacity: indexOpacity }}
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="cartografia__eyebrow">Arquitectura / Análisis territorial</p>
          <h1 id="cartografia-title" className="cartografia__title">
            Portafolio Cartográfico
          </h1>
          <p className="cartografia__intro">
            Una secuencia profesional de 9 láminas PDF que se despliegan como un portafolio arquitectónico continuo:
            claro, técnico y con acentos rojos sobre una base hueso.
          </p>

          <motion.ol
            className="cartografia__index"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.22 } },
            }}
          >
            {cartografiaPdfs.map((pdf, index) => (
              <motion.li
                key={pdf.file}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <a href={`#pdf-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {pdf.title}
                </a>
              </motion.li>
            ))}
          </motion.ol>

          <a className="cartografia__scroll-hint" href="#documentos" aria-label="Desplazarse a los documentos">
            <span>Scroll</span>
            <i aria-hidden />
          </a>
        </motion.div>

        <div className="cartografia__hero-stage" aria-hidden>
          <motion.figure
            className="cartografia__hero-preview"
            initial={{ opacity: 0, y: 28, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateY: -8 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="cartografia__hero-photo cartografia__hero-photo--back">
              <img src={cartografiaHeroImage} alt="" loading="eager" decoding="async" />
            </span>
            <span className="cartografia__hero-photo cartografia__hero-photo--middle">
              <img src={cartografiaHeroImage} alt="" loading="eager" decoding="async" />
            </span>
            <img src={cartografiaHeroImage} alt="" loading="eager" decoding="async" />
            <span className="cartografia__hero-preview-grid" />
            <span className="cartografia__hero-preview-label">Cartografia / Jipijapa</span>
          </motion.figure>
          <motion.span
            className="cartografia__glass-shard cartografia__glass-shard--large"
            animate={shouldReduceMotion ? undefined : { y: [0, -18, 0], rotate: [8, 13, 8] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="cartografia__glass-shard cartografia__glass-shard--small"
            animate={shouldReduceMotion ? undefined : { y: [0, 16, 0], rotate: [-16, -10, -16] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      <section className="cartografia__documents" id="documentos" aria-label="Documentos PDF de cartografía">
        <motion.div
          className="cartografia__portfolio-head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Portafolio completo</p>
          <h2>9 láminas, una lectura territorial.</h2>
          <span>
            Cada documento aparece como una pieza editorial del mismo expediente; al hacer scroll, las láminas se
            acumulan como un portafolio físico hasta completar la serie.
          </span>
        </motion.div>

        <div className="cartografia__sequence">
          {cartografiaPdfs.map((pdf, index) => (
            <motion.article
              className="cartografia-card"
              id={`pdf-${index + 1}`}
              key={pdf.file}
              initial={{ opacity: 0, y: 70, scale: 0.94, rotateX: shouldReduceMotion ? 0 : 6 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.34 }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="cartografia-card__folio">{String(index + 1).padStart(2, "0")}</span>
              <button className="cartografia-card__button" type="button" onClick={() => setActivePdf(pdf)}>
                <span className="cartografia-card__halo" aria-hidden />
                <span className="cartografia-card__media" aria-hidden>
                  <span className="cartografia-card__sheet">
                    <span className="cartografia-card__map-line cartografia-card__map-line--one" />
                    <span className="cartografia-card__map-line cartografia-card__map-line--two" />
                    <span className="cartografia-card__map-line cartografia-card__map-line--three" />
                    <span className="cartografia-card__pin" />
                  </span>
                </span>
                <span className="cartografia-card__content">
                  <span className="cartografia-card__meta">
                    <span>Lámina {String(index + 1).padStart(2, "0")}</span>
                    {pdf.category}
                  </span>
                  <span className="cartografia-card__title">{pdf.title}</span>
                  <span className="cartografia-card__description">{pdf.description}</span>
                  <span className="cartografia-card__cta">Abrir preview</span>
                </span>
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section
        className="cartografia__archive"
        aria-labelledby="cartografia-archive-title"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cartografia__archive-copy">
          <p>Recursos del expediente</p>
          <h2 id="cartografia-archive-title">Descarga y consulta las 9 láminas PDF.</h2>
          <span>
            El recorrido visual funciona como presentación, y esta biblioteca final concentra los documentos para una
            revisión técnica directa.
          </span>
        </div>

        <div className="cartografia__archive-grid">
          {cartografiaPdfs.map((pdf, index) => (
            <a className="cartografia-resource" href={pdf.file} target="_blank" rel="noreferrer" key={pdf.file}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{pdf.title}</strong>
              <small>{pdf.category}</small>
            </a>
          ))}
        </div>
      </motion.section>

      <footer className="site-foot cartografia__footer" id="contacto">
        <p className="site-foot__text">Jipijapa, Quito — arquitectura y territorio.</p>
        <a className="site-foot__link" href="mailto:hola@ejemplo.com">
          hola@ejemplo.com
        </a>
      </footer>

      <AnimatePresence>
        {activePdf ? (
          <motion.div
            className="cartografia-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Preview de ${activePdf.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="cartografia-modal__backdrop" type="button" onClick={() => setActivePdf(null)}>
              <span className="sr-only">Cerrar preview</span>
            </button>
            <motion.div
              className="cartografia-modal__panel"
              initial={{ opacity: 0, y: 36, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.96 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cartografia-modal__header">
                <div>
                  <p>{activePdf.category}</p>
                  <h2>{activePdf.title}</h2>
                </div>
                <button type="button" onClick={() => setActivePdf(null)} aria-label="Cerrar preview">
                  Cerrar
                </button>
              </div>
              <iframe className="cartografia-modal__frame" title={activePdf.title} src={activePdf.file} loading="lazy" />
              <a className="cartografia-modal__open" href={activePdf.file} target="_blank" rel="noreferrer">
                Abrir PDF en nueva pestaña
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
