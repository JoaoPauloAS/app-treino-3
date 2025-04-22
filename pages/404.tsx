import React from 'react';
import Link from 'next/link';

/**
 * Página 404 segura para SSR que não depende de useLocation
 */
export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Página não encontrada</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
} 