// Este arquivo é usado apenas durante o desenvolvimento com Vite
// Para produção, o Next.js usa as páginas da pasta /pages

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Verificar se estamos no ambiente do cliente (browser)
// e não no ambiente de SSR do Next.js
if (typeof window !== 'undefined' && document.getElementById("root")) {
  createRoot(document.getElementById("root")!).render(<App />);
}

export default App; // Exportar para possível uso em páginas Next
