import {CustomEmailHandlerActionsUnion, CustomEmailHandlerActionTypes} from '../actions/custom-email-handler.actions';

export interface State {
  emailVerified: {
    loading: boolean;
    success: boolean;
    error: {
      code: string;
      message: string
    };
  };
}

const initialState = {
  emailVerified: null
} as State;

export function reducer(state = initialState, action: CustomEmailHandlerActionsUnion): State {
  switch (action.type) {

    case CustomEmailHandlerActionTypes.VerifyEmailAddress: {
      return {...state, emailVerified: {loading: true, success: false, error: null}};
    }

    case CustomEmailHandlerActionTypes.VerifyEmailAddressError: {
      return {...state, emailVerified: {loading: false, success: false, error: action.payload}};
    }

    case CustomEmailHandlerActionTypes.VerifyEmailAddressSuccess: {
      return {...state, emailVerified: {loading: false, success: true, error: null}};
    }

    default:
      return state;
  }
}
