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
  state => state.user.loggedIn && state.user.user.emailVerified
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
