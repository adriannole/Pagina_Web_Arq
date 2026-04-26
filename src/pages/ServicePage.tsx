import { Link, useParams } from "react-router-dom";

type ServiceKey = "cartografia" | "propuesta" | "ubicacion" | "propuesta-grafica";

type ServiceContent = {
  title: string;
  subtitle: string;
  bullets: string[];
};

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
