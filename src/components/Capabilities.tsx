import { motion } from "framer-motion";
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

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const railContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const railItem = {
  hidden: { opacity: 0, x: 26 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Capabilities() {
  return (
    <section className="section capabilities" id="capacidades">
      <div className="capabilities__header">
        <motion.p
          className="capabilities__eyebrow glass-pill glass-pill--light"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Capacidades
        </motion.p>
        <motion.h2
          className="capabilities__title"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Servicios y conceptos
        </motion.h2>
        <motion.p
          className="capabilities__subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Plataforma de trabajo para diseñar desde el territorio: análisis, concepto y comunicación del proyecto.
        </motion.p>
      </div>

      <motion.div
        className="capabilities__board"
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.figure
          className="capabilities__left"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          <div className="capabilities__left-inner">
            <img className="capabilities__image" src={visualRef} alt="Referencia arquitectónica de Jipijapa" />
            <div className="capabilities__visual-glow" aria-hidden />
            <div className="capabilities__visual-grid" aria-hidden />
            <p className="capabilities__left-kicker">Referencia territorial</p>

          </div>
        </motion.figure>

        <motion.nav
          className="capabilities__rail"
          aria-label="Líneas de trabajo"
          variants={railContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {actions.map((action, index) => (
            <motion.a
              key={action.slug}
              href="#"
              className="cap-rail"
              data-route={action.slug}
              variants={railItem}
              whileHover={{ x: 10, scale: 1.01 }}
              onClick={(event) => event.preventDefault()}
            >
              <span className="cap-rail__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="cap-rail__content">
                <span className="cap-rail__label">{action.label}</span>
                <span className="cap-rail__hint">{action.hint}</span>
              </span>
              <span className="cap-rail__line" aria-hidden />
            </motion.a>
          ))}
        </motion.nav>
      </motion.div>
    </section>
  );
}
