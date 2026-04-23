import { motion } from "framer-motion";

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.07,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  return (
    <section className="section hero hero--cinematic" id="inicio">
      <div className="hero__bottom">
        <div className="hero__col hero__col--main">
          <h1 className="hero__headline">
            <motion.span className="hero__headline-sans" custom={0} variants={rise} initial="hidden" animate="show">
              Arquitectura
            </motion.span>
          </h1>
          <motion.p className="hero__tagline" custom={2} variants={rise} initial="hidden" animate="show">
            Proyecto claro, escala humana y materialidad anclada en Jipijapa.
          </motion.p>
        </div>

        <div className="hero__col hero__col--aside">
          <motion.a
            className="hero__schedule"
            href="#contacto"
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
          >
            Agendar conversación
          </motion.a>
        </div>
      </div>
    </section>
  );
}
