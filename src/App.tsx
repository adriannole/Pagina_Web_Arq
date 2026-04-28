import { lazy, memo, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Capabilities } from "./components/Capabilities";
import { Credits } from "./components/Credits";
import { Hero } from "./components/Hero";
import { VideoBackdrop } from "./components/VideoBackdrop";
import "./App.css";

const ServicePage = lazy(() =>
  import("./pages/ServicePage").then((module) => ({ default: module.ServicePage }))
);

export default function App() {
  useEffect(() => {
    // Precise Chrome detection (not Edge, not Opera, not Samsung browser)
    const ua = navigator.userAgent;
    const isChrome =
      /Chrome\//.test(ua) &&
      !/Edg\//.test(ua) &&
      !/OPR\//.test(ua) &&
      !/SamsungBrowser\//.test(ua);

    if (isChrome) {
      document.documentElement.classList.add("chrome-lite");
      document.body.classList.add("chrome-lite");
    }

    return () => {
      document.documentElement.classList.remove("chrome-lite");
      document.body.classList.remove("chrome-lite");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/servicios/:slug"
        element={
          <Suspense fallback={<div className="route-loading" aria-label="Cargando" />}>
            <ServicePage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// memo prevents re-render when parent re-renders — Hero/Capabilities/Credits are static
const HomePage = memo(function HomePage() {
  return (
    <div className="app">
      <VideoBackdrop />
      <div className="app__content">
        <header className="topbar topbar--dark">
          <a className="topbar__wordmark" href="#inicio">
            Jipijapa
          </a>
          <nav className="topbar__links" aria-label="Principal">
            <a href="#inicio">Territorio</a>
            <a href="#capacidades">Servicios</a>
            <a href="#manifiesto">Manifiesto</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </header>
        <main>
          <Hero />
          <Capabilities />
          <Credits />
        </main>
        <footer className="site-foot" id="contacto">
          <p className="site-foot__text">Jipijapa, Quito — arquitectura y territorio.</p>
          <a className="site-foot__link" href="mailto:hola@ejemplo.com">
            hola@ejemplo.com
          </a>
        </footer>
      </div>
    </div>
  );
});
