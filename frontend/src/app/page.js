// app/page.js
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bienvenido a Mi Sitio Web sobre patos
          </h1>
          <p className="hero-description">
            Los patos son geniales
          </p>
          <div className="hero-buttons">
            <Link href="/login" className="btn btn-primary">
              Inicia sesion
            </Link>
            <Link href="/signup" className="btn btn-secondary">
              Crea una cuenta.
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Reemplaza con tu propia imagen */}
          <div className="placeholder-image">
            <span>Imagen Hero</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">¿Por qué Patos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Aves Rápidas</h3>
              <p>Soluciones optimizadas para máximo rendimiento y velocidad.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Diseño Moderno</h3>
              <p>Interfaces atractivas y user-friendly para tus usuarios.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Seguro y Confiable</h3>
              <p>Protección de datos y máxima seguridad en todos nuestros servicios.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}