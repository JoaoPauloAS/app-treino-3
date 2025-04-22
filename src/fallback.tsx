import React from 'react';
import Link from 'next/link';

/**
 * Página de fallback genérica para qualquer componente com problemas
 * Esta página não tem nenhuma dependência externa e é garantidamente segura
 */
const Fallback = ({ title = 'Página Temporária', message = 'Esta página está temporariamente indisponível.' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex flex-col gap-4">
          <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Voltar para a página inicial
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Workout Tracker - Modo de manutenção
      </div>
    </div>
  );
};

export default Fallback; 