/**
 * Biblioteca de utilidades de segurança
 */

/**
 * Sanitiza string para prevenir XSS
 * Converte caracteres especiais em entities HTML
 */
export function sanitizeHTML(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Gera um token CSRF aleatório
 */
export function generateCSRFToken(): string {
  // Aqui geramos um token aleatório
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);
  
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Valida token CSRF
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) {
    return false;
  }
  
  // Comparação segura em tempo constante para evitar timing attacks
  let mismatch = 0;
  const tokenLength = Math.min(token.length, storedToken.length);
  
  for (let i = 0; i < tokenLength; i++) {
    mismatch |= token.charCodeAt(i) ^ storedToken.charCodeAt(i);
  }
  
  return mismatch === 0 && token.length === storedToken.length;
}

/**
 * Gera uma política de segurança de conteúdo (CSP)
 */
export function generateCSP(): string {
  return `
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob:;
    font-src 'self';
    connect-src 'self' https://*.supabase.co;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
  `.replace(/\s+/g, ' ').trim();
}

/**
 * Verifica a força de uma senha
 * @returns Pontuação de 0 a 100
 */
export function checkPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;
  
  // Comprimento mínimo
  if (password.length < 8) {
    feedback.push('A senha deve ter pelo menos 8 caracteres');
  } else {
    score += 20;
  }
  
  // Contém letra maiúscula
  if (/[A-Z]/.test(password)) {
    score += 20;
  } else {
    feedback.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  
  // Contém letra minúscula
  if (/[a-z]/.test(password)) {
    score += 20;
  } else {
    feedback.push('A senha deve conter pelo menos uma letra minúscula');
  }
  
  // Contém número
  if (/[0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push('A senha deve conter pelo menos um número');
  }
  
  // Contém caractere especial
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push('A senha deve conter pelo menos um caractere especial');
  }
  
  return { score, feedback };
}

/**
 * Proteção contra data leaks
 * Sanitiza objeto removendo propriedades sensíveis antes de enviar ao cliente
 */
export function sanitizeUserData(userData: any): any {
  if (!userData) return userData;
  
  // Cria um novo objeto omitindo campos sensíveis
  const { 
    password, 
    recovery_token, 
    confirmation_token, 
    email_confirm_token, 
    phone_confirm_token,
    ...safeData 
  } = userData;
  
  return safeData;
}

/**
 * Verifica se uma URL é segura (evita redirecionamentos maliciosos)
 */
export function isSafeRedirectUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    // Verifica se é uma URL relativa
    if (url.startsWith('/') && !url.startsWith('//')) {
      return true;
    }
    
    // Verifica se é do mesmo domínio
    const currentHost = window.location.hostname;
    const redirectHost = new URL(url).hostname;
    
    return currentHost === redirectHost;
  } catch (error) {
    return false;
  }
} 