# Política de Segurança

## Relatando Vulnerabilidades

Agradecemos por ajudar a melhorar a segurança deste projeto. Se você descobrir uma vulnerabilidade, por favor, informe-nos o mais rápido possível para que possamos tomar as devidas medidas.

### Como Relatar

1. **Não crie Issues públicas para vulnerabilidades de segurança**
2. Envie um e-mail para [contato@exemplo.com] com detalhes da vulnerabilidade
3. Inclua etapas para reprodução ou prova de conceito, se possível
4. Permita-nos tempo suficiente para responder antes de qualquer divulgação pública

## Atualizações de Segurança

Para manter este projeto seguro, nós:

1. Mantemos dependências atualizadas regularmente
2. Utilizamos overrides para dependências transientes com vulnerabilidades conhecidas
3. Executamos auditorias de segurança com ferramentas automatizadas
4. Revisamos código para possíveis problemas de segurança

## Práticas Recomendadas

### Desenvolvendo

1. Manter todas as dependências atualizadas (`npm update` regularmente)
2. Executar verificações de segurança (`npm audit` e `npm audit fix`)
3. Utilizar ferramentas de análise estática

### Implantando

1. Não armazenar segredos em código
2. Utilizar variáveis de ambiente para configurações sensíveis
3. Implementar cabeçalhos de segurança em respostas HTTP

## Versões Suportadas

Atualmente, mantemos atualizações de segurança para:

| Versão | Status            |
| ------ | ----------------- |
| 0.1.x   | ✅ Suportada       |

## Histórico de Vulnerabilidades

Mantemos um histórico de vulnerabilidades corrigidas para referência:

- 2025-04-13: Corrigidas vulnerabilidades em várias dependências transientes 