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

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 