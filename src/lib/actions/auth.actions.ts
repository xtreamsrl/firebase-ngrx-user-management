import {Action} from '@ngrx/store';
import {User} from '../models/auth.model';

export const GET_USER = '[Auth] Get user';
export const AUTHENTICATED = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';

export const GOOGLE_LOGIN = '[Auth] Google login attempt';
export const FACEBOOK_LOGIN = '[Auth] Facebook login attempt';
export const CREDENTIALS_LOGIN = '[Auth] Credentials login attempt';

export const LOGOUT = '[Auth] Logout';

export const AUTH_ERROR = '[Auth] Error';

/// Get UserModel AuthState

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

/// Google Login Actions

export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;

  constructor(public payload?: any) {
  }
}

/// Facebook Login Actions

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

/// Logout Actions

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload?: any) {
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
  | Logout;
