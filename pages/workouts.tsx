import dynamic from 'next/dynamic';

// Importar o componente dinamicamente sem SSR para evitar erros
const WorkoutsComponent = dynamic(
  () => import('@/pages/WorkoutsPage'),
  { ssr: false }
);

export default function Workouts() {
  return <WorkoutsComponent />;
} 