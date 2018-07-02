import {Action} from '@ngrx/store';
import {User} from '../models/auth.model';
import {Credentials} from '../models/credentials';

export const GET_USER = '[Auth] Get user';
export const AUTHENTICATED = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';

export const GOOGLE_LOGIN = '[Auth] Google login attempt';
export const FACEBOOK_LOGIN = '[Auth] Facebook login attempt';
export const CREDENTIALS_LOGIN = '[Auth] Credentials login attempt';

export const GOOGLE_REGISTRATION = '[Auth] Google registration attempt';
export const FACEBOOK_REGISTRATION = '[Auth] Facebook registration attempt';
export const CREDENTIALS_REGISTRATION = '[Auth] Credentials registration attempt';
export const REGISTRATION_COMPLETED = '[Auth] Registration completed';

export const LOGOUT = '[Auth] Logout';

export const AUTH_ERROR = '[Auth] Error';

export class GetUser implements Action {
  readonly type = GET_USER;

  constructor(public payload?: any) {
  }
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;

  constructor(public payload?: User) {

  }
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;

  constructor(public payload?: any) {
  }
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;

  constructor(public payload?: any) {
  }
}

export class GoogleRegistration implements Action {
  readonly type = GOOGLE_REGISTRATION;

  constructor(public payload?: any) {
  }
}

export class FacebookRegistration implements Action {
  readonly type = FACEBOOK_REGISTRATION;

  constructor(public payload?: any) {
  }
}

export class CredentialsRegistration implements Action {
  readonly type = CREDENTIALS_REGISTRATION;

  constructor(public payload: Credentials) {
  }
}

export class RegistrationCompleted implements Action {
  readonly type = REGISTRATION_COMPLETED;

  constructor(public payload?: any) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload?: any) {
  }
}

export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;

  constructor(public payload?: any) {
  }
}

export class FacebookLogin implements Action {
  readonly type = FACEBOOK_LOGIN;

  constructor(public payload?: any) {
  }
}

export class CredentialsLogin implements Action {
  readonly type = CREDENTIALS_LOGIN;

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
