import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Información de la empresa */}
        <div className="footer-info">
          <h3>Patos</h3>
          <p>Aun no hay estetica clara</p>
        </div>
        
        <div className="footer-links">
          <Link href="/acerca">Acerca</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
      
      </div>
    </footer>
  );
}