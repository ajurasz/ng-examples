import { AuthActions, AuthActionTypes } from './auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

const getState = createFeatureSelector<State>('auth');

export const isAuthenticated = createSelector(
  getState,
  state => state.isAuthenticated
);
