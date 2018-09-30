import {Action} from '@ngrx/store';

export enum PasswordManagementActionTypes {
  ChangePasswordRequest = '[Auth/Password] Change Password Request',
  ChangePasswordError = '[Auth/Password] Change Password Error',
  ChangePasswordSuccess = '[Auth/Password] Change Password Success',
  ResetChangePasswordStatus = '[Auth/Password] Reset Change Password Status'
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

export class ResetChangePasswordStatus implements Action {
  readonly type = PasswordManagementActionTypes.ResetChangePasswordStatus;

}

export type PasswordManagementActionsUnion = ChangePasswordRequest
  | ChangePasswordError
  | ChangePasswordSuccess
  | ResetChangePasswordStatus;
