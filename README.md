# AppTreino3 - Backend

Backend da aplicação de treinos inspirada no app Hevy, desenvolvido com Next.js, TypeScript e Supabase.

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)

## 📋 Funcionalidades

- Autenticação via Supabase
- CRUD de treinos
- Biblioteca de exercícios
- Timer de descanso
- Acompanhamento de progresso
- Internacionalização (PT-BR e EN-US)

## 🛠️ Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/apptreino3-based-main.git
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

4. Preencha as variáveis de ambiente no arquivo `.env.local` com suas credenciais do Supabase

5. Execute o projeto em desenvolvimento
```bash
npm run dev
```

## 📦 Estrutura do Projeto

```
src/
├── app/                    # Rotas da API
├── components/             # Componentes React
├── config/                 # Configurações
├── contexts/               # Contextos React
├── lib/                    # Bibliotecas e utilitários
├── models/                 # Modelos de dados
├── scripts/                # Scripts de utilidade
├── services/               # Serviços
├── types/                  # Tipos TypeScript
└── utils/                  # Funções utilitárias
```

## 🔒 Autenticação

A autenticação é feita via Supabase Auth, utilizando JWT para proteger as rotas privadas.

## 📊 Banco de Dados

O banco de dados é gerenciado pelo Supabase, utilizando PostgreSQL. O schema está definido em `supabase/schema.sql`.

## 🌐 Internacionalização

A aplicação suporta dois idiomas:
- Português Brasileiro (PT-BR)
- Inglês Americano (EN-US)

As traduções estão definidas em `src/utils/translations.ts`.

## 🛡️ Segurança

A aplicação implementa diversas medidas de segurança:

### Proteção de Dados Sensíveis
- Variáveis de ambiente para chaves secretas (usando `.env.local`)
- Chaves de serviço protegidas e não expostas no frontend
- Sanitização de dados sensíveis em logs

### Autenticação e Autorização
- JWT para autenticação via Supabase
- Políticas de Row Level Security (RLS) no banco de dados
- Proteção contra ataques de força bruta com limite de tentativas de login
- Middleware para proteção de rotas privadas

### Validação de Dados
- Validação de entrada usando Zod
- Sanitização para prevenção de XSS e injeção de código
- Tipagem forte com TypeScript

### Cabeçalhos de Segurança
- HTTP Strict Transport Security (HSTS)
- Content Security Policy (CSP)
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy

### Backup e Recuperação
- Scripts automatizados de backup (em `src/scripts/backup.ts`)
- Rotação de backups antigos
- Sistema de log para monitoramento

### Verificação de Dependências
- Script de verificação de vulnerabilidades (em `src/scripts/security-check.ts`)
- Atualização automática de dependências críticas
- Análise de uso inadequado de dependências

### CSRF e XSS
- Tokens CSRF para formulários
- Sanitização de conteúdo gerado pelo usuário
- Políticas de segurança para prevenção de XSS

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 🔍 Verificação de Segurança

Para executar a verificação de segurança das dependências:
```bash
npx ts-node src/scripts/security-check.ts
```

Para executar um backup manual:
```bash
npx ts-node src/scripts/backup.ts
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 