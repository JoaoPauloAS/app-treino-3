/**
 * Mock do cliente Supabase para testes
 * 
 * Este arquivo cria um mock do cliente Supabase que pode ser usado em testes.
 * Para usar, importe o mockSupabaseClient e use-o nos seus testes.
 * 
 * Exemplo:
 * jest.mock('@/config/supabase', () => ({
 *   supabase: mockSupabaseClient
 * }));
 */

// Remove import of SupabaseClient and Database types as they're causing issues

const createMockSupabaseClient = () => {
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

  return {
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: { session: mockSession },
        error: null,
      }),
      
      signInWithPassword: jest.fn().mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      }),
      
      signUp: jest.fn().mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      }),
      
      signOut: jest.fn().mockResolvedValue({
        error: null,
      }),
      
      resetPasswordForEmail: jest.fn().mockResolvedValue({
        error: null,
      }),
      
      updateUser: jest.fn().mockResolvedValue({
        data: { user: mockUser },
        error: null,
      }),
      
      onAuthStateChange: jest.fn().mockImplementation(() => {
        return { 
          data: { subscription: { unsubscribe: jest.fn() } }, 
          error: null 
        };
      }),
      
      _simulateAuthChange() {
        const listeners = this.onAuthStateChange.mock.calls;
        
        if (listeners.length > 0) {
          listeners.forEach(([event]) => {
            if (event) {
              event('SIGNED_IN', {
                session: { access_token: 'mock-token' }
              });
            }
          });
        }
      },
    },
    
    from: jest.fn().mockImplementation(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      match: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockReturnThis(),
      then: jest.fn(() => ({
        data: [],
        error: null,
      })),
    })),
    
    rpc: jest.fn().mockResolvedValue({
      data: {},
      error: null,
    }),
    
    storage: {
      from: jest.fn().mockReturnValue({
        upload: jest.fn().mockResolvedValue({ data: { path: 'mock-path' }, error: null }),
        download: jest.fn().mockResolvedValue({ data: new Blob(), error: null }),
        remove: jest.fn().mockResolvedValue({ error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'mock-url' } }),
      }),
    },
  };
};

// Criar e exportar uma única instância do mock para ser usada nos testes
export const mockSupabaseClient = createMockSupabaseClient();

// Mockar o módulo de configuração do Supabase
jest.mock('@/config/supabase', () => ({
  supabase: mockSupabaseClient
})); 