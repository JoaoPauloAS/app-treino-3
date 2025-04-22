const express = require('express');
const path = require('path');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Verifica se existe uma build do Next.js
const hasBuild = fs.existsSync(path.join(__dirname, '.next'));

if (hasBuild) {
  console.log('Modo produção: Servindo a build do Next.js');
  
  // Servir arquivos estáticos da pasta .next
  app.use('/_next', express.static(path.join(__dirname, '.next')));
  
  // Servir arquivos estáticos da pasta public
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Todas as outras requisições são redirecionadas para o arquivo index do Next.js
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '.next/server/pages/index.html'));
  });
} else {
  console.log('Modo desenvolvimento: Criando proxy para o servidor Next.js');
  
  // Se não existe build, cria um proxy para o servidor de desenvolvimento
  app.use('/', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    ws: true,
    logLevel: 'warn'
  }));
}

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 