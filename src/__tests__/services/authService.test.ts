import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { mockSupabaseClient } from '../mocks/supabase';

// Define types for validation and Supabase responses
interface ValidationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface SupabaseAuthResponse<T = any> {
  data: T;
  error: null | { message: string };
}

// Mock modules
jest.mock('@/config/supabase', () => ({
  supabase: mockSupabaseClient
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    auth: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  }
}));

jest.mock('@/lib/validation', () => ({
  loginSchema: {},
  registerSchema: {},
  validateAndSanitize: jest.fn(),
}));

// Import after mocks
import authService from '@/services/authService';

// Get references to mocks with explicit type casting for TypeScript
const mocks = {
  logger: jest.requireMock('@/lib/logger').logger as {
    auth: jest.Mock;
    error: jest.Mock;
    info: jest.Mock;
    warn: jest.Mock;
  },
  validate: jest.requireMock('@/lib/validation').validateAndSanitize as jest.Mock
};

describe('Auth Service', () => {
  // Define mock user and session data for tests
  const mockUser = {
    id: 'mock-user-id',
    email: 'test@example.com'
  };
  
  const mockSession = {
    access_token: 'mock-token',
    user: mockUser
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configure validate mock
    (mocks.validate).mockImplementation((schema, data): ValidationResult => ({
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
  });

  it('deve realizar login com sucesso', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'ValidPassword1!'
    };

    const result = await authService.login(credentials);

    expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalled();
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('session');
  });

  it('deve registrar um usuário com sucesso', async () => {
    const registerData = {
      email: 'test@example.com',
      password: 'ValidPassword1!',
      confirmPassword: 'ValidPassword1!'
    };

    const result = await authService.register(registerData);

    expect(mockSupabaseClient.auth.signUp).toHaveBeenCalled();
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('session');
  });

  it('deve fazer logout com sucesso', async () => {
    const result = await authService.logout();
    
    expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('deve obter a sessão com sucesso', async () => {
    const session = await authService.getSession();
    
    expect(mockSupabaseClient.auth.getSession).toHaveBeenCalled();
    expect(session).toBeDefined();
  });

  it('deve solicitar redefinição de senha com sucesso', async () => {
    const email = 'test@example.com';
    
    const result = await authService.resetPassword(email);
    
    expect(mockSupabaseClient.auth.resetPasswordForEmail).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('deve atualizar a senha com sucesso', async () => {
    const newPassword = 'NewPassword123!';
    
    const result = await authService.updatePassword(newPassword);
    
    expect(mockSupabaseClient.auth.updateUser).toHaveBeenCalled();
    expect(result).toBe(true);
  });
}); 