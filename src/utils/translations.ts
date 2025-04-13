type TranslationDictionary = {
  [key: string]: {
    [key in TranslationKey]: string;
  };
};

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
  | "account"
  | "minutes"
  | "seconds"
  | "exercise_library"
  | "progress_tracking"
  | "search_exercises"
  | "no_exercises_found"
  | "start_new_workout"
  | "weekly_volume"
  | "workouts_this_week"
  | "view_all"
  | "upcoming_workouts"
  | "tomorrow"
  | "in_days"
  | "workout_tracker"
  | "personal_records"
  | "weight_progression"
  | "last_month"
  | "last_3_months"
  | "last_6_months" 
  | "last_year"
  | "all_time"
  | "select_period"
  | "all"
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "quadriceps"
  | "hamstrings"
  | "calves"
  | "glutes"
  | "abs"
  | "exercises_count";

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
    "minutes": "min",
    "seconds": "seg",
    
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
    "language": "Idioma",
    
    // Páginas
    "exercise_library": "Biblioteca de Exercícios",
    "progress_tracking": "Acompanhamento de Progresso",
    
    // Busca de exercícios
    "search_exercises": "Buscar exercícios...",
    "no_exercises_found": "Nenhum exercício encontrado",
    
    // Dashboard
    "start_new_workout": "Iniciar Novo Treino",
    "weekly_volume": "Volume Semanal",
    "workouts_this_week": "Treinos Esta Semana",
    "view_all": "Ver Todos",
    "upcoming_workouts": "Próximos Treinos",
    "tomorrow": "Amanhã",
    "in_days": "Em %d dias",
    "workout_tracker": "Registro de Treinos",
    
    // Progresso
    "personal_records": "Recordes Pessoais",
    "weight_progression": "Progressão de peso (kg)",
    "last_month": "Último Mês",
    "last_3_months": "Últimos 3 Meses",
    "last_6_months": "Últimos 6 Meses",
    "last_year": "Último Ano",
    "all_time": "Todo o Período",
    "select_period": "Selecionar período",
    
    // Filtros de exercícios
    "all": "Todos",
    "chest": "Peito",
    "back": "Costas",
    "shoulders": "Ombros",
    "biceps": "Bíceps",
    "triceps": "Tríceps",
    "quadriceps": "Quadríceps",
    "hamstrings": "Posterior",
    "calves": "Panturrilha",
    "glutes": "Glúteo",
    "abs": "Abdômen",
    
    // Detalhes do treino
    "exercises_count": "exercícios"
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
    "minutes": "min",
    "seconds": "sec",
    
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
    "language": "Language",
    
    // Pages
    "exercise_library": "Exercise Library",
    "progress_tracking": "Progress Tracking",
    
    // Exercise search
    "search_exercises": "Search exercises...",
    "no_exercises_found": "No exercises found",
    
    // Dashboard
    "start_new_workout": "Start New Workout",
    "weekly_volume": "Weekly Volume",
    "workouts_this_week": "Workouts This Week",
    "view_all": "View All",
    "upcoming_workouts": "Upcoming Workouts",
    "tomorrow": "Tomorrow",
    "in_days": "In %d days",
    "workout_tracker": "Workout Tracker",
    
    // Progress
    "personal_records": "Personal Records",
    "weight_progression": "Weight progression (kg)",
    "last_month": "Last Month",
    "last_3_months": "Last 3 Months",
    "last_6_months": "Last 6 Months",
    "last_year": "Last Year",
    "all_time": "All Time",
    "select_period": "Select period",
    
    // Exercise filters
    "all": "All",
    "chest": "Chest",
    "back": "Back",
    "shoulders": "Shoulders",
    "biceps": "Biceps",
    "triceps": "Triceps",
    "quadriceps": "Quadriceps",
    "hamstrings": "Hamstrings",
    "calves": "Calves",
    "glutes": "Glutes",
    "abs": "Abs",
    
    // Workout details
    "exercises_count": "exercises"
  }
}; 