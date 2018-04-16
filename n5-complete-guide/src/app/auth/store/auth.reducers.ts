import { createSelector } from '@ngrx/store';

import * as fromApp from '../../app.reducers';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State {
  authenticated: boolean;
  token: string;
}

const initialState: State = {
  authenticated: false,
  token: null
};

export function reduce(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.INIT_COMPLETE: {
      return {
        ...state,
        authenticated: true,
        token: action.token
      };
    }
    case AuthActionTypes.SIGNUP_COMPLETE:
    case AuthActionTypes.SIGNIN_COMPLETE: {
      return {
        ...state,
        authenticated: true,
        token: action.token
      };
    }
    default:
      return state;
  }
}

export const getToken = createSelector(
  (state: fromApp.AppState) => state.auth,
  (state: State) => state.token
);
