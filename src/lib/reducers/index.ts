import * as fromUser from './user.reducer';
import * as fromChangePassword from './password-management.reducer';
import * as fromProviders from './providers-management.reducer';
import * as fromCustomEmailHandler from './custom-email-handler.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

export interface AuthState {
  user: fromUser.State;
  changePassword: fromChangePassword.State;
  providers: fromProviders.State;
  customEmailHandler: fromCustomEmailHandler.State;
}

export const reducers: ActionReducerMap<AuthState> = {
  user: fromUser.reducer,
  changePassword: fromChangePassword.reducer,
  providers: fromProviders.reducer,
  customEmailHandler: fromCustomEmailHandler.reducer
};

export const getAuthState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>('auth');

export const getUserState = createSelector(
  getAuthState,
  state => state.user
);

export const isAuthLoading = createSelector(
  getAuthState,
  state => state.user.loading
);

export const isUserLogged = createSelector(
  getAuthState,
  state => state.user.loggedIn && state.user.user && state.user.user.emailVerified
);

export const getUser = createSelector(
  getAuthState,
  state => state.user.user
);

export const getAuthError = createSelector(
  getAuthState,
  state => state.user.error
);

export const isAuthSuccess = createSelector(
  getAuthState,
  state => state.user.success
);

export const getChangePasswordStatus = createSelector(
  getAuthState,
  state => state.changePassword
);

export const getUserProvidersState = createSelector(
  getAuthState,
  state => state.providers
);

export const getUserProviders = createSelector(
  getAuthState,
  state => state.providers.providers
);

export const getProvidersRequestStatus = createSelector(
  getAuthState,
  state => {
    return {
      loading: state.providers.loading,
      error: state.providers.error,
      success: state.providers.success
    };
  }
);

export const getCustomEmailHandlerRequestStatus = createSelector(
  getAuthState,
  state => {
    return {
      emailVerified: {
        loading: state.customEmailHandler.emailVerified.loading,
        error: state.customEmailHandler.emailVerified.error,
        success: state.customEmailHandler.emailVerified.success
      }
    };
  }
);

export const getEmailVerifiedError = createSelector(
  getAuthState,
  state => state.customEmailHandler.emailVerified.error
);

export const isEmailVerifiedLoading = createSelector(
  getAuthState,
  state => state.customEmailHandler.emailVerified.loading
);

export const getPasswordResetCodeError = createSelector(
  getAuthState,
  state => state.customEmailHandler.passwordResetCode.error
);

export const isPasswordResetCodeLoading = createSelector(
  getAuthState,
  state => state.customEmailHandler.passwordResetCode.loading
);

export const getPasswordResetCodeEmail = createSelector(
  getAuthState,
  state => state.customEmailHandler.passwordResetCode.email
);

export const getResetPasswordError = createSelector(
  getAuthState,
  state => state.customEmailHandler.resetPassword.error
);

export const isResetPasswordLoading = createSelector(
  getAuthState,
  state => state.customEmailHandler.resetPassword.loading
);

export const getCheckCodeError = createSelector(
  getAuthState,
  state => state.customEmailHandler.checkCode.error
);

export const isCheckCodeLoading = createSelector(
  getAuthState,
  state => state.customEmailHandler.checkCode.loading
);

export const getRecoverEmailError = createSelector(
  getAuthState,
  state => state.customEmailHandler.recoverEmail.error
);

export const isRecoverEmailLoading = createSelector(
  getAuthState,
  state => state.customEmailHandler.recoverEmail.loading
);

export const getResetPasswordOrCodeError = createSelector(
  getAuthState,
  state => state.customEmailHandler.resetPassword.error || state.customEmailHandler.passwordResetCode.error
);

export const getResetPasswordSuccess = createSelector(
  getAuthState,
  state => state.customEmailHandler.resetPassword.success
);

export const isResetPasswordOrCodeLoading = createSelector(
  getAuthState,
  state => state.customEmailHandler.resetPassword.loading || state.customEmailHandler.passwordResetCode.loading
);

export const getRecoverEmailOrCheckCodeError = createSelector(
  getAuthState,
  state => state.customEmailHandler.recoverEmail.error || state.customEmailHandler.checkCode.error
);

export const isRecoverEmailOrCheckCodeLoading = createSelector(
  getAuthState,
  state => state.customEmailHandler.recoverEmail.loading || state.customEmailHandler.checkCode.loading
);
