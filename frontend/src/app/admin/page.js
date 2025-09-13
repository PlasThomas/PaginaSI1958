import ProtectedRoute from '../components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">🔐 Panel de Administración</h1>
          <p className="text-gray-600 mb-6">Esta página es exclusiva para usuarios con rol de administrador</p>
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <p className="text-blue-800 font-medium">Funciones disponibles:</p>
            <ul className="text-blue-700 text-left mt-2 list-disc list-inside">
              <li>Gestión de usuarios</li>
              <li>Configuración del sistema</li>
              <li>Reportes avanzados</li>
              <li>Administración de permisos</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}