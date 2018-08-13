import * as userActions from '../actions/auth.actions';
import {User} from '../models/auth.model';

export type Action = userActions.All;

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

    case userActions.AuthActionTypes.GET_USER:
      return {...state, loading: true};

    case userActions.AuthActionTypes.AUTHENTICATED:
      return {...state, user: action.payload, loading: false, loggedIn: true};

    case userActions.AuthActionTypes.NOT_AUTHENTICATED:
      return {...state, ...defaultState, loading: false, loggedIn: false};

    case userActions.AuthActionTypes.GOOGLE_LOGIN:
      return {...state, loading: true};

    case userActions.AuthActionTypes.AUTH_ERROR:
      return {...state, loading: false, error: {...action.payload}};

    case userActions.AuthActionTypes.LOGOUT:
      return {...state, loading: true};
    default:
      return state;
  }
}
