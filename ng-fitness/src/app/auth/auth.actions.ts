import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout'
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
