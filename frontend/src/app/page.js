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
            Bienvenido a Mi Sitio Web
          </h1>
          <p className="hero-description">
            Descubre soluciones innovadoras y servicios de calidad 
            para hacer crecer tu negocio en la era digital.
          </p>
          <div className="hero-buttons">
            <Link href="/servicios" className="btn btn-primary">
              Nuestros Servicios
            </Link>
            <Link href="/contacto" className="btn btn-secondary">
              Contactar Ahora
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

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Rápido y Eficiente</h3>
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a nuestros clientes satisfechos hoy mismo.</p>
          <Link href="/contacto" className="btn btn-large">
            Empezar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}