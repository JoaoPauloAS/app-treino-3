-- Insert default exercises
INSERT INTO public.exercises (name, muscle_group, is_custom) VALUES
-- Peito / Chest
('Supino Reto', 'chest', false),
('Supino Inclinado', 'chest', false),
('Supino Declinado', 'chest', false),
('Crossover', 'chest', false),
('Flexão de Braço', 'chest', false),
('Bench Press', 'chest', false),
('Incline Bench Press', 'chest', false),
('Decline Bench Press', 'chest', false),
('Cable Crossover', 'chest', false),
('Push Up', 'chest', false),

-- Costas / Back
('Remada Curvada', 'back', false),
('Puxada Alta', 'back', false),
('Remada Unilateral', 'back', false),
('Barra Fixa', 'back', false),
('Pulldown', 'back', false),
('Bent Over Row', 'back', false),
('Lat Pulldown', 'back', false),
('Single Arm Row', 'back', false),
('Pull Up', 'back', false),

-- Ombros / Shoulders
('Desenvolvimento', 'shoulders', false),
('Elevação Lateral', 'shoulders', false),
('Elevação Frontal', 'shoulders', false),
('Remada Alta', 'shoulders', false),
('Shoulder Press', 'shoulders', false),
('Lateral Raise', 'shoulders', false),
('Front Raise', 'shoulders', false),
('Upright Row', 'shoulders', false),

-- Bíceps / Biceps
('Rosca Direta', 'biceps', false),
('Rosca Martelo', 'biceps', false),
('Rosca Concentrada', 'biceps', false),
('Rosca Scott', 'biceps', false),
('Bicep Curl', 'biceps', false),
('Hammer Curl', 'biceps', false),
('Concentration Curl', 'biceps', false),
('Preacher Curl', 'biceps', false),

-- Tríceps / Triceps
('Tríceps Testa', 'triceps', false),
('Tríceps Corda', 'triceps', false),
('Tríceps Francês', 'triceps', false),
('Mergulho', 'triceps', false),
('Skull Crusher', 'triceps', false),
('Tricep Pushdown', 'triceps', false),
('French Press', 'triceps', false),
('Dip', 'triceps', false),

-- Quadríceps / Quadriceps
('Agachamento', 'quadriceps', false),
('Leg Press', 'quadriceps', false),
('Cadeira Extensora', 'quadriceps', false),
('Afundo', 'quadriceps', false),
('Squat', 'quadriceps', false),
('Leg Extension', 'quadriceps', false),
('Lunge', 'quadriceps', false),

-- Posterior / Hamstrings
('Stiff', 'hamstrings', false),
('Mesa Flexora', 'hamstrings', false),
('Good Morning', 'hamstrings', false),
('Romanian Deadlift', 'hamstrings', false),
('Leg Curl', 'hamstrings', false),

-- Panturrilha / Calves
('Elevação de Panturrilha', 'calves', false),
('Elevação de Panturrilha Sentado', 'calves', false),
('Calf Raise', 'calves', false),
('Seated Calf Raise', 'calves', false),

-- Glúteo / Glutes
('Agachamento Sumô', 'glutes', false),
('Elevação Pélvica', 'glutes', false),
('Abdução de Quadril', 'glutes', false),
('Sumo Squat', 'glutes', false),
('Hip Thrust', 'glutes', false),
('Hip Abduction', 'glutes', false),

-- Abdômen / Abs
('Abdominal Crunch', 'abs', false),
('Prancha', 'abs', false),
('Elevação de Pernas', 'abs', false),
('Russian Twist', 'abs', false),
('Plank', 'abs', false),
('Leg Raise', 'abs', false); 