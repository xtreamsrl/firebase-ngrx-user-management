/*
 * Public API Surface of firebase-ngrx-user-management
 */

import {IUser, User} from './lib/models/auth.model';
import {AuthState, getAuthError, getAuthState, getChangePasswordStatus, getUser, getUserState, isAuthLoading, isAuthSuccess, isUserLogged} from './lib/reducers/index';
import {Credentials} from './lib/models/credentials';
import * as PasswordManagementActions from './lib/actions/password-management.actions';
import {State as UserState} from './lib/reducers/user.reducer';

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
  UserState,
  getChangePasswordStatus,
  isUserLogged,
  getUser,
  getAuthError,
  isAuthSuccess,
  getUserState
};
