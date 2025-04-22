const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Redirecionar qualquer rota para a página inicial
app.get('*', (req, res) => {
  res.redirect('/');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor em manutenção rodando na porta ${PORT}`);
}); 