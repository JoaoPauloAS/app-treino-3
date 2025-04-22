const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3002;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Proxy para o servidor de desenvolvimento Next.js
// Isso pressupõe que você já iniciou o servidor Next.js com "npm run dev" em outra janela
app.use('/', createProxyMiddleware({
  target: 'http://localhost:3001', // Next.js rodando em outra porta
  changeOrigin: true,
  ws: true, // suporte a WebSockets
}));

app.listen(PORT, () => {
  console.log(`
=======================================================
 🚀 Servidor de testes rodando em http://localhost:${PORT}
=======================================================

Para ver sua aplicação:
1. Abra outra janela de terminal e execute:
   npm run dev -- -p 3001

2. Acesse http://localhost:${PORT} no seu navegador

=======================================================
`);
}); 