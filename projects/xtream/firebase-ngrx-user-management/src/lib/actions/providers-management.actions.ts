import {Action} from '@ngrx/store';

export enum ProvidersManagementActionTypes {
  CodeSent = '[Auth/Providers] Code Sent',
  LinkCredentialAccount = '[Auth/Providers] Link Credential Account',
  LinkFacebookAccount = '[Auth/Providers] Link Facebook Account',
  LinkGoogleAccount = '[Auth/Providers] Link Google Account',
  LinkError = '[Auth/Providers] Link Error',
  LinkSuccess = '[Auth/Providers] Link Success',
  SetProviders = '[Auth/Providers] Set Providers',
  UnlinkCredentialAccount = '[Auth/Providers] Unlink Credential Account',
  UnlinkFacebookAccount = '[Auth/Providers] Unlink Facebook Account',
  UnlinkGoogleAccount = '[Auth/Providers] Unlink Google Account',
  UnlinkError = '[Auth/Providers] Unlink Error',
  UnlinkSuccess = '[Auth/Providers] Unlink Success',

  SendPhoneNumberCode = '[Auth] Send Phone Number Code',
  UnlinkPhoneNumber = '[Auth] Unlink Phone Number',
  VerifyPhoneNumber = '[Auth] Verify Phone'
}

export class LinkCredentialAccount implements Action {
  readonly type = ProvidersManagementActionTypes.LinkCredentialAccount;

  constructor(public payload: { password: string }) {
  }

}

export class LinkFacebookAccount implements Action {
  readonly type = ProvidersManagementActionTypes.LinkFacebookAccount;

  constructor() {
  }

}

export class LinkGoogleAccount implements Action {
  readonly type = ProvidersManagementActionTypes.LinkGoogleAccount;

  constructor() {
  }

}

export class VerifyPhoneNumber implements Action {
  readonly type = ProvidersManagementActionTypes.VerifyPhoneNumber;

  constructor(public payload: { code: string }) {
  }

}

export class LinkSuccess implements Action {
  readonly type = ProvidersManagementActionTypes.LinkSuccess;

  constructor(public payload: { provider: string }) {
  }

}

export class LinkError implements Action {
  readonly type = ProvidersManagementActionTypes.LinkError;

  constructor(public payload: { code: string, message: string }) {
  }

}

export class UnlinkSuccess implements Action {
  readonly type = ProvidersManagementActionTypes.UnlinkSuccess;

  constructor(public payload: { provider: string }) {
  }

}

export class UnlinkError implements Action {
  readonly type = ProvidersManagementActionTypes.UnlinkError;

  constructor(public payload: { code: string, message: string }) {
  }

}

export class SendPhoneNumberCode implements Action {
  readonly type = ProvidersManagementActionTypes.SendPhoneNumberCode;

  constructor(public payload: { number: string, captchaContainerId: string }) {
  }

}

export class UnlinkFacebookAccount implements Action {
  readonly type = ProvidersManagementActionTypes.UnlinkFacebookAccount;

  constructor() {
  }

}

export class UnlinkGoogleAccount implements Action {
  readonly type = ProvidersManagementActionTypes.UnlinkGoogleAccount;

  constructor() {
  }

}

export class UnlinkCredentialAccount implements Action {
  readonly type = ProvidersManagementActionTypes.UnlinkCredentialAccount;

  constructor() {
  }

}

export class SetProviders implements Action {
  readonly type = ProvidersManagementActionTypes.SetProviders;

  constructor(public payload: Partial<{
    facebook: boolean;
    google: boolean;
    phone: boolean;
    password: boolean;
  }>) {
  }

}

export class CodeSent implements Action {
  readonly type = ProvidersManagementActionTypes.CodeSent;
}

export class UnlinkPhoneNumber implements Action {
  readonly type = ProvidersManagementActionTypes.UnlinkPhoneNumber;
}

export type ProvidersManagementActionsUnion = LinkCredentialAccount
  | LinkFacebookAccount
  | LinkGoogleAccount
  | VerifyPhoneNumber
  | LinkError
  | LinkSuccess
  | UnlinkSuccess
  | UnlinkFacebookAccount
  | UnlinkGoogleAccount
  | UnlinkError
  | UnlinkCredentialAccount
  | SendPhoneNumberCode
  | SetProviders
  | CodeSent;
