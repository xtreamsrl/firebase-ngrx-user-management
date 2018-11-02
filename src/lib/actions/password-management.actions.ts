import {Action} from '@ngrx/store';

export enum PasswordManagementActionTypes {
  ChangePasswordRequest = '[Auth/Password] Change Password Request',
  ChangePasswordError = '[Auth/Password] Change Password Error',
  ChangePasswordSuccess = '[Auth/Password] Change Password Success',
  ResetPasswordStatus = '[Auth/Password] Reset Change Password Status',
  ResetPasswordRequest = '[Auth/Password] Reset Password Request',
  ResetPasswordRequestError = '[Auth/Password] Reset Password Request Error',
  ResetPasswordRequestSuccess = '[Auth/Password] Reset Password Request Success'
}

export class ChangePasswordRequest implements Action {
  readonly type = PasswordManagementActionTypes.ChangePasswordRequest;

  constructor(public payload: { oldPassword: string, newPassword: string }) {
  }
}

export class ChangePasswordError implements Action {
  readonly type = PasswordManagementActionTypes.ChangePasswordError;

  constructor(public payload: { code: string, message: string }) {
  }
}

export class ChangePasswordSuccess implements Action {
  readonly type = PasswordManagementActionTypes.ChangePasswordSuccess;

}

export class ResetPasswordStatus implements Action {
  readonly type = PasswordManagementActionTypes.ResetPasswordStatus;

}

export class ResetPasswordRequest implements Action {
  readonly type = PasswordManagementActionTypes.ResetPasswordRequest;

  constructor(public payload: { email: string, redirectUrl: string }) {
  }

}

export class ResetPasswordRequestError implements Action {
  readonly type = PasswordManagementActionTypes.ResetPasswordRequestError;

  constructor(public payload: { code: string, message: string }) {
  }
}

export class ResetPasswordRequestSuccess implements Action {
  readonly type = PasswordManagementActionTypes.ResetPasswordRequestSuccess;

}

export type PasswordManagementActionsUnion = ChangePasswordRequest
  | ChangePasswordError
  | ChangePasswordSuccess
  | ResetPasswordStatus
  | ResetPasswordRequest
  | ResetPasswordRequestSuccess
  | ResetPasswordRequestError;
