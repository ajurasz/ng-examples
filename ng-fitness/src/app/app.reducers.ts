import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducers';
import * as fromUi from './shared/ui.reducers';

export interface State {
  auth: fromAuth.State;
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  ui: fromUi.reducer
};
