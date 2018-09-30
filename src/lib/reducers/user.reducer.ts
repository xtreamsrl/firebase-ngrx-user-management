import * as userActions from '../actions/auth.actions';
import {User} from '../models/auth.model';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

export type Action = userActions.AuthActionsUnion;

export interface State {
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
export function reducer(state: State = defaultState, action: Action): State {
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
    case userActions.AuthActionTypes.FacebookReAuthentication:
    case userActions.AuthActionTypes.CredentialsReAuthentication:
    case userActions.AuthActionTypes.GoogleReAuthentication:
      return {...state, loading: true, success: false};

    case userActions.AuthActionTypes.ResetPasswordRequestSuccess:
      return {...state, loading: false, success: true};

    case userActions.AuthActionTypes.AuthError:
    case userActions.AuthActionTypes.ReAuthenticationError:
      return {...state, loading: false, success: false};
    case userActions.AuthActionTypes.ReAuthenticationSuccess:
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
