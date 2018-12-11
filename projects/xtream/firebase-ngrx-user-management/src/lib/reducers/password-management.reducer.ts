import {PasswordManagementActions} from '../actions';

export interface State {
  loading: boolean;
  success: boolean;
  error: {
    code: string;
    message: string
  };
}

const initialState = {
  loading: false,
  success: false,
  error: null
} as State;

export function reducer(state = initialState, action: PasswordManagementActions.PasswordManagementActionsUnion): State {
  switch (action.type) {

    case PasswordManagementActions.PasswordManagementActionTypes.ResetPasswordRequest:
    case PasswordManagementActions.PasswordManagementActionTypes.ChangePasswordRequest: {
      return {...state, loading: true, success: false, error: null};
    }

    case PasswordManagementActions.PasswordManagementActionTypes.ResetPasswordRequestError:
    case PasswordManagementActions.PasswordManagementActionTypes.ChangePasswordError: {
      return {...state, loading: false, success: false, error: action.payload};
    }

    case PasswordManagementActions.PasswordManagementActionTypes.ResetPasswordRequestSuccess:
    case PasswordManagementActions.PasswordManagementActionTypes.ChangePasswordSuccess: {
      return {...state, loading: false, success: true, error: null};
    }

    case PasswordManagementActions.PasswordManagementActionTypes.ResetPasswordStatus: {
      return {...state, loading: false, success: false, error: null};
    }

    default:
      return state;
  }
}
