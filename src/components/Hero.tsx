import { memo, useEffect, useRef } from "react";

// CSS-based enter animations instead of Framer Motion.
// Reason: framer-motion uses JS to drive animations which requires React
// reconciliation + style calculation on every frame during the animation.
// CSS @keyframes run entirely on the compositor thread — zero JS cost.
//
// The trade-off: we lose the JS-controllable variants but gain guaranteed
// 60fps entry animations even on slow Chrome instances.

export const Hero = memo(function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger CSS entry animations once the component mounts.
  // Using a ref instead of state prevents re-renders.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    // rAF ensures the browser has painted at least one frame before animating
    const rafId = requestAnimationFrame(() => {
      section.dataset.ready = "true";
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section hero hero--cinematic"
      id="inicio"
    >
      <div className="hero__bottom">
        <div className="hero__col hero__col--main">
          <h1 className="hero__headline">
            <span className="hero__headline-sans hero__anim hero__anim--0">
              CLUSTER JIPIJAPA
            </span>
          </h1>
          <p className="hero__tagline hero__anim hero__anim--2">
            Proyecto claro, escala humana y materialidad anclada en Jipijapa.
          </p>
        </div>

        <div className="hero__col hero__col--aside">
          <a
            className="hero__schedule hero__anim hero__anim--3"
            href="#contacto"
          >
            Agendar conversación
          </a>
        </div>
      </div>
    </section>
  );
});
