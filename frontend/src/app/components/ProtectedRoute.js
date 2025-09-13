'use client';

import { useAuth } from '../context/AuthContxt';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ 
  children, 
  requiredRole = null, 
  requiredRoles = [], 
  minRole = null,
  fallbackPath = '/unauthorized'
}) {
  const { user, loading, hasRole, hasAnyRole, hasMinRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Si no hay usuario, redirigir a login
      if (!user) {
        router.push('/login');
        return;
      }

      // Verificar según el tipo de requerimiento
      let hasAccess = true;

      if (requiredRole) {
        hasAccess = hasRole(requiredRole);
      } else if (requiredRoles.length > 0) {
        hasAccess = hasAnyRole(requiredRoles);
      } else if (minRole) {
        hasAccess = hasMinRole(minRole);
      }

      if (!hasAccess) {
        router.push(fallbackPath);
      }
    }
  }, [user, loading, router, requiredRole, requiredRoles, minRole, fallbackPath]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Verificar acceso final (por si el usuario se recarga la página)
  let hasAccess = true;
  if (requiredRole) {
    hasAccess = hasRole(requiredRole);
  } else if (requiredRoles.length > 0) {
    hasAccess = hasAnyRole(requiredRoles);
  } else if (minRole) {
    hasAccess = hasMinRole(minRole);
  }

  if (!hasAccess) {
    return null;
  }

  return children;
}