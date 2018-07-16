import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { UiActionTypes, DisplayMessageAction } from './ui.actions';
import { mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UiEffects {
  @Effect()
  displayMessage$: Observable<Action> = this.actions$.pipe(
    ofType(UiActionTypes.DISPLAY_MESSAGE),
    mergeMap((action: DisplayMessageAction) => {
      this.snackbar.open(action.message, action.action, action.config);
      return new EmptyObservable();
    })
  );

  constructor(private actions$: Actions, private snackbar: MatSnackBar) {}
}
