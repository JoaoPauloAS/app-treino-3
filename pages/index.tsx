import dynamic from 'next/dynamic';

// Importar o Dashboard dinamicamente sem SSR para evitar erros 
// de incompatibilidade entre client/server
const DashboardComponent = dynamic(
  () => import('@/pages/Index'),
  { ssr: false }
);

export default function HomePage() {
  return <DashboardComponent />;
}