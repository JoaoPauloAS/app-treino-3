import { 
  emailSchema, 
  passwordSchema, 
  loginSchema, 
  registerSchema, 
  exerciseSchema,
  workoutSchema,
  setSchema,
  validateAndSanitize
} from '@/lib/validation';
import { ZodError } from 'zod';

describe('Validation Library', () => {
  describe('emailSchema', () => {
    it('deve validar um email correto', () => {
      expect(() => emailSchema.parse('test@example.com')).not.toThrow();
    });

    it('deve rejeitar um email incorreto', () => {
      expect(() => emailSchema.parse('not-an-email')).toThrow();
    });

    it('deve rejeitar um email vazio', () => {
      expect(() => emailSchema.parse('')).toThrow();
    });
  });

  describe('passwordSchema', () => {
    it('deve validar uma senha que atende a todos os critérios', () => {
      expect(() => passwordSchema.parse('ValidPassword1!')).not.toThrow();
    });

    it('deve rejeitar uma senha muito curta', () => {
      expect(() => passwordSchema.parse('Short1!')).toThrow();
    });

    it('deve rejeitar uma senha sem letra maiúscula', () => {
      expect(() => passwordSchema.parse('validpassword1!')).toThrow();
    });

    it('deve rejeitar uma senha sem letra minúscula', () => {
      expect(() => passwordSchema.parse('VALIDPASSWORD1!')).toThrow();
    });

    it('deve rejeitar uma senha sem número', () => {
      expect(() => passwordSchema.parse('ValidPassword!')).toThrow();
    });

    it('deve rejeitar uma senha sem caractere especial', () => {
      expect(() => passwordSchema.parse('ValidPassword1')).toThrow();
    });
  });

  describe('loginSchema', () => {
    it('deve validar credenciais de login válidas', () => {
      expect(() => loginSchema.parse({
        email: 'test@example.com',
        password: 'ValidPassword1!'
      })).not.toThrow();
    });

    it('deve rejeitar credenciais com email inválido', () => {
      expect(() => loginSchema.parse({
        email: 'not-an-email',
        password: 'ValidPassword1!'
      })).toThrow();
    });

    it('deve rejeitar credenciais com senha inválida', () => {
      expect(() => loginSchema.parse({
        email: 'test@example.com',
        password: 'short'
      })).toThrow();
    });
  });

  describe('registerSchema', () => {
    it('deve validar dados de registro válidos', () => {
      expect(() => registerSchema.parse({
        email: 'test@example.com',
        password: 'ValidPassword1!',
        confirmPassword: 'ValidPassword1!'
      })).not.toThrow();
    });

    it('deve rejeitar quando as senhas não coincidem', () => {
      expect(() => registerSchema.parse({
        email: 'test@example.com',
        password: 'ValidPassword1!',
        confirmPassword: 'DifferentPassword1!'
      })).toThrow();
    });
  });

  describe('exerciseSchema', () => {
    it('deve validar dados de exercício válidos', () => {
      expect(() => exerciseSchema.parse({
        name: 'Bench Press',
        muscle_group: 'chest',
        is_custom: true
      })).not.toThrow();
    });

    it('deve validar com is_custom padrão', () => {
      const result = exerciseSchema.parse({
        name: 'Bench Press',
        muscle_group: 'chest'
      });
      expect(result.is_custom).toBe(false);
    });

    it('deve rejeitar nome muito curto', () => {
      expect(() => exerciseSchema.parse({
        name: 'B',
        muscle_group: 'chest'
      })).toThrow();
    });
  });

  describe('workoutSchema', () => {
    it('deve validar dados de treino válidos', () => {
      expect(() => workoutSchema.parse({
        name: 'Treino A',
        date: new Date().toISOString(),
        duration: 60
      })).not.toThrow();
    });

    it('deve rejeitar duration negativa', () => {
      expect(() => workoutSchema.parse({
        name: 'Treino A',
        date: new Date().toISOString(),
        duration: 0
      })).toThrow();
    });
  });

  describe('setSchema', () => {
    it('deve validar dados de série válidos', () => {
      expect(() => setSchema.parse({
        reps: 10,
        weight: 50,
        rest_time: 60,
        order: 1
      })).not.toThrow();
    });

    it('deve rejeitar repetições inválidas', () => {
      expect(() => setSchema.parse({
        reps: 0,
        weight: 50,
        rest_time: 60,
        order: 1
      })).toThrow();
    });
  });

  describe('validateAndSanitize', () => {
    it('deve retornar dados válidos quando a validação for bem-sucedida', () => {
      const data = { name: 'Bench Press', muscle_group: 'chest' };
      const result = validateAndSanitize(exerciseSchema, data);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ ...data, is_custom: false });
      }
    });

    it('deve retornar errors quando a validação falhar', () => {
      const data = { name: 'B', muscle_group: 'chest' };
      const result = validateAndSanitize(exerciseSchema, data);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBeInstanceOf(ZodError);
      }
    });
  });
}); 