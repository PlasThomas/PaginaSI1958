'use client';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContxt';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Bienvenido</h1>
          <p className="text-2xl mt-4">Hola, {user?.name}!</p>
          <p className="text-gray-600 mt-2">Rol: {user?.role}</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}