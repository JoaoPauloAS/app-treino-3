import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ClientOnly from "../components/ClientOnly";

// Carregar ClientNavigation apenas no lado do cliente
const ClientNavigation = dynamic(
  () => import('../components/ClientNavigation'),
  { ssr: false }
);

// Carregar o conteúdo do Dashboard apenas no cliente
const DashboardContent = dynamic(
  () => import('@/pages/Index'),
  { ssr: false, loading: () => <p>Carregando...</p> }
);

/**
 * Versão segura para SSR da página inicial
 * Carrega apenas a UI básica no servidor e o resto no cliente
 */
export default function HomePage() {
  return (
    <div className="fitness-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workout Tracker</h1>
      </div>

      <Button className="fitness-btn w-full mb-6 py-6 flex items-center justify-center gap-2 text-lg">
        <PlusCircle className="h-5 w-5" />
        Iniciar Novo Treino
      </Button>

      <ClientOnly>
        <DashboardContent />
      </ClientOnly>
      
      <ClientNavigation />
    </div>
  );
}