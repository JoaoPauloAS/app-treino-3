// novo-servidor.js - Servidor básico HTTP sem Next.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3002; // Porta definida para 3002

// Criar uma pasta public caso não exista
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Criar uma página HTML de exemplo
const testHtmlPath = path.join(publicDir, 'test.html');
fs.writeFileSync(testHtmlPath, `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teste de Servidor</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #0070f3; }
    .success { background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>Servidor Express Básico (Novo)</h1>
  <div class="success">
    <p>✅ Servidor funcionando corretamente!</p>
    <p>Se você consegue ver esta página, significa que o servidor Express está funcionando.</p>
    <p>Hora atual: <strong>${new Date().toLocaleString()}</strong></p>
  </div>
</body>
</html>
`);

// Servir arquivos estáticos da pasta public
app.use(express.static(publicDir));

// Rota raiz para redirecionar para nossa página de teste
app.get('/', (req, res) => {
  res.redirect('/test.html');
});

// Iniciar o servidor HTTP
app.listen(PORT, () => {
  console.log(`
=======================================================
 🚀 Servidor básico NOVO rodando em http://localhost:${PORT}
=======================================================

Este é um servidor Express simples sem Next.js.
Se ele funcionar, significa que o problema está 
no Next.js ou em sua configuração.

Acesse: http://localhost:${PORT}
=======================================================
`);
}); 