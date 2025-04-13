import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) throw new Error('SUPABASE_URL is required');
if (!process.env.SUPABASE_ANON_KEY) throw new Error('SUPABASE_ANON_KEY is required');

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Tipos para as tabelas do Supabase
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          language: 'pt-BR' | 'en-US';
        };
        Insert: {
          id: string;
          email: string;
          language?: 'pt-BR' | 'en-US';
        };
        Update: {
          email?: string;
          language?: 'pt-BR' | 'en-US';
        };
      };
      workouts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          date: string;
          duration: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          date: string;
          duration: number;
        };
        Update: {
          name?: string;
          date?: string;
          duration?: number;
        };
      };
      exercises: {
        Row: {
          id: string;
          name: string;
          muscle_group: string;
          is_custom: boolean;
          user_id?: string;
          created_at: string;
        };
        Insert: {
          name: string;
          muscle_group: string;
          is_custom: boolean;
          user_id?: string;
        };
        Update: {
          name?: string;
          muscle_group?: string;
        };
      };
      workout_exercises: {
        Row: {
          id: string;
          workout_id: string;
          exercise_id: string;
          order: number;
        };
        Insert: {
          workout_id: string;
          exercise_id: string;
          order: number;
        };
        Update: {
          order?: number;
        };
      };
      sets: {
        Row: {
          id: string;
          workout_exercise_id: string;
          reps: number;
          weight: number;
          rest_time: number;
          order: number;
        };
        Insert: {
          workout_exercise_id: string;
          reps: number;
          weight: number;
          rest_time: number;
          order: number;
        };
        Update: {
          reps?: number;
          weight?: number;
          rest_time?: number;
          order?: number;
        };
      };
    };
  };
}; 