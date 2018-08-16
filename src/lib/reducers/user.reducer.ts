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
}

const defaultState = {
  loggedIn: false,
  user: new User(null, 'GUEST', 'suca@suca'),
  loading: false,
  error: null
};

/// Reducer function
export function userReducer(state: AuthState = defaultState, action: Action): AuthState {
  switch (action.type) {

    case userActions.AuthActionTypes.GetUser:
      return {...state, loading: true};

    case userActions.AuthActionTypes.Authenticated:
      return {...state, user: action.payload, loading: false, loggedIn: true};

    case userActions.AuthActionTypes.NotAuthenticated:
      return {...state, ...defaultState, loading: false, loggedIn: false};

    case userActions.AuthActionTypes.GoogleLogin:
    case userActions.AuthActionTypes.FacebookLogin:
    case userActions.AuthActionTypes.GoogleRegistration:
    case userActions.AuthActionTypes.FacebookRegistration:
    case userActions.AuthActionTypes.CredentialsLogin:
    case userActions.AuthActionTypes.CredentialsRegistration:
      return {...state, loading: true};

    case userActions.AuthActionTypes.AuthError:
      return {...state, loading: false, error: {...action.payload}};

    case userActions.AuthActionTypes.Logout:
      return {...state, loading: true};
    default:
      return state;
  }
}

export const getAuthState: MemoizedSelector<AuthState, AuthState> = createFeatureSelector<AuthState>('auth');

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
