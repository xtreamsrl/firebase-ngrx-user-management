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
    case userActions.AuthActionTypes.FacebookReauthentication:
    case userActions.AuthActionTypes.CredentialsReauthentication:
    case userActions.AuthActionTypes.GoogleReauthentication:
      return {...state, loading: true, success: false};

    case userActions.AuthActionTypes.ResetPasswordRequestSuccess:
      return {...state, loading: false, success: true};

    case userActions.AuthActionTypes.AuthError:
    case userActions.AuthActionTypes.ReauthenticationError:
      return {...state, loading: false, success: false};
    case userActions.AuthActionTypes.ReauthenticationSuccess:
      return {...state, loading: false, error: null, success: true};
    case userActions.AuthActionTypes.Logout:
      return {...state, loading: true};
    case userActions.AuthActionTypes.RegistrationSuccess:
      return {...state, loading: false, loggedIn: true, success: true, error: null};
    case userActions.AuthActionTypes.DeleteAccount:
      return {...state, loading: true, success: true, error: null};
    case userActions.AuthActionTypes.DeleteAccountSuccess:
      return {...state, loading: false, loggedIn: false, success: true, error: null, user: null};
    case userActions.AuthActionTypes.DeleteAccountError:
      return {...state, loading: false, success: false, error: {...action.payload}};
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
  state => state.loggedIn && state.user.emailVerified
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
