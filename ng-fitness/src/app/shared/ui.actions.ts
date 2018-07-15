import { Action } from '@ngrx/store';

export enum UiActionTypes {
  START_LOADING = '[Ui] Start loading.',
  STOP_LOADING = '[Ui] Stop loading',
  EXERCISES_LOADED = '[Ui] Exercises loaded'
}

export class StartLoadingAction implements Action {
  readonly type = UiActionTypes.START_LOADING;
}

export class StopLoadingAction implements Action {
  readonly type = UiActionTypes.STOP_LOADING;
}

export class ExercisesLoadedAction implements Action {
  readonly type = UiActionTypes.EXERCISES_LOADED;
}

export type UiActions =
  | StartLoadingAction
  | StopLoadingAction
  | ExercisesLoadedAction;
