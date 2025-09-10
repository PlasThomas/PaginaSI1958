// app/login/page.js
'use client'; // Necesario porque usamos useState

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  // Estados para almacenar los valores de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook para navegar entre páginas
  const router = useRouter();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    setIsLoading(true);
    
    // Aquí iría la lógica real de autenticación
    // Por ahora simulamos un login exitoso después de 1 segundo
    setTimeout(() => {
      console.log('Email:', email);
      console.log('Password:', password);
      setIsLoading(false);
      router.push('/dashboard'); // Redirige al dashboard después del login
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Card del formulario */}
      <div className="login-card">
        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">Bienvenido de vuelta</p>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Campo Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="tu@email.com"
              required
              disabled={isLoading}
            />
          </div>

          {/* Campo Contraseña */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Tu contraseña"
              required
              disabled={isLoading}
            />
          </div>

          {/* Botón de enviar */}
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Enlaces adicionales */}
        <div className="login-links">
          <Link href="/olvide-password" className="link">
            ¿Olvidaste tu contraseña?
          </Link>
          <p className="register-text">
            ¿No tienes cuenta?{' '}
            <Link href="/signup" className="link">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}