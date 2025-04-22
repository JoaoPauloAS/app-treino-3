import dynamic from 'next/dynamic';

// Importar o componente dinamicamente sem SSR para evitar erros
const ProfileComponent = dynamic(
  () => import('@/pages/ProfilePage'),
  { ssr: false }
);

export default function Profile() {
  return <ProfileComponent />;
} 