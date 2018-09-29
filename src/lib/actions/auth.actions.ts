import {Action} from '@ngrx/store';
import {User} from '../models/auth.model';
import {Credentials} from '../models/credentials';

export enum AuthActionTypes {
  Authenticated = '[Auth] Authenticated',
  AuthError = '[Auth] Error',
  CredentialsLogin = '[Auth] Credentials login attempt',
  CredentialsReauthentication = '[Auth] Credentials reauthentication attempt',
  CredentialsRegistration = '[Auth] Credentials registration attempt',
  DeleteAccount = '[Auth] Delete account',
  DeleteAccountSuccess = '[Auth] Delete account success',
  DeleteAccountError = '[Auth] Delete account error',
  FacebookLogin = '[Auth] Facebook login attempt',
  FacebookReauthentication = '[Auth] Facebook reauthentication attempt',
  FacebookRegistration = '[Auth] Facebook registration attempt',
  GetUser = '[Auth] Get user',
  GoogleLogin = '[Auth] Google login attempt',
  GoogleReauthentication = '[Auth] Google reauthentication attempt',
  GoogleRegistration = '[Auth] Google registration attempt',
  Logout = '[Auth] Logout',
  NotAuthenticated = '[Auth] Not Authenticated',
  SendVerificationEmail = '[Auth] Send Verificaiton Email',
  ReauthenticationError = '[Auth] Reauthentication error',
  ReauthenticationSuccess = '[Auth] Reauthentication success',
  RegistrationSuccess = '[Auth] Registration Success',
  ResetPasswordRequest = '[Auth] Reset Password Request',
  ResetPasswordRequestSuccess = '[Auth] Reset Password Request Success',
  VerificationEmailError = '[Auth] Verification Email Error',
  VerificationEmailSent = '[Auth] Verification Email Sent'
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

export class RegistrationSuccess implements Action {
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

export class GoogleReauthentication implements Action {
  readonly type = AuthActionTypes.GoogleReauthentication;

  constructor(public payload?: any) {
  }
}

export class FacebookReauthentication implements Action {
  readonly type = AuthActionTypes.FacebookReauthentication;

  constructor(public payload?: any) {
  }
}

export class CredentialsReauthentication implements Action {
  readonly type = AuthActionTypes.CredentialsReauthentication;

  constructor(public email: string, public password: string, public remember?: boolean) {
  }
}

export class ReauthenticationSuccess implements Action {
  readonly type = AuthActionTypes.ReauthenticationSuccess;

  constructor() {
  }
}

export class ReauthenticationError implements Action {
  readonly type = AuthActionTypes.ReauthenticationError;

  constructor(public payload?: any) {
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

export class SendVerificationEmail implements Action {
  readonly type = AuthActionTypes.SendVerificationEmail;

  constructor(public payload: { redirectUrl: string }) {
  }
}

export class VerificationEmailError implements Action {
  readonly type = AuthActionTypes.VerificationEmailError;

  constructor(public payload: { code: string, message: string }) {
  }
}

export class VerificationEmailSent implements Action {
  readonly type = AuthActionTypes.VerificationEmailSent;

  constructor() {
  }
}

export class DeleteAccount implements Action {
  readonly type = AuthActionTypes.DeleteAccount;

  constructor() {
  }
}

export class DeleteAccountSuccess implements Action {
  readonly type = AuthActionTypes.DeleteAccountSuccess;

  constructor() {
  }

}

export class DeleteAccountError implements Action {
  readonly type = AuthActionTypes.DeleteAccountError;

  constructor(public payload: { code: string }) {
  }

}

export type AuthActionsUnion
  = GetUser
  | Authenticated
  | NotAuthenticated
  | ReauthenticationSuccess
  | ReauthenticationError
  | GoogleReauthentication
  | FacebookReauthentication
  | CredentialsReauthentication
  | GoogleLogin
  | FacebookLogin
  | CredentialsLogin
  | AuthError
  | Logout
  | GoogleRegistration
  | FacebookRegistration
  | CredentialsRegistration
  | RegistrationSuccess
  | ResetPasswordRequest
  | ResetPasswordRequestSuccess
  | SendVerificationEmail
  | VerificationEmailSent
  | VerificationEmailError
  | DeleteAccount
  | DeleteAccountError
  | DeleteAccountSuccess;
