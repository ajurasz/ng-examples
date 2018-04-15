import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SIGNUP = '[Auth] Signup',
  SIGNUP_COMPLETE = '[Auth] Signup complete',
  SIGNIN = '[Auth] Signin',
  SIGNIN_COMPLETE = '[Auth] Signin complete',
  ERROR = '[Auth] Error'
}

export class SignupAction implements Action {
  readonly type = AuthActionTypes.SIGNUP;

  constructor(public email: string, public password: string) {}
}

export class SigninAction implements Action {
  readonly type = AuthActionTypes.SIGNIN;

  constructor(public email: string, public password: string) {}
}

export class SignupCompleteAction implements Action {
  readonly type = AuthActionTypes.SIGNUP_COMPLETE;

  constructor(public token: string) {}
}

export class SigninCompleteAction implements Action {
  readonly type = AuthActionTypes.SIGNIN_COMPLETE;

  constructor(public token: string) {}
}

export class ErrorAction implements Action {
  readonly type = AuthActionTypes.ERROR;

  constructor(public message: string) {}
}

export type AuthActions =
  | SigninAction
  | SigninCompleteAction
  | SignupAction
  | SignupCompleteAction;
