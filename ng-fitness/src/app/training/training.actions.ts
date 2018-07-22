import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export enum TrainingActionTypes {
  FETCH_DATA = '[Training] Fetch data',
  CLEANUP_SUBSCRIPTIONS = '[Training] cleanup subscriptions',
  LOAD_AVAILABLE_EXERCISES = '[Training] Load aiailable exercises',
  START_EXERCISE = '[Training] Start exercise',
  COMPLETE_EXERCISE = '[Training] Complete exercise',
  CANCEL_EXERCISE = '[Training] Cancel exercise',
  STOP_EXERCISE = '[Training] Stop exercise'
}

export class FetchDataAction implements Action {
  readonly type = TrainingActionTypes.FETCH_DATA;
}

export class CleanupSubscriptionsAction implements Action {
  readonly type = TrainingActionTypes.CLEANUP_SUBSCRIPTIONS;
}

export class LoadAvailableExercisesAction implements Action {
  readonly type = TrainingActionTypes.LOAD_AVAILABLE_EXERCISES;

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
  | StartExerciseAction
  | StopExerciseAction
  | CancelExerciseAction
  | CompleteExerciseAction;
