import {Action} from '@ngrx/store';
import {User} from '../models/auth.model';
import {Credentials} from '../models/credentials';

export enum AuthActionTypes {
  GET_USER = '[Auth] Get user',
  AUTHENTICATED = '[Auth] Authenticated',
  NOT_AUTHENTICATED = '[Auth] Not Authenticated',
  GOOGLE_LOGIN = '[Auth] Google login attempt',
  FACEBOOK_LOGIN = '[Auth] Facebook login attempt',
  CREDENTIALS_LOGIN = '[Auth] Credentials login attempt',
  GOOGLE_REGISTRATION = '[Auth] Google registration attempt',
  FACEBOOK_REGISTRATION = '[Auth] Facebook registration attempt',
  CREDENTIALS_REGISTRATION = '[Auth] Credentials registration attempt',
  REGISTRATION_COMPLETED = '[Auth] Registration completed',
  LOGOUT = '[Auth] Logout',
  AUTH_ERROR = '[Auth] Error'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;

  constructor(public payload?: any) {
  }
}

export class Authenticated implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED;

  constructor(public payload?: User) {

  }
}

export class NotAuthenticated implements Action {
  readonly type = AuthActionTypes.NOT_AUTHENTICATED;

  constructor(public payload?: any) {
  }
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;

  constructor(public payload?: any) {
  }
}

export class GoogleRegistration implements Action {
  readonly type = AuthActionTypes.GOOGLE_REGISTRATION;

  constructor(public payload?: any) {
  }
}

export class FacebookRegistration implements Action {
  readonly type = AuthActionTypes.FACEBOOK_REGISTRATION;

  constructor(public payload?: any) {
  }
}

export class CredentialsRegistration implements Action {
  readonly type = AuthActionTypes.CREDENTIALS_REGISTRATION;

  constructor(public payload: Credentials) {
  }
}

export class RegistrationCompleted implements Action {
  readonly type = AuthActionTypes.REGISTRATION_COMPLETED;

  constructor(public payload?: any) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;

  constructor(public payload?: any) {
  }
}

export class GoogleLogin implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGIN;

  constructor(public payload?: any) {
  }
}

export class FacebookLogin implements Action {
  readonly type = AuthActionTypes.FACEBOOK_LOGIN;

  constructor(public payload?: any) {
  }
}

export class CredentialsLogin implements Action {
  readonly type = AuthActionTypes.CREDENTIALS_LOGIN;

  constructor(public email: string, public password: string) {
  }
}

export type All
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
  | RegistrationCompleted;
