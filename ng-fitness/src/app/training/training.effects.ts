import { Actions, Effect, ofType } from '@ngrx/effects';
import { TrainingService } from './training.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  TrainingActionTypes,
  LoadAvailableExercisesCompleteAction
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
    map(
      (exercises: Exercise[]) =>
        new LoadAvailableExercisesCompleteAction(exercises)
    ),
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
