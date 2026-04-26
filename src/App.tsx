import { Navigate, Route, Routes } from "react-router-dom";
import { Capabilities } from "./components/Capabilities";
import { Credits } from "./components/Credits";
import { Hero } from "./components/Hero";
import { VideoBackdrop } from "./components/VideoBackdrop";
import { ServicePage } from "./pages/ServicePage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios/:slug" element={<ServicePage />} />
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
