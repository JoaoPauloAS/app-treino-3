
export type TranslationKey = 
  | "home" 
  | "workouts" 
  | "exercises" 
  | "progress" 
  | "profile"
  | "my_workouts"
  | "recent_workouts"
  | "new_workout"
  | "create_routine"
  | "rest_timer"
  | "set"
  | "profile_information"
  | "preferences"
  | "logout"
  | "total_volume"
  | "workout_time"
  | "total_workouts"
  | "dark_mode"
  | "light_mode"
  | "language"
  | "account";

type TranslationDictionary = {
  [key in Language]: {
    [key in TranslationKey]?: string;
  } & Record<string, string>;
};

export type Language = "pt-BR" | "en";

export const translations: TranslationDictionary = {
  "pt-BR": {
    // Navegação
    "home": "Início",
    "workouts": "Treinos",
    "exercises": "Exercícios",
    "progress": "Progresso",
    "profile": "Perfil",
    
    // Tela de treinos
    "my_workouts": "Meus Treinos",
    "recent_workouts": "Treinos Recentes",
    "new_workout": "Novo Treino",
    "create_routine": "Criar Rotina",
    
    // Timer
    "rest_timer": "Timer de Descanso",
    "set": "Definir",
    
    // Perfil
    "profile_information": "Informações do Perfil",
    "preferences": "Preferências",
    "logout": "Sair",
    "account": "Conta",
    
    // Estatísticas
    "total_volume": "Volume Total",
    "workout_time": "Tempo de Treino",
    "total_workouts": "Total de Treinos",
    
    // Temas e idiomas
    "dark_mode": "Modo Escuro",
    "light_mode": "Modo Claro",
    "language": "Idioma"
  },
  "en": {
    // Navigation
    "home": "Home",
    "workouts": "Workouts",
    "exercises": "Exercises",
    "progress": "Progress",
    "profile": "Profile",
    
    // Workouts screen
    "my_workouts": "My Workouts",
    "recent_workouts": "Recent Workouts",
    "new_workout": "New Workout",
    "create_routine": "Create Routine",
    
    // Timer
    "rest_timer": "Rest Timer",
    "set": "Set",
    
    // Profile
    "profile_information": "Profile Information",
    "preferences": "Preferences",
    "logout": "Logout",
    "account": "Account",
    
    // Stats
    "total_volume": "Total Volume",
    "workout_time": "Workout Time",
    "total_workouts": "Total Workouts",
    
    // Themes and languages
    "dark_mode": "Dark Mode",
    "light_mode": "Light Mode",
    "language": "Language"
  }
};
