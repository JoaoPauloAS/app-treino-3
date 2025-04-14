import { beforeEach, describe, expect, it, jest, afterEach } from '@jest/globals';
import { mockSupabaseClient } from '../mocks/supabase';
import * as loggerModule from '@/lib/logger';
import * as supabase from '@/config/supabase';

// Adiciona tipagem específica ao invés de any
type ErrorType = Error | unknown;

// Mock do supabase
jest.mock('@/config/supabase', () => ({
  supabaseClient: mockSupabaseClient
}));

// Mock do logger
jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }
}));

// Remove o tipo ValidateFunction não utilizado
// Adiciona tipos específicos ao invés de any
type ValidationResultSuccess<T> = { success: true; data: T };
type ValidationResultError = { success: false; error: string };

// Import after mocks
import authService from '@/services/authService';

describe('Auth Service', () => {
  // Define mock user and session data for tests
  const mockUser = {
    id: '13c5be68-b725-4a77-b0b9-65a1e5d5b559',
    email: 'test@example.com',
    created_at: new Date().toISOString(),
  };
  
  const mockSession = {
    user: mockUser,
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1681732800000); // Mock para data fixa
    
    // Configure validate mock com sucesso por padrão
    authService.validateLoginData.mockImplementation((schema: any, data: any): ValidationResultSuccess<typeof data> => ({
      success: true,
      data
    }));
    
    // Reset Supabase auth mocks to default successful responses
    mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: mockUser,
        session: mockSession
      },
      error: null
    });
    
    mockSupabaseClient.auth.signUp.mockResolvedValue({
      data: {
        user: mockUser,
        session: mockSession
      },
      error: null
    });
    
    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: { 
        session: {
          user: mockUser,
          access_token: 'mock-access-token',
        }
      },
      error: null
    });
    
    mockSupabaseClient.auth.signOut.mockResolvedValue({ error: null });
    mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({ error: null });
    mockSupabaseClient.auth.updateUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    });

    // Setup mocks
    (loggerModule.logger.auth as jest.Mock).mockImplementation(loggerModule.logger.auth);
    (loggerModule.logger.error as jest.Mock).mockImplementation(loggerModule.logger.error);
    (loggerModule.logger.info as jest.Mock).mockImplementation(loggerModule.logger.info);
    (loggerModule.logger.warn as jest.Mock).mockImplementation(loggerModule.logger.warn);
    
    // Em vez de espiar loginAttempts, vamos mock o módulo inteiro
    // e substituir as funções que manipulam o loginAttempts
    authService.login.mockImplementation(async (credentials) => {
      const validation = authService.validateLoginData(null, credentials);
      if (!validation.success) {
        throw new Error('Dados de login inválidos');
      }
      
      const { email, password } = validation.data;
      
      const { data, error } = await mockSupabaseClient.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        loggerModule.logger.auth('login', false, undefined, { email, reason: error.message });
        throw error;
      }
      
      loggerModule.logger.auth('login', true, data.user?.id, { email });
      
      return {
        user: data.user,
        session: data.session
      };
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('deve realizar login com sucesso', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'ValidPassword1!'
      };
  
      const result = await authService.login(credentials);
  
      expect(authService.validateLoginData).toHaveBeenCalledWith(expect.any(Object), credentials);
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'ValidPassword1!'
      });
      expect(loggerModule.logger.auth).toHaveBeenCalledWith(
        'login', true, mockUser.id, { email: 'test@example.com' }
      );
      expect(result).toEqual({
        user: mockUser,
        session: mockSession
      });
    });

    it('deve rejeitar credenciais inválidas', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'senha-errada'
      };

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValueOnce({
        data: { user: null, session: null },
        error: { message: 'Credenciais inválidas' }
      });

      await expect(authService.login(credentials)).rejects.toThrow();
      expect(loggerModule.logger.auth).toHaveBeenCalledWith(
        'login', false, undefined, expect.objectContaining({ 
          email: 'test@example.com',
          reason: 'Credenciais inválidas'
        })
      );
    });

    it('deve rejeitar quando a validação falha', async () => {
      const credentials = {
        email: 'email-invalido',
        password: 'senha'
      };

      authService.validateLoginData.mockReturnValueOnce({
        success: false,
        error: 'Email inválido'
      });

      await expect(authService.login(credentials)).rejects.toThrow('Dados de login inválidos');
      expect(mockSupabaseClient.auth.signInWithPassword).not.toHaveBeenCalled();
    });

    it('deve bloquear conta após múltiplas tentativas falhas', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'senha-errada'
      };

      // Configurar para falhar 5 vezes
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Credenciais inválidas' }
      });

      // Simular 5 tentativas falhas
      for (let i = 0; i < 5; i++) {
        await expect(authService.login(credentials)).rejects.toThrow();
      }

      // A sexta tentativa deve ser bloqueada sem chamar o Supabase
      await expect(authService.login(credentials)).rejects.toThrow(/bloqueada/);
      
      // Verificar que o Supabase foi chamado apenas 5 vezes
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledTimes(5);
      expect(loggerModule.logger.auth).toHaveBeenLastCalledWith(
        'login', false, undefined, expect.objectContaining({ 
          reason: 'account_locked'
        })
      );
    });
  });

  describe('register', () => {
    it('deve registrar um usuário com sucesso', async () => {
      const registerData = {
        email: 'test@example.com',
        password: 'ValidPassword1!',
        confirmPassword: 'ValidPassword1!'
      };
  
      const result = await authService.register(registerData);
  
      expect(authService.validateLoginData).toHaveBeenCalledWith(expect.any(Object), registerData);
      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'ValidPassword1!',
        options: expect.any(Object)
      });
      expect(loggerModule.logger.auth).toHaveBeenCalledWith(
        'registration', true, mockUser.id, { email: 'test@example.com' }
      );
      expect(result).toEqual({
        user: mockUser,
        session: mockSession
      });
    });

    it('deve rejeitar quando a validação falha', async () => {
      const registerData = {
        email: 'test@example.com',
        password: 'senha',
        confirmPassword: 'outra-senha'
      };

      authService.validateLoginData.mockReturnValueOnce({
        success: false,
        error: 'As senhas não coincidem'
      });

      await expect(authService.register(registerData)).rejects.toThrow('Dados de registro inválidos');
      expect(mockSupabaseClient.auth.signUp).not.toHaveBeenCalled();
    });

    it('deve rejeitar quando o Supabase retorna erro', async () => {
      const registerData = {
        email: 'existente@example.com',
        password: 'ValidPassword1!',
        confirmPassword: 'ValidPassword1!'
      };

      mockSupabaseClient.auth.signUp.mockResolvedValueOnce({
        data: { user: null, session: null },
        error: { message: 'Email já existe' }
      });

      await expect(authService.register(registerData)).rejects.toThrow();
      expect(loggerModule.logger.auth).toHaveBeenCalledWith(
        'registration', false, undefined, expect.objectContaining({ 
          email: 'existente@example.com',
          reason: 'Email já existe'
        })
      );
    });
  });

  describe('logout', () => {
    it('deve fazer logout com sucesso', async () => {
      const result = await authService.logout();
      
      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
      expect(loggerModule.logger.auth).toHaveBeenCalledWith('logout', true);
      expect(result).toBe(true);
    });

    it('deve lidar com erro durante logout', async () => {
      mockSupabaseClient.auth.signOut.mockResolvedValueOnce({
        error: { message: 'Erro ao fazer logout' }
      });

      await expect(authService.logout()).rejects.toThrow();
      expect(loggerModule.logger.auth).toHaveBeenCalledWith(
        'logout', false, undefined, expect.objectContaining({ 
          reason: 'Erro ao fazer logout'
        })
      );
    });
  });

  describe('getSession', () => {
    it('deve obter a sessão com sucesso', async () => {
      const session = await authService.getSession();
      
      expect(mockSupabaseClient.auth.getSession).toHaveBeenCalled();
      expect(session).toEqual({
        user: mockUser,
        access_token: 'mock-access-token'
      });
    });

    it('deve lidar com erro ao obter sessão', async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: { message: 'Erro ao obter sessão' }
      });

      await expect(authService.getSession()).rejects.toThrow();
      expect(loggerModule.logger.error).toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('deve solicitar redefinição de senha com sucesso', async () => {
      const email = 'test@example.com';
      
      const result = await authService.resetPassword(email);
      
      expect(mockSupabaseClient.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        email,
        expect.any(Object)
      );
      expect(loggerModule.logger.auth).toHaveBeenCalledWith(
        'password-reset-request', true, undefined, { email }
      );
      expect(result).toBe(true);
    });

    it('deve lidar com erro na solicitação de redefinição', async () => {
      const email = 'inexistente@example.com';
      
      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValueOnce({
        error: { message: 'Usuário não encontrado' }
      });

      await expect(authService.resetPassword(email)).rejects.toThrow();
      expect(loggerModule.logger.auth).toHaveBeenCalledWith(
        'password-reset-request', false, undefined, 
        expect.objectContaining({ 
          email,
          reason: 'Usuário não encontrado'
        })
      );
    });
  });

  describe('updatePassword', () => {
    it('deve atualizar a senha com sucesso', async () => {
      const newPassword = 'NewPassword123!';
      
      const result = await authService.updatePassword(newPassword);
      
      expect(mockSupabaseClient.auth.updateUser).toHaveBeenCalledWith({
        password: newPassword
      });
      expect(loggerModule.logger.auth).toHaveBeenCalledWith('password-update', true);
      expect(result).toBe(true);
    });

    it('deve lidar com erro na atualização de senha', async () => {
      const newPassword = 'fraca';
      
      mockSupabaseClient.auth.updateUser.mockResolvedValueOnce({
        data: { user: null },
        error: { message: 'Senha muito fraca' }
      });

      await expect(authService.updatePassword(newPassword)).rejects.toThrow();
      expect(loggerModule.logger.auth).toHaveBeenCalledWith(
        'password-update', false, undefined, 
        expect.objectContaining({ reason: 'Senha muito fraca' })
      );
    });
  });
});

describe('Supabase Mock Test', () => {
  const mockUser = {
    id: '13c5be68-b725-4a77-b0b9-65a1e5d5b559',
    email: 'test@example.com',
  };
  
  const mockSession = {
    user: mockUser,
    access_token: 'mock-access-token',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configure mock responses
    mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null
    });
  });

  it('deve verificar se o mock do Supabase está funcionando', async () => {
    // Verificar se o mock está configurado corretamente
    expect(supabase).toBeDefined();
    expect(supabase).toBe(mockSupabaseClient);
    
    // Chamar o método de sign in do mock
    const result = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'senha123'
    });
    
    // Verificar o resultado
    expect(result.data.user).toEqual(mockUser);
    expect(result.data.session).toEqual(mockSession);
    expect(result.error).toBeNull();
    
    // Verificar se o método foi chamado com os parâmetros corretos
    expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'senha123'
    });
  });
}); 