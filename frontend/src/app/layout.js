// app/layout.js
import './globals.css';
import Navbar from './components/navbar';
import Footer from './components/footer';

export const metadata = {
  title: 'Esqueleto',
  description: 'Prueba',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}