import {AuthActions, CustomEmailHandlerActions, ProvidersManagementActions} from '../actions';
import {User} from '../models/auth.model';

export type Action = AuthActions.AuthActionsUnion
  | ProvidersManagementActions.ProvidersManagementActionsUnion
  | CustomEmailHandlerActions.CustomEmailHandlerActionsUnion;

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

    case AuthActions.AuthActionTypes.GetUser:
      return {...state, loading: true, success: false};

    case AuthActions.AuthActionTypes.Authenticated:
    case AuthActions.AuthActionTypes.RegistrationSuccess:
      return {...state, user: action.payload.user, loading: false, loggedIn: true, success: false};

    case AuthActions.AuthActionTypes.NotAuthenticated:
      return {...state, ...defaultState, loading: false, loggedIn: false, success: false};

    case AuthActions.AuthActionTypes.GoogleLogin:
    case AuthActions.AuthActionTypes.FacebookLogin:
    case AuthActions.AuthActionTypes.GoogleRegistration:
    case AuthActions.AuthActionTypes.FacebookRegistration:
    case AuthActions.AuthActionTypes.CredentialsLogin:
    case AuthActions.AuthActionTypes.CredentialsRegistration:
    case AuthActions.AuthActionTypes.FacebookReAuthentication:
    case AuthActions.AuthActionTypes.CredentialsReAuthentication:
    case AuthActions.AuthActionTypes.GoogleReAuthentication:
      return {...state, loading: true, success: false};

    case AuthActions.AuthActionTypes.ResetAuthState:
      return {...state, loading: false, success: true};

    case AuthActions.AuthActionTypes.AuthError:
    case AuthActions.AuthActionTypes.ReAuthenticationError:
      return {...state, loading: false, success: false};
    case AuthActions.AuthActionTypes.ReAuthenticationSuccess:
      return {...state, loading: false, error: null, success: true};
    case AuthActions.AuthActionTypes.Logout:
      return {...state, loading: true};
    case AuthActions.AuthActionTypes.DeleteAccount:
      return {...state, loading: true, success: true, error: null};
    case AuthActions.AuthActionTypes.DeleteAccountSuccess:
      return {...state, loading: false, loggedIn: false, success: true, error: null, user: null};

    case CustomEmailHandlerActions.CustomEmailHandlerActionTypes.VerifyEmailAddressSuccess:
      return {...state, user: {...state.user, emailVerified: true}};

    default:
      return state;
  }
}
