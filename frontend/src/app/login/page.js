'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../util/apis';
import { useAuth } from '../context/AuthContxt'; 

export default function LoginPage() {
  // Estados para almacenar los valores de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [error, setError] = useState(null);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });

      if (!response.success) {
        setError(response.error);
      } else {
        console.log('Usuario logueado:', response.user);
        authLogin(response.user, response.token);
        router.push(response.user.role === "admin" ? "/admin" : "/users");
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
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