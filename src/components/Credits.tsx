import { motion } from "framer-motion";
import creditsImage from "../../Assets/CREDITOS.png";

export function Credits() {
  return (
    <section className="section credits" id="creditos">
      <motion.div
        className="credits__row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <figure className="credits__media">
          <img
            className="credits__image"
            src={creditsImage}
            alt="Imagen de créditos"
          />
        </figure>
        <div className="credits__content">
          <p className="credits__eyebrow">Créditos</p>
          <h2 className="credits__title">Taller Grupo 5</h2>
          <p className="credits__author">Arq. Flavio</p>
        </div>
      </motion.div>
    </section>
  );
}
