import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/config/supabase';
import authService from '@/services/authService';
import { logger } from '@/lib/logger';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para lidar com alterações de sessão
  useEffect(() => {
    // Obter sessão atual
    const getCurrentSession = async () => {
      try {
        setLoading(true);
        const currentSession = await authService.getSession();
        
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          logger.auth('session-resumed', true, currentSession.user.id);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          logger.error('Failed to get session', { error: error.message });
        }
      } finally {
        setLoading(false);
      }
    };

    getCurrentSession();

    // Subscrever para alterações de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && newSession?.user) {
          logger.auth('signed-in', true, newSession.user.id);
        } else if (event === 'SIGNED_OUT') {
          logger.auth('signed-out', true);
        }
      }
    );

    // Limpar subscrição
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Funções de autenticação
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user: authUser, session: authSession } = await authService.login({ email, password });
      
      if (authUser && authSession) {
        setUser(authUser);
        setSession(authSession);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro durante o login.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.register({ email, password, confirmPassword });
      
      // Não definimos session/user aqui porque o Supabase pode requerer confirmação de email
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro durante o registro.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.logout();
      
      setSession(null);
      setUser(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro durante o logout.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.resetPassword(email);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro ao solicitar redefinição de senha.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.updatePassword(newPassword);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro ao atualizar a senha.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider; 