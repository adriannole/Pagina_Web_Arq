import { useEffect, useRef } from "react";
import { CAPABILITIES_VIDEO_SRC, HERO_VIDEO_SRC } from "../videoSources";
import heroPoster from "../../Assets/portadaJipijapa.jpg";

export function VideoBackdrop() {
  const heroRef = useRef<HTMLVideoElement>(null);
  const capRef = useRef<HTMLVideoElement>(null);
  const blendRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const hero = heroRef.current;
    const cap = capRef.current;
    if (!hero || !cap) return;

    const tryPlay = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p !== undefined) p.catch(() => undefined);
    };

    tryPlay(hero);
    tryPlay(cap);

    const onScroll = () => {
      const vh = window.innerHeight || 1;
      targetRef.current = Math.min(Math.max(window.scrollY / vh, 0), 1);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      const k = reduceMotion ? 1 : 0.085;
      const b = blendRef.current + (targetRef.current - blendRef.current) * k;
      blendRef.current = Math.abs(targetRef.current - b) < 0.001 ? targetRef.current : b;
      cap.style.opacity = String(blendRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="video-backdrop" aria-hidden="true">
      <video
        ref={heroRef}
        className="video-backdrop__video"
        src={HERO_VIDEO_SRC}
        poster={heroPoster}
        muted
        playsInline
        loop
        preload="auto"
      />
      <video
        ref={capRef}
        className="video-backdrop__video video-backdrop__video--overlay"
        src={CAPABILITIES_VIDEO_SRC}
        muted
        playsInline
        loop
        preload="auto"
      />
      <div className="video-backdrop__grade" />
      <div className="video-backdrop__beam" />
      <div className="video-backdrop__wash" />
      <div className="video-backdrop__vignette" />
      <div className="video-backdrop__grain" />
    </div>
  );
}
