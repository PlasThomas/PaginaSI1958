// app/register/page.js
'use client'; // Necesario porque usamos useState

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '../util/apis';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  setError(null);

  // Validaciones básicas en cliente
  if (formData.password !== formData.confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }
  if (formData.password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres');
    return;
  }

  setIsLoading(true);
  try {
    const userData = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword 
    };

    const res = await signup(userData);

    if (!res) {
      setError('Respuesta inválida del servidor');
      return;
    }

    if (!res.success) {
      setError(res.error || 'Error al registrar usuario');
      return;
    }

      alert(res.message || 'Registro exitoso'); // Puedes reemplazar alert por un modal si quieres
      router.push('/login');
  } catch (err) {
    console.error('Error en signup:', err);
    setError('Error de red, intenta de nuevo más tarde');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Crear Cuenta</h1>
        <p className="register-subtitle">Únete a nuestra comunidad</p>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Nombre y Apellido en la misma línea */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Tu nombre"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Tu apellido"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="tu@email.com"
              required
              disabled={isLoading}
            />
          </div>

          {/* Contraseña */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Mínimo 6 caracteres"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Repite tu contraseña"
              required
              disabled={isLoading}
            />
          </div>

          {/* Botón de registro */}
          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Enlace para ir al login */}
        <div className="register-links">
          <p className="login-text">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}