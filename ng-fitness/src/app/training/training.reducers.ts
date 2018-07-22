import { Exercise } from './exercise.model';
import { TrainingActions, TrainingActionTypes } from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  availableExercises: Exercise[];
  runningExercise: Exercise;
}

const initialState: State = {
  availableExercises: [],
  runningExercise: null
};

export function reducer(state = initialState, action: TrainingActions): State {
  switch (action.type) {
    case TrainingActionTypes.LOAD_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.exercises
      };
    case TrainingActionTypes.START_EXERCISE:
      return {
        ...state,
        runningExercise: state.availableExercises.find(
          exercise => exercise.id === action.exerciseId
        )
      };
    case TrainingActionTypes.STOP_EXERCISE:
      return {
        ...state,
        runningExercise: null
      };
    case TrainingActionTypes.CANCEL_EXERCISE:
      return {
        ...state,
        runningExercise: {
          ...state.runningExercise,
          duration: state.runningExercise.duration * (action.progress / 100),
          calories: state.runningExercise.calories * (action.progress / 100),
          date: new Date(),
          state: 'canceled'
        }
      };
    case TrainingActionTypes.COMPLETE_EXERCISE:
      return {
        ...state,
        runningExercise: {
          ...state.runningExercise,
          date: new Date(),
          state: 'completed'
        }
      };
    default:
      return state;
  }
}

const getState = createFeatureSelector<State>('training');

export const getRunningExercise = createSelector(
  getState,
  state => state.runningExercise
);
