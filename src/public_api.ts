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
  getEmailVerifiedStatus,
  getPasswordResetCodeEmail,
  getPasswordResetCodeError,
  getPasswordResetStatus,
  getProvidersRequestStatus,
  getRecoverEmailError,
  getRecoverEmailOrCheckCodeError,
  getResetPasswordError,
  getResetPasswordOrCodeError,
  getResetPasswordSuccess,
  getUser,
  getUserProviders,
  getUserProvidersState,
  getUserState,
  getVerifyResetPasswordProcedure,
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
import {AuthActions, CustomEmailHandlerActions, PasswordManagementActions, ProvidersManagementActions} from './lib/actions/index';
import {State as UserState} from './lib/reducers/user.reducer';
import {State as ProvidersState} from './lib/reducers/providers-management.reducer';

export * from './lib/firebase-ngrx-user-management.service';
export * from './lib/firebase-ngrx-user-management.module';

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
  getResetPasswordSuccess,
  ProvidersState,
  AuthActions,
  CustomEmailHandlerActions,
  getEmailVerifiedStatus,
  getVerifyResetPasswordProcedure,
  getPasswordResetStatus
};
