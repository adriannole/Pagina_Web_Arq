import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Capabilities } from "./components/Capabilities";
import { Credits } from "./components/Credits";
import { Hero } from "./components/Hero";
import { VideoBackdrop } from "./components/VideoBackdrop";
import "./App.css";

const ServicePage = lazy(() => import("./pages/ServicePage").then((module) => ({ default: module.ServicePage })));

export default function App() {
  useEffect(() => {
    const isChrome = /Chrome\//.test(navigator.userAgent) && !/Edg\//.test(navigator.userAgent);
    document.body.classList.toggle("chrome-lite", isChrome);

    return () => {
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

function HomePage() {
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
}
