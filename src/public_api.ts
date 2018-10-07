/*
 * Public API Surface of firebase-ngrx-user-management
 */

import {IUser, User} from './lib/models/auth.model';
import {
  AuthState,
  getAuthError,
  getAuthState,
  getChangePasswordStatus,
  getCheckCodeError,
  getCustomEmailHandlerRequestStatus,
  getEmailVerifiedError,
  getPasswordResetCodeEmail,
  getPasswordResetCodeError,
  getProvidersRequestStatus,
  getRecoverEmailError,
  getRecoverEmailOrCheckCodeError,
  getResetPasswordError,
  getResetPasswordOrCodeError,
  getUser,
  getUserProviders,
  getUserProvidersState,
  getUserState,
  isAuthLoading,
  isAuthSuccess,
  isCheckCodeLoading,
  isEmailVerifiedLoading,
  isPasswordResetCodeLoading,
  isRecoverEmailLoading,
  isRecoverEmailOrCheckCodeLoading,
  isResetPasswordLoading,
  isResetPasswordOrCodeLoading,
  isUserLogged
} from './lib/reducers/index';
import {Credentials} from './lib/models/credentials';
import {PasswordManagementActions, ProvidersManagementActions} from './lib/actions/index';
import {State as UserState} from './lib/reducers/user.reducer';
import {State as ProvidersState} from './lib/reducers/providers-management.reducer';
import {CheckActionCode, CheckActionCodeSuccess, CustomEmailHandlerActionTypes, RecoverEmail, ResetPassword, VerifyEmailAddress,
VerifyPasswordResetCode, VerifyPasswordResetCodeSuccess} from './lib/actions/custom-email-handler.actions';

export * from './lib/firebase-ngrx-user-management.service';
export * from './lib/firebase-ngrx-user-management.module';
export * from './lib/actions/auth.actions';

export {
  AuthState,
  Credentials,
  IUser,
  User,
  getAuthState,
  isAuthLoading,
  PasswordManagementActions,
  ProvidersManagementActions,
  UserState,
  getChangePasswordStatus,
  isUserLogged,
  getUser,
  getAuthError,
  isAuthSuccess,
  getUserState,
  getUserProvidersState,
  getUserProviders,
  getProvidersRequestStatus,
  getCustomEmailHandlerRequestStatus,
  isEmailVerifiedLoading,
  getEmailVerifiedError,
  VerifyEmailAddress,
  ResetPassword,
  VerifyPasswordResetCode,
  CheckActionCode,
  RecoverEmail,
  isRecoverEmailLoading,
  isResetPasswordLoading,
  isPasswordResetCodeLoading,
  isCheckCodeLoading,
  getPasswordResetCodeError,
  getRecoverEmailError,
  getCheckCodeError,
  getResetPasswordError,
  isResetPasswordOrCodeLoading,
  getResetPasswordOrCodeError,
  getRecoverEmailOrCheckCodeError,
  isRecoverEmailOrCheckCodeLoading,
  getPasswordResetCodeEmail,
  VerifyPasswordResetCodeSuccess,
  CheckActionCodeSuccess,
  CustomEmailHandlerActionTypes,
  ProvidersState
};
