import {Action} from '@ngrx/store';
import {User} from '../models/auth.model';
import {Credentials} from '../models/credentials';

export enum AuthActionTypes {
  Authenticated = '[Auth] Authenticated',
  AuthError = '[Auth] Error',
  CredentialsLogin = '[Auth] Credentials login attempt',
  CredentialsRegistration = '[Auth] Credentials registration attempt',
  FacebookLogin = '[Auth] Facebook login attempt',
  FacebookRegistration = '[Auth] Facebook registration attempt',
  GetUser = '[Auth] Get user',
  GoogleLogin = '[Auth] Google login attempt',
  GoogleRegistration = '[Auth] Google registration attempt',
  Logout = '[Auth] Logout',
  NotAuthenticated = '[Auth] Not Authenticated',
  RegistrationSuccess = '[Auth] Registration Success',
  ResetPasswordRequest = '[Auth] Reset Password Request',
  ResetPasswordRequestSuccess = '[Auth] Reset Password Request Success'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GetUser;

  constructor(public payload?: any) {
  }
}

export class Authenticated implements Action {
  readonly type = AuthActionTypes.Authenticated;

  constructor(public payload?: User) {

  }
}

export class NotAuthenticated implements Action {
  readonly type = AuthActionTypes.NotAuthenticated;

  constructor(public payload?: any) {
  }
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AuthError;

  constructor(public payload?: any) {
  }
}

export class GoogleRegistration implements Action {
  readonly type = AuthActionTypes.GoogleRegistration;

  constructor(public payload?: any) {
  }
}

export class FacebookRegistration implements Action {
  readonly type = AuthActionTypes.FacebookRegistration;

  constructor(public payload?: any) {
  }
}

export class CredentialsRegistration implements Action {
  readonly type = AuthActionTypes.CredentialsRegistration;

  constructor(public payload: Credentials) {
  }
}

export class RegistrationCompleted implements Action {
  readonly type = AuthActionTypes.RegistrationSuccess;

  constructor(public payload?: any) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;

  constructor(public payload?: any) {
  }
}

export class GoogleLogin implements Action {
  readonly type = AuthActionTypes.GoogleLogin;

  constructor(public payload?: any) {
  }
}

export class FacebookLogin implements Action {
  readonly type = AuthActionTypes.FacebookLogin;

  constructor(public payload?: any) {
  }
}

export class CredentialsLogin implements Action {
  readonly type = AuthActionTypes.CredentialsLogin;

  constructor(public email: string, public password: string, public remember?: boolean) {
  }
}

export class ResetPasswordRequest implements Action {
  readonly type = AuthActionTypes.ResetPasswordRequest;

  constructor(public payload: { email: string }) {
  }
}

export class ResetPasswordRequestSuccess implements Action {
  readonly type = AuthActionTypes.ResetPasswordRequestSuccess;

  constructor() {
  }
}

export type AuthActionsUnion
  = GetUser
  | Authenticated
  | NotAuthenticated
  | GoogleLogin
  | FacebookLogin
  | CredentialsLogin
  | AuthError
  | Logout
  | GoogleRegistration
  | FacebookRegistration
  | CredentialsRegistration
  | RegistrationCompleted
  | ResetPasswordRequest
  | ResetPasswordRequestSuccess;
