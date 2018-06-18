import * as userActions from '../actions/auth.actions';
import {User} from '../models/auth.model';

export type Action = userActions.All;

export interface AuthState {
  loggedIn: boolean;
  user: User | null;
  loading: boolean;
}

const defaultState = {
  loggedIn: false,
  user: new User(null, 'GUEST', 'suca@suca'),
  loading: false
};

/// Reducer function
export function userReducer(state: AuthState = defaultState, action: Action): AuthState {
  switch (action.type) {

    case userActions.GET_USER:
      return {...state, loading: true};

    case userActions.AUTHENTICATED:
      return {...state, user: action.payload, loading: false, loggedIn: true};

    case userActions.NOT_AUTHENTICATED:
      return {...state, ...defaultState, loading: false, loggedIn: false};

    case userActions.GOOGLE_LOGIN:
      return {...state, loading: true};

    case userActions.AUTH_ERROR:
      return {...state, ...action.payload, loading: false};

    case userActions.LOGOUT:
      return {...state, loading: true};
    default:
      return state;
  }
}
