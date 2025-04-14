import { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface RouterWrapperProps {
  children: ReactNode;
}

export default function RouterWrapper({ children }: RouterWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Só renderiza no cliente para evitar erros de SSR
  if (!isMounted) {
    return null;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
} 