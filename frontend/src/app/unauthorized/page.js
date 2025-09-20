'use client'; // Si usas App Router, asegúrate de tener esto

import Link from 'next/link'; // ✅ Importar Link

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl text-red-600">Acceso Denegado</h1>
        <p className="text-gray-600">No tienes permisos para ver esta página</p>
        <Link href="/" className="text-blue-500 mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}