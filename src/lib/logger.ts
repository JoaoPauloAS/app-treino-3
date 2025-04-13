type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEvent {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  userId?: string;
}

// Lista de campos sensíveis que não devem ser registrados
const SENSITIVE_FIELDS = [
  'password',
  'senha',
  'token',
  'apiKey',
  'secret',
  'creditCard',
  'cartão',
  'cvv',
  'ssn',
  'cpf',
  'rg',
];

/**
 * Remove campos sensíveis de objetos antes de registrá-los
 */
function sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
  if (!obj || typeof obj !== 'object') return obj;
  
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Verifica se o campo atual é sensível
    const isSensitiveField = SENSITIVE_FIELDS.some(field => 
      key.toLowerCase().includes(field.toLowerCase())
    );

    if (isSensitiveField) {
      // Substitui valores sensíveis
      sanitized[key] = '[REDACTED]';
    } else if (value && typeof value === 'object') {
      // Recursivamente sanitiza objetos aninhados
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Registra eventos com formatação adequada e sanitização de dados sensíveis
 */
export function log(
  level: LogLevel, 
  message: string, 
  context?: Record<string, unknown>,
  userId?: string
): void {
  const timestamp = new Date().toISOString();
  
  const sanitizedContext = context ? sanitizeObject(context) : undefined;
  
  const logEvent: LogEvent = {
    level,
    message,
    timestamp,
    context: sanitizedContext,
    userId,
  };

  // Em produção, poderia enviar para um serviço de logging
  if (process.env.NODE_ENV === 'production') {
    // Aqui adicionaríamos código para enviar logs para serviços como Sentry, LogRocket, etc.
    console[level](JSON.stringify(logEvent));
  } else {
    // Em desenvolvimento, mostra no console de forma mais legível
    console[level](`[${timestamp}] [${level.toUpperCase()}] ${userId ? `[User: ${userId}]` : ''} ${message}`, 
      sanitizedContext || '');
  }
}

// Métodos de conveniência para diferentes níveis de log
export const logger = {
  debug: (message: string, context?: Record<string, unknown>, userId?: string) => 
    log('debug', message, context, userId),
  
  info: (message: string, context?: Record<string, unknown>, userId?: string) => 
    log('info', message, context, userId),
  
  warn: (message: string, context?: Record<string, unknown>, userId?: string) => 
    log('warn', message, context, userId),
  
  error: (message: string, context?: Record<string, unknown>, userId?: string) => 
    log('error', message, context, userId),
    
  // Log específico para eventos de autenticação
  auth: (action: string, success: boolean, userId?: string, context?: Record<string, unknown>) => {
    const message = `Auth ${action} ${success ? 'succeeded' : 'failed'}`;
    log(success ? 'info' : 'warn', message, context, userId);
  },
  
  // Log para alterações de dados
  dataChange: (entity: string, action: 'create' | 'update' | 'delete', userId: string, context?: Record<string, unknown>) => {
    const message = `Data ${action} on ${entity}`;
    log('info', message, context, userId);
  }
}; 