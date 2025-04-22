import dynamic from 'next/dynamic';

// Importar o componente dinamicamente sem SSR para evitar erros
const ExercisesComponent = dynamic(
  () => import('@/pages/ExercisesPage'),
  { ssr: false }
);

export default function Exercises() {
  return <ExercisesComponent />;
} 