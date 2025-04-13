import { z } from 'zod';

// Esquema para validação de email
export const emailSchema = z.string().email({
  message: 'Por favor, insira um email válido',
});

// Esquema para validação de senha
export const passwordSchema = z
  .string()
  .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
  .regex(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula' })
  .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
  .regex(/[^A-Za-z0-9]/, { message: 'A senha deve conter pelo menos um caractere especial' });

// Esquema para validação de login
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Esquema para validação de registro
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

// Esquema para validação de exercício
export const exerciseSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  muscle_group: z.string().min(2, { message: 'O grupo muscular deve ser especificado' }),
  is_custom: z.boolean().default(false),
});

// Esquema para validação de treino
export const workoutSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  date: z.string().datetime({ message: 'Data inválida' }),
  duration: z.number().min(1, { message: 'A duração deve ser pelo menos 1 minuto' }),
});

// Esquema para validação de séries
export const setSchema = z.object({
  reps: z.number().min(1, { message: 'Deve ter pelo menos 1 repetição' }),
  weight: z.number().min(0, { message: 'O peso não pode ser negativo' }),
  rest_time: z.number().min(0, { message: 'O tempo de descanso não pode ser negativo' }),
  order: z.number().min(1, { message: 'A ordem deve ser pelo menos 1' }),
});

// Função auxiliar para validar e sanitizar dados
export function validateAndSanitize<T>(schema: z.ZodType<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
} 