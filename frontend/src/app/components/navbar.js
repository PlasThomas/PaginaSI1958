import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          MiSitio
        </Link>
        <div className="nav-menu">
          <Link href="/" className="nav-link">
            Inicio
          </Link>
          <Link href="/acerca" className="nav-link">
            Acerca
          </Link>
          <Link href="/servicios" className="nav-link">
            Servicios
          </Link>
          <Link href="/contacto" className="nav-link">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}