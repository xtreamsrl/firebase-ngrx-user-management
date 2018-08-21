import * as userActions from '../actions/auth.actions';
import {User} from '../models/auth.model';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

export type Action = userActions.AuthActionsUnion;

export interface AuthState {
  loggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: {
    code: string;
  };
  success: boolean;
}

const defaultState = {
  loggedIn: false,
  user: null,
  loading: true,
  error: null,
  success: false
};

/// Reducer function
export function userReducer(state: AuthState = defaultState, action: Action): AuthState {
  switch (action.type) {

    case userActions.AuthActionTypes.GetUser:
      return {...state, loading: true, success: false};

    case userActions.AuthActionTypes.Authenticated:
      return {...state, user: action.payload, loading: false, loggedIn: true, success: false};

    case userActions.AuthActionTypes.NotAuthenticated:
      return {...state, ...defaultState, loading: false, loggedIn: false, success: false};

    case userActions.AuthActionTypes.GoogleLogin:
    case userActions.AuthActionTypes.FacebookLogin:
    case userActions.AuthActionTypes.GoogleRegistration:
    case userActions.AuthActionTypes.FacebookRegistration:
    case userActions.AuthActionTypes.CredentialsLogin:
    case userActions.AuthActionTypes.CredentialsRegistration:
    case userActions.AuthActionTypes.ResetPasswordRequest:
      return {...state, loading: true, success: false};

    case userActions.AuthActionTypes.ResetPasswordRequestSuccess:
      return {...state, loading: false, success: true};

    case userActions.AuthActionTypes.AuthError:
      return {...state, loading: false, error: {...action.payload}, success: false};

    case userActions.AuthActionTypes.Logout:
      return {...state, loading: true};
    default:
      return state;
  }
}

export const getAuthState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>('auth');

export const isAuthLoading = createSelector(
  getAuthState,
  state => state.loading
);

export const isUserLogged = createSelector(
  getAuthState,
  state => state.loggedIn
);

export const getUser = createSelector(
  getAuthState,
  state => state.user
);

export const getError = createSelector(
  getAuthState,
  state => state.error
);

export const isStatusSuccess = createSelector(
  getAuthState,
  state => state.success
);
