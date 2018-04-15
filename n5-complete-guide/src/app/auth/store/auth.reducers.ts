import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State {
  authenticated: boolean;
  token: string;
}

const initialState: State = {
  authenticated: false,
  token: null
};

export function reduce(state = initialState, action: AuthActions) {
  switch (action.type) {
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
