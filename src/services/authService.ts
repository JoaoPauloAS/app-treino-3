import { supabase } from '@/config/supabase';
import { logger } from '@/lib/logger';
import { loginSchema, registerSchema } from '@/lib/validation';
import { validateAndSanitize } from '@/lib/validation';

// Interface para dados de login
interface LoginCredentials {
  email: string;
  password: string;
}

// Interface para dados de registro
interface RegisterData extends LoginCredentials {
  confirmPassword: string;
}

// Contador para bloqueio temporário após tentativas de login malsucedidas
const loginAttempts = new Map<string, { count: number, lastAttempt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;                  // Máximo de tentativas
const LOGIN_LOCKOUT_TIME = 15 * 60 * 1000;     // 15 minutos em milissegundos

// Verifica se o email está bloqueado por muitas tentativas de login
function isLoginLocked(email: string): boolean {
  const attempts = loginAttempts.get(email);
  if (!attempts) return false;
  
  const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
  
  // Se passou tempo suficiente, limpa o contador
  if (timeSinceLastAttempt > LOGIN_LOCKOUT_TIME) {
    loginAttempts.delete(email);
    return false;
  }
  
  return attempts.count >= MAX_LOGIN_ATTEMPTS;
}

// Registra uma tentativa de login
function recordLoginAttempt(email: string, successful: boolean): void {
  if (successful) {
    // Reset em caso de sucesso
    loginAttempts.delete(email);
    return;
  }
  
  const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: 0 };
  loginAttempts.set(email, {
    count: attempts.count + 1,
    lastAttempt: Date.now()
  });
}

/**
 * Serviço de autenticação
 */
export const authService = {
  /**
   * Realiza o login do usuário
   */
  async login(credentials: LoginCredentials) {
    // Validação dos dados de entrada
    const validation = validateAndSanitize(loginSchema, credentials);
    if (!validation.success) {
      throw new Error('Dados de login inválidos');
    }
    
    const { email, password } = validation.data;
    
    // Verifica se a conta está bloqueada
    if (isLoginLocked(email)) {
      logger.auth('login', false, undefined, { email, reason: 'account_locked' });
      throw new Error('Conta temporariamente bloqueada por muitas tentativas. Tente novamente mais tarde.');
    }
    
    try {
      // Tenta fazer login no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        recordLoginAttempt(email, false);
        logger.auth('login', false, undefined, { email, reason: error.message });
        throw error;
      }
      
      recordLoginAttempt(email, true);
      logger.auth('login', true, data.user?.id, { email });
      
      return {
        user: data.user,
        session: data.session
      };
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Registra um novo usuário
   */
  async register(registerData: RegisterData) {
    // Validação dos dados de entrada
    const validation = validateAndSanitize(registerSchema, registerData);
    if (!validation.success) {
      throw new Error('Dados de registro inválidos');
    }
    
    const { email, password } = validation.data;
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        logger.auth('registration', false, undefined, { email, reason: error.message });
        throw error;
      }
      
      logger.auth('registration', true, data.user?.id, { email });
      
      return { 
        user: data.user,
        session: data.session
      };
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Faz logout do usuário atual
   */
  async logout() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      logger.auth('logout', false, undefined, { reason: error.message });
      throw error;
    }
    
    logger.auth('logout', true);
    return true;
  },
  
  /**
   * Verifica se o usuário está autenticado
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      logger.error('Error getting session', { error: error.message });
      throw error;
    }
    
    return data.session;
  },
  
  /**
   * Redefine a senha (envia email para redefinição)
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) {
      logger.auth('password-reset-request', false, undefined, { email, reason: error.message });
      throw error;
    }
    
    logger.auth('password-reset-request', true, undefined, { email });
    return true;
  },
  
  /**
   * Atualiza a senha do usuário
   */
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      logger.auth('password-update', false, undefined, { reason: error.message });
      throw error;
    }
    
    logger.auth('password-update', true);
    return true;
  }
};

export default authService; 