import { Actions, Effect, ofType } from '@ngrx/effects';
import { TrainingService } from './training.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  TrainingActionTypes,
  LoadAvailableExercisesCompleteAction,
  LoadCompletedOrCancledExercisesCompleteAction
} from './training.actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Exercise } from './exercise.model';
import { Action, Store } from '@ngrx/store';
import {
  StartLoadingAction,
  StopLoadingAction,
  DisplayMessageAction
} from '../shared/ui.actions';
import { empty } from 'rxjs/observable/empty';

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
    mergeMap(_ => this.trainingService.getCompletedOrCanceledExercises()),
    mergeMap((exercises: Exercise[]) => [
      new StopLoadingAction(),
      new LoadCompletedOrCancledExercisesCompleteAction(exercises)
    ]),
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
