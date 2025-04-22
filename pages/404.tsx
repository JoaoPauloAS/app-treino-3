import dynamic from 'next/dynamic';

// Importar o componente dinamicamente sem SSR para evitar erros
const NotFoundComponent = dynamic(
  () => import('@/pages/NotFound'),
  { ssr: false }
);

export default function Custom404() {
  return <NotFoundComponent />;
} 