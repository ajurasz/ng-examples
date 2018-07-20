import { Actions, Effect, ofType } from '@ngrx/effects';
import { TrainingService } from './training.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  TrainingActionTypes,
  LoadAvailableExercisesCompleteAction,
  LoadCompletedOrCancledExercisesCompleteAction,
  StopExerciseAction
} from './training.actions';
import { mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { Exercise } from './exercise.model';
import { Action, Store } from '@ngrx/store';
import {
  StartLoadingAction,
  StopLoadingAction,
  DisplayMessageAction
} from '../shared/ui.actions';
import { empty } from 'rxjs/observable/empty';
import { getRunningExercise } from './training.reducers';

@Injectable()
export class TrainingEffects {
  @Effect()
  loadAvailableExercises$: Observable<Action> = this.actions$.pipe(
    ofType(TrainingActionTypes.LOAD_AVAILABLE_EXERCISES),
    tap(_ => this.store.dispatch(new StartLoadingAction())),
    mergeMap(_ => this.trainingService.fetchAvailableExercises()),
    mergeMap((exercises: Exercise[]) => [
      new StopLoadingAction(),
      new LoadAvailableExercisesCompleteAction(exercises)
    ]),
    catchError(err => this.handleErrors(err))
  );

  @Effect()
  loadCompletedOrCancledExercises$: Observable<Action> = this.actions$.pipe(
    ofType(TrainingActionTypes.LOAD_COMPLETED_OR_CANCLED_EXERCISES),
    tap(_ => this.store.dispatch(new StartLoadingAction())),
    mergeMap(_ => this.trainingService.fetchCompletedOrCanceledExercises()),
    mergeMap((exercises: Exercise[]) => [
      new StopLoadingAction(),
      new LoadCompletedOrCancledExercisesCompleteAction(exercises)
    ]),
    catchError(err => this.handleErrors(err))
  );

  @Effect()
  saveExercises$: Observable<Action> = this.actions$.pipe(
    ofType(
      TrainingActionTypes.CANCEL_EXERCISE,
      TrainingActionTypes.COMPLETE_EXERCISE
    ),
    withLatestFrom(this.store.select(getRunningExercise)),
    tap(_ => this.store.dispatch(new StartLoadingAction())),
    mergeMap(([action, state]) => {
      return this.trainingService
        .saveExercise(state)
        .pipe(
          mergeMap(_ => [new StopExerciseAction(), new StopLoadingAction()])
        );
    }),
    catchError(err => this.handleErrors(err))
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private trainingService: TrainingService
  ) {}

  private handleErrors(err): Observable<Action> {
    console.error(err);
    this.store.dispatch(new StopLoadingAction());
    this.store.dispatch(
      new DisplayMessageAction(err.message, null, { duration: 3000 })
    );
    return empty();
  }
}
