import {
  sanitizeHTML,
  generateCSRFToken,
  validateCSRFToken,
  generateCSP,
  checkPasswordStrength,
  sanitizeUserData,
  isSafeRedirectUrl
} from '@/lib/security';

// Mock para window.crypto.getRandomValues
const mockRandomValues = jest.fn((arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i % 256;  // valores previsíveis para testes
  }
  return arr;
});

describe('Security Library', () => {
  beforeEach(() => {
    // Configurar mocks
    const mockCrypto = {
      getRandomValues: mockRandomValues,
      subtle: {}
    };
    
    // @ts-ignore - estamos substituindo deliberadamente crypto para testes
    window.crypto = mockCrypto;
  });

  describe('sanitizeHTML', () => {
    it('deve escapar caracteres HTML perigosos', () => {
      const dirtyInput = '<script>alert("XSS");</script>';
      const cleanOutput = sanitizeHTML(dirtyInput);
      
      expect(cleanOutput).not.toContain('<script>');
      expect(cleanOutput).toEqual('&lt;script&gt;alert(&quot;XSS&quot;);&lt;/script&gt;');
    });

    it('deve manter texto simples inalterado', () => {
      const input = 'Texto normal sem HTML';
      expect(sanitizeHTML(input)).toEqual(input);
    });

    it('deve escapar múltiplos caracteres especiais', () => {
      expect(sanitizeHTML('a & b < c > d " e \' f')).toEqual('a &amp; b &lt; c &gt; d &quot; e &#039; f');
    });
  });

  describe('generateCSRFToken', () => {
    it('deve gerar um token de 64 caracteres (32 bytes em hex)', () => {
      const token = generateCSRFToken();
      expect(token).toHaveLength(64);
      // Verifica se é um token hexadecimal válido
      expect(token).toMatch(/^[0-9a-f]+$/);
    });
  });

  describe('validateCSRFToken', () => {
    it('deve validar tokens idênticos', () => {
      const token = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
      expect(validateCSRFToken(token, token)).toBe(true);
    });

    it('deve rejeitar tokens diferentes', () => {
      const token1 = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
      const token2 = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdee'; // último caractere diferente
      
      expect(validateCSRFToken(token1, token2)).toBe(false);
    });

    it('deve rejeitar um token vazio', () => {
      const token = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
      
      expect(validateCSRFToken('', token)).toBe(false);
      expect(validateCSRFToken(token, '')).toBe(false);
      expect(validateCSRFToken('', '')).toBe(false);
    });
  });

  describe('generateCSP', () => {
    it('deve retornar uma string CSP válida', () => {
      const csp = generateCSP();
      
      expect(typeof csp).toBe('string');
      expect(csp.length).toBeGreaterThan(0);
      
      // Verificar se contém diretivas essenciais
      expect(csp).toContain('default-src');
      expect(csp).toContain('script-src');
      expect(csp).toContain('connect-src');
    });
  });

  describe('checkPasswordStrength', () => {
    it('deve retornar pontuação 100 para uma senha forte', () => {
      const result = checkPasswordStrength('StrongP@ssw0rd');
      
      expect(result.score).toBe(100);
      expect(result.feedback).toHaveLength(0);
    });

    it('deve retornar feedback quando a senha for fraca', () => {
      const result = checkPasswordStrength('weak');
      
      expect(result.score).toBeLessThan(100);
      expect(result.feedback.length).toBeGreaterThan(0);
    });

    it('deve verificar corretamente critérios individuais', () => {
      // Sem maiúscula
      expect(checkPasswordStrength('password123!')).toHaveProperty('score', 80);
      
      // Sem minúscula
      expect(checkPasswordStrength('PASSWORD123!')).toHaveProperty('score', 80);
      
      // Sem número
      expect(checkPasswordStrength('Password!')).toHaveProperty('score', 80);
      
      // Sem caractere especial
      expect(checkPasswordStrength('Password123')).toHaveProperty('score', 80);
      
      // Muito curta
      expect(checkPasswordStrength('Pa1!')).toHaveProperty('score', 80);
    });
  });

  describe('sanitizeUserData', () => {
    it('deve remover campos sensíveis de um objeto de usuário', () => {
      const userData = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'secret',
        recovery_token: 'recovery-token',
        confirmation_token: 'confirmation-token'
      };
      
      const sanitized = sanitizeUserData(userData);
      
      expect(sanitized).toHaveProperty('id');
      expect(sanitized).toHaveProperty('name');
      expect(sanitized).toHaveProperty('email');
      
      expect(sanitized).not.toHaveProperty('password');
      expect(sanitized).not.toHaveProperty('recovery_token');
      expect(sanitized).not.toHaveProperty('confirmation_token');
    });

    it('deve retornar null para input null', () => {
      expect(sanitizeUserData(null)).toBeNull();
    });
  });

  describe('isSafeRedirectUrl', () => {
    beforeEach(() => {
      // Mock para window.location
      Object.defineProperty(window, 'location', {
        value: {
          hostname: 'example.com'
        },
        writable: true
      });
    });

    it('deve considerar URLs relativas como seguras', () => {
      expect(isSafeRedirectUrl('/dashboard')).toBe(true);
      expect(isSafeRedirectUrl('/users/profile')).toBe(true);
    });

    it('deve rejeitar URLs relativas com protocolo', () => {
      expect(isSafeRedirectUrl('//evil.com')).toBe(false);
    });

    it('deve considerar URLs do mesmo domínio como seguras', () => {
      expect(isSafeRedirectUrl('https://example.com/page')).toBe(true);
    });

    it('deve rejeitar URLs de domínios diferentes', () => {
      expect(isSafeRedirectUrl('https://evil.com/page')).toBe(false);
    });

    it('deve rejeitar URLs malformadas', () => {
      expect(isSafeRedirectUrl('javascript:alert(1)')).toBe(false);
    });
  });
}); 