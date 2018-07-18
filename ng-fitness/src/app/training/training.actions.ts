import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export enum TrainingActionTypes {
  LOAD_AVAILABLE_EXERCISES = '[Training] Load available',
  LOAD_AVAILABLE_EXERCISES_COMPLETE = '[Training] Load available complete',
  LOAD_COMPLETED_OR_CANCLED_EXERCISES = '[Training] Load completed or cancled exercises',
  LOAD_COMPLETED_OR_CANCLED_EXERCISES_COMPLETE = '[Training] Load completed or cancled exercises complete',
  START_EXERCISE = '[Training] Start exercise',
  COMPLETE_EXERCISE = '[Training] Complete exercise',
  CANCEL_EXERCISE = '[Training] Cancel exercise',
  STOP_EXERCISE = '[Training] Stop exercise'
}

export class LoadAvailableExercisesAction implements Action {
  readonly type = TrainingActionTypes.LOAD_AVAILABLE_EXERCISES;
}

export class LoadAvailableExercisesCompleteAction implements Action {
  readonly type = TrainingActionTypes.LOAD_AVAILABLE_EXERCISES_COMPLETE;

  constructor(public exercises: Exercise[]) {}
}

export class LoadCompletedOrCancledExercisesAction implements Action {
  readonly type = TrainingActionTypes.LOAD_COMPLETED_OR_CANCLED_EXERCISES;
}

export class LoadCompletedOrCancledExercisesCompleteAction implements Action {
  readonly type =
    TrainingActionTypes.LOAD_COMPLETED_OR_CANCLED_EXERCISES_COMPLETE;

  constructor(public exercises: Exercise[]) {}
}

export class StartExerciseAction implements Action {
  readonly type = TrainingActionTypes.START_EXERCISE;

  constructor(public exerciseId: string) {}
}

export class CompleteExerciseAction implements Action {
  readonly type = TrainingActionTypes.COMPLETE_EXERCISE;
}

export class CancelExerciseAction implements Action {
  readonly type = TrainingActionTypes.CANCEL_EXERCISE;

  constructor(public progress: number) {}
}

export class StopExerciseAction implements Action {
  readonly type = TrainingActionTypes.STOP_EXERCISE;
}

export type TrainingActions =
  | LoadAvailableExercisesAction
  | LoadAvailableExercisesCompleteAction
  | LoadCompletedOrCancledExercisesAction
  | LoadCompletedOrCancledExercisesCompleteAction
  | StartExerciseAction
  | StopExerciseAction
  | CancelExerciseAction
  | CompleteExerciseAction;
