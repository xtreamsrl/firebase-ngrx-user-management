import * as fromUser from './user.reducer';
import * as fromChangePassword from './password-management.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

export interface AuthState {
  user: fromUser.State;
  changePassword: fromChangePassword.State;
}

export const reducers: ActionReducerMap<AuthState> = {
  user: fromUser.reducer,
  changePassword: fromChangePassword.reducer
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
