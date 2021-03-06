import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  INIT = '[Auth] Init',
  INIT_COMPLETE = '[Auth] Init complete',
  SIGNUP = '[Auth] Signup',
  SIGNUP_COMPLETE = '[Auth] Signup complete',
  SIGNIN = '[Auth] Signin',
  SIGNIN_COMPLETE = '[Auth] Signin complete',
  LOGOUT = '[Auth] Logout',
  LOGOUT_COMPLETE = '[Auth] Logout complete',
  ERROR = '[Auth] Error'
}

export class InitAuthAction implements Action {
  readonly type = AuthActionTypes.INIT;

  constructor() {}
}

export class InitAuthCompleteAction implements Action {
  readonly type = AuthActionTypes.INIT_COMPLETE;

  constructor(public token: string) {}
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

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutCompleteAction implements Action {
  readonly type = AuthActionTypes.LOGOUT_COMPLETE;
}

export class ErrorAction implements Action {
  readonly type = AuthActionTypes.ERROR;

  constructor(public message: string) {}
}

export type AuthActions =
  | InitAuthAction
  | InitAuthCompleteAction
  | SigninAction
  | SigninCompleteAction
  | SignupAction
  | SignupCompleteAction
  | LogoutAction
  | LogoutCompleteAction
  | ErrorAction;
