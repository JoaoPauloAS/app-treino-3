import dynamic from 'next/dynamic';

// Importar o componente dinamicamente sem SSR para evitar erros
const ProgressComponent = dynamic(
  () => import('@/pages/ProgressPage'),
  { ssr: false }
);

export default function Progress() {
  return <ProgressComponent />;
} 