export interface Exercise extends ExerciseData {
  id: string;
}

export interface ExerciseData {
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'canceled' | null;
}
