import { useEffect, useRef } from "react";
import { CAPABILITIES_VIDEO_SRC, HERO_VIDEO_SRC } from "../videoSources";
import heroPoster from "../../Assets/portadaJipijapa.jpg";

export function VideoBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLVideoElement>(null);
  const capRef = useRef<HTMLVideoElement>(null);
  const blendRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const heroPlayingRef = useRef(false);
  const capPlayingRef = useRef(false);

  useEffect(() => {
    const hero = heroRef.current;
    const cap = capRef.current;
    if (!hero || !cap) return;

    const tryPlay = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p !== undefined) p.catch(() => undefined);
    };

    const pauseVideo = (v: HTMLVideoElement) => {
      if (!v.paused) v.pause();
    };

    const isLowEndDevice =
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4 ||
      (navigator.hardwareConcurrency ?? 8) <= 4;

    backdropRef.current?.classList.toggle("video-backdrop--lite", isLowEndDevice);

    tryPlay(hero);
    heroPlayingRef.current = true;
    if (isLowEndDevice) {
      pauseVideo(cap);
      capPlayingRef.current = false;
    } else {
      tryPlay(cap);
      capPlayingRef.current = true;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stopTick = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const tick = () => {
      const current = blendRef.current;
      const target = targetRef.current;
      const next = reduceMotion ? target : current + (target - current) * 0.085;

      blendRef.current = Math.abs(target - next) < 0.001 ? target : next;
      cap.style.opacity = String(blendRef.current);

      const shouldRunCap = blendRef.current > 0.04;
      if (shouldRunCap && !capPlayingRef.current) {
        tryPlay(cap);
        capPlayingRef.current = true;
      } else if (!shouldRunCap && capPlayingRef.current) {
        pauseVideo(cap);
        capPlayingRef.current = false;
      }

      const shouldRunHero = blendRef.current < 0.98;
      if (shouldRunHero && !heroPlayingRef.current) {
        tryPlay(hero);
        heroPlayingRef.current = true;
      } else if (!shouldRunHero && heroPlayingRef.current) {
        pauseVideo(hero);
        heroPlayingRef.current = false;
      }

      if (Math.abs(targetRef.current - blendRef.current) >= 0.001) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      rafRef.current = 0;
    };

    const ensureTick = () => {
      if (rafRef.current !== 0) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const vh = window.innerHeight || 1;
      targetRef.current = Math.min(Math.max(window.scrollY / vh, 0), 1);
      ensureTick();
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        stopTick();
        pauseVideo(hero);
        pauseVideo(cap);
        heroPlayingRef.current = false;
        capPlayingRef.current = false;
        return;
      }
      if (blendRef.current < 0.98) {
        tryPlay(hero);
        heroPlayingRef.current = true;
      }
      if (blendRef.current > 0.04 || !isLowEndDevice) {
        tryPlay(cap);
        capPlayingRef.current = true;
      }
      ensureTick();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      stopTick();
    };
  }, []);

  return (
    <div ref={backdropRef} className="video-backdrop" aria-hidden="true">
      <video
        ref={heroRef}
        className="video-backdrop__video"
        src={HERO_VIDEO_SRC}
        poster={heroPoster}
        muted
        playsInline
        loop
        preload="metadata"
      />
      <video
        ref={capRef}
        className="video-backdrop__video video-backdrop__video--overlay"
        src={CAPABILITIES_VIDEO_SRC}
        muted
        playsInline
        loop
        preload="none"
      />
      <div className="video-backdrop__grade" />
      <div className="video-backdrop__beam" />
      <div className="video-backdrop__wash" />
      <div className="video-backdrop__vignette" />
      <div className="video-backdrop__grain" />
    </div>
  );
}
