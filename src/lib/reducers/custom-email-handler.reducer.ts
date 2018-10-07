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
  passwordResetCode: {
    loading: boolean;
    success: boolean;
    error: {
      code: string;
      message: string
    };
  };
  resetPassword: {
    loading: boolean;
    success: boolean;
    error: {
      code: string;
      message: string
    };
  };
  checkCode: {
    loading: boolean;
    success: boolean;
    error: {
      code: string;
      message: string
    };
  };
  recoverEmail: {
    loading: boolean;
    success: boolean;
    error: {
      code: string;
      message: string
    };
  };
}

const initialState = {
  emailVerified: null,
  passwordResetCode: null,
  resetPassword: null,
  checkCode: null,
  recoverEmail: null
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

    case CustomEmailHandlerActionTypes.VerifyPasswordResetCode: {
      return {...state, passwordResetCode: {loading: true, success: false, error: null}};
    }

    case CustomEmailHandlerActionTypes.VerifyPasswordResetCodeError: {
      return {...state, passwordResetCode: {loading: false, success: false, error: action.payload}};
    }

    case CustomEmailHandlerActionTypes.VerifyPasswordResetCodeSuccess: {
      return {...state, passwordResetCode: {loading: false, success: true, error: null}};
    }

    case CustomEmailHandlerActionTypes.CheckActionCode: {
      return {...state, checkCode: {loading: true, success: false, error: null}};
    }

    case CustomEmailHandlerActionTypes.CheckActionCodeError: {
      return {...state, checkCode: {loading: false, success: false, error: action.payload}};
    }

    case CustomEmailHandlerActionTypes.CheckActionCodeSuccess: {
      return {...state, checkCode: {loading: false, success: true, error: null}};
    }

    case CustomEmailHandlerActionTypes.RecoverEmail: {
      return {...state, recoverEmail: {loading: true, success: false, error: null}};
    }

    case CustomEmailHandlerActionTypes.RecoverEmailError: {
      return {...state, recoverEmail: {loading: false, success: false, error: action.payload}};
    }

    case CustomEmailHandlerActionTypes.RecoverEmailSuccess: {
      return {...state, recoverEmail: {loading: false, success: true, error: null}};
    }

    case CustomEmailHandlerActionTypes.ResetPassword: {
      return {...state, resetPassword: {loading: true, success: false, error: null}};
    }

    case CustomEmailHandlerActionTypes.ResetPasswordError: {
      return {...state, resetPassword: {loading: false, success: false, error: action.payload}};
    }

    case CustomEmailHandlerActionTypes.ResetPasswordSuccess: {
      return {...state, resetPassword: {loading: false, success: true, error: null}};
    }
    default:
      return state;
  }
}
