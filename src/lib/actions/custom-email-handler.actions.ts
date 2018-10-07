import {Action} from '@ngrx/store';

export enum CustomEmailHandlerActionTypes {
  CheckActionCode = '[Auth/CustomEmailHandler] Check Action Code',
  CheckActionCodeError = '[Auth/CustomEmailHandler] Check Action Code Error',
  CheckActionCodeSuccess = '[Auth/CustomEmailHandler] Check Action Code Success',
  RecoverEmail = '[Auth/CustomEmailHandler] Recover Email',
  RecoverEmailSuccess = '[Auth/CustomEmailHandler] Recover Email Success',
  RecoverEmailError = '[Auth/CustomEmailHandler] Recover Email Error',
  ResetPassword = '[Auth/CustomEmailHandler] Reset Password',
  ResetPasswordSuccess = '[Auth/CustomEmailHandler] Reset Password Success',
  ResetPasswordError = '[Auth/CustomEmailHandler] Reset Password Error',
  VerifyEmailAddress = '[Auth/CustomEmailHandler] Verify Email Address',
  VerifyEmailAddressSuccess = '[Auth/CustomEmailHandler] Verify Email Address Success',
  VerifyEmailAddressError = '[Auth/CustomEmailHandler] Verify Email Address Error',
  VerifyPasswordResetCode = '[Auth/CustomEmailHandler] Verify Password Reset Code',
  VerifyPasswordResetCodeError = '[Auth/CustomEmailHandler] Verify Password Reset Error',
  VerifyPasswordResetCodeSuccess = '[Auth/CustomEmailHandler] Verify Password Reset Success'
}

export class CheckActionCode implements Action {
  readonly type = CustomEmailHandlerActionTypes.CheckActionCode;

  constructor(public payload: { actionCode: string }) {
  }
}

export class CheckActionCodeError implements Action {
  readonly type = CustomEmailHandlerActionTypes.CheckActionCodeError;

  constructor(public payload: { code: string, message: string }) {
  }
}

export class CheckActionCodeSuccess implements Action {
  readonly type = CustomEmailHandlerActionTypes.CheckActionCodeSuccess;

  constructor(public payload: { actionCode: string, restoredEmail: string }) {
  }
}

export class RecoverEmail implements Action {
  readonly type = CustomEmailHandlerActionTypes.RecoverEmail;

  constructor(public payload: { actionCode: string}) {
  }
}

export class RecoverEmailError implements Action {
  readonly type = CustomEmailHandlerActionTypes.RecoverEmailError;

  constructor(public payload: { code: string, message: string }) {
  }
}

export class RecoverEmailSuccess implements Action {
  readonly type = CustomEmailHandlerActionTypes.RecoverEmailSuccess;

}

export class ResetPassword implements Action {
  readonly type = CustomEmailHandlerActionTypes.ResetPassword;

  constructor(public payload: { actionCode: string, newPassword: string }) {
  }
}

export class ResetPasswordError implements Action {
  readonly type = CustomEmailHandlerActionTypes.ResetPasswordError;

  constructor(public payload: { code: string, message: string }) {
  }
}

export class ResetPasswordSuccess implements Action {
  readonly type = CustomEmailHandlerActionTypes.ResetPasswordSuccess;

}

export class VerifyEmailAddress implements Action {
  readonly type = CustomEmailHandlerActionTypes.VerifyEmailAddress;

  constructor(public payload: { actionCode: string}) {
  }
}

export class VerifyEmailAddressError implements Action {
  readonly type = CustomEmailHandlerActionTypes.VerifyEmailAddressError;

  constructor(public payload: { code: string, message: string }) {
  }
}

export class VerifyEmailAddressSuccess implements Action {
  readonly type = CustomEmailHandlerActionTypes.VerifyEmailAddressSuccess;

}

export class VerifyPasswordResetCode implements Action {
  readonly type = CustomEmailHandlerActionTypes.VerifyPasswordResetCode;

  constructor(public payload: { actionCode: string }) {
  }
}

export class VerifyPasswordResetCodeError implements Action {
  readonly type = CustomEmailHandlerActionTypes.VerifyPasswordResetCodeError;

  constructor(public payload: { code: string, message: string }) {
  }
}

export class VerifyPasswordResetCodeSuccess implements Action {
  readonly type = CustomEmailHandlerActionTypes.VerifyPasswordResetCodeSuccess;

  constructor(public payload: { email: string, actionCode: string }) {
  }
}

export type CustomEmailHandlerActionsUnion = CheckActionCode
  | CheckActionCodeError
  | CheckActionCodeSuccess
  | RecoverEmail
  | RecoverEmailSuccess
  | RecoverEmailError
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordError
  | VerifyEmailAddress
  | VerifyEmailAddressError
  | VerifyEmailAddressSuccess
  | VerifyPasswordResetCode
  | VerifyPasswordResetCodeError
  | VerifyPasswordResetCodeSuccess;
