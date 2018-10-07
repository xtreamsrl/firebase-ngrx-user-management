/*
 * Public API Surface of firebase-ngrx-user-management
 */

import {IUser, User} from './lib/models/auth.model';
import {
  AuthState,
  getAuthError,
  getAuthState,
  getChangePasswordStatus,
  getCustomEmailHandlerRequestStatus,
  getEmailVerifiedError,
  getProvidersRequestStatus,
  getUser,
  getUserProviders,
  getUserProvidersState,
  getUserState,
  isAuthLoading,
  isAuthSuccess,
  isEmailVerifiedLoading,
  isUserLogged
} from './lib/reducers/index';
import {Credentials} from './lib/models/credentials';
import {PasswordManagementActions, ProvidersManagementActions} from './lib/actions/index';
import {State as UserState} from './lib/reducers/user.reducer';
import {State as ProvidersState} from './lib/reducers/providers-management.reducer';
import {VerifyEmailAddress} from './lib/actions/custom-email-handler.actions';

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
  ProvidersState
};
