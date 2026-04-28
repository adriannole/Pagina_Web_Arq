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
  thumbnail?: string;
};

const cartografiaPdfs: CartografiaPdf[] = [
  {
    title: "Dinamicas Economicas y Uso del Suelo",
    category: "Lamina de Dinamica Espacial",
    description: "Análisis de actividades económicas, usos de suelo y dinámicas sociales que configuran el territorio.",
    file: "/img/lamina-dinamica-espacial.webp",
    thumbnail: "/img/foto1.webp",
  },
  {
    title: "Analisis Social y de Vulnerabilidad",
    category: "Lamina de Dinamica Espacial",
    description: "Mapa de actores, redes sociales, vulnerabilidades y potencialidades comunitarias del sector.",
    file: "/img/lamina-dinamica-espacial2.webp",
    thumbnail: "/img/foto2.webp",
  },
  {
    title: "Morfologia Urbana",
    category: "Lamina de Analisis Urbano",
    description: "Cartografía de formas urbanas, tipologías edificatorias, vacíos y estructuras espaciales del entorno.",
    file: "/img/Morfologia-Urbana.webp",
    thumbnail: "/img/foto1.webp",
  },
  {
    title: "Mapeo del Usuario y Dinamica Espacial",
    category: "Diagnostico Morfologico y Social",
    description: "Cartografía de flujos, recorridos, percepciones y relaciones sociales para entender la experiencia del usuario.",
    file: "/img/Laminapercepcion delusuario.webp",
    thumbnail: "/img/foto2.webp",
  },
  {
    title: "Analisis de Flujo, Puntos Criticos y Esrategias de Intervencion",
    category: "Lamina de Accesos",
    description: "Mapa de accesos, flujos peatonales y vehiculares, puntos críticos de congestión y estrategias de mejora urbana.",
    file: "/img/laminadeaccesos.webp",
    thumbnail: "/img/foto1.webp",
  },
  {
    title: "Mapeo del Usuario y Dinamica Espacial",
    category: "Diagnostico Morfologico y Social",
    description: "Cartografía de flujos, recorridos, percepciones y relaciones sociales para entender la experiencia del usuario.",
    file: "/img/Laminapercepciondelusuario.webp",
    thumbnail: "/img/foto2.webp",
  },
  {
    title: "Cartografia de Infraestructuras Verde",
    category: "Diagnostico de especies zonificacion y nodos de conexion urbana",
    description: "Mapa de vegetación, especies nativas, corredores verdes y nodos de conexión ecológica para integrar naturaleza y ciudad.",
    file: "/img/Cartografiadeinfrestructurasverdes.webp",
    thumbnail: "/img/foto1.webp",
  },
  {
    title: "Determinantes ambientales y confort termico",
    category: "Lamina Climatologica",
    description: "Cartografía de condiciones climáticas, asoleamiento, vientos predominantes y estrategias de confort térmico para el diseño ambientalmente responsable.",
    file: "/img/LAMINACLIMATICA.webp",
    thumbnail: "/img/foto2.webp",
  },
  {
    title: "Analisis de la Imagen Urbana: Elementos de Composicion",
    category: "Lamina de Vistas",
    description: "Cartografía de vistas, hitos visuales, elementos compositivos y estrategias de diseño para potenciar la imagen urbana y la identidad del lugar.",
    file: "/img/LAMINADEVISTAS.webp",
    thumbnail: "/img/foto1.webp",
  },
];

const cartografiaHeroStack = [
  "/img/lamina-dinamica-espacial.webp",
  "/img/Morfologia-Urbana.webp",
  "/img/LAMINACLIMATICA.webp",
] as const;

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

const isImageFile = (file: string) => /\.(avif|webp|png|jpe?g|gif|svg)$/i.test(file);

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
        <div className="cartografia__hero-backdrop" aria-hidden>
          <img src={cartografiaHeroImage} alt="" loading="eager" decoding="async" />
        </div>
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
            Índice
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
              <img src={cartografiaHeroStack[1]} alt="" loading="lazy" decoding="async" />
            </span>
            <span className="cartografia__hero-photo cartografia__hero-photo--middle">
              <img src={cartografiaHeroStack[2]} alt="" loading="lazy" decoding="async" />
            </span>
            <img src={cartografiaHeroStack[0]} alt="" loading="eager" decoding="async" />
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
          <h2>Láminas Cartografía</h2>
          <span>
            Serie visual de análisis territorial presentada como portafolio técnico y arquitectónico.
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
                    <img
                      src={pdf.thumbnail ?? cartografiaHeroImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
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
              {isImageFile(activePdf.file) ? (
                <div className="cartografia-modal__image-stage">
                  <img src={activePdf.file} alt={activePdf.title} loading="lazy" decoding="async" />
                </div>
              ) : (
                <iframe className="cartografia-modal__frame" title={activePdf.title} src={activePdf.file} loading="lazy" />
              )}
              <a className="cartografia-modal__open" href={activePdf.file} target="_blank" rel="noreferrer">
                {isImageFile(activePdf.file) ? "Abrir imagen en nueva pestaña" : "Abrir PDF en nueva pestaña"}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
