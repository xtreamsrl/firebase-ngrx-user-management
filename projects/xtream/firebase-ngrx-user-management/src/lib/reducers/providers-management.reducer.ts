import {ProvidersManagementActions} from '../actions';

export interface State {
  loading: boolean;
  success: boolean;
  providers: {
    facebook: boolean;
    google: boolean;
    phone: boolean;
    password: boolean;
  };
  error: {
    code: string;
    message: string
  };
}

const initialState = {
  loading: false,
  success: false,
  providers: {
    facebook: false,
    google: false,
    phone: false,
    password: false
  },
  error: null
} as State;

export function reducer(state = initialState, action: ProvidersManagementActions.ProvidersManagementActionsUnion): State {
  switch (action.type) {

    case ProvidersManagementActions.ProvidersManagementActionTypes.SetProviders:
      return {...state, providers: {...state.providers, ...action.payload}};

    case ProvidersManagementActions.ProvidersManagementActionTypes.LinkCredentialAccount:
    case ProvidersManagementActions.ProvidersManagementActionTypes.LinkFacebookAccount:
    case ProvidersManagementActions.ProvidersManagementActionTypes.LinkGoogleAccount:
    case ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkCredentialAccount:
    case ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkGoogleAccount:
    case ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkFacebookAccount:
      return {...state, success: false, error: null, loading: true};

    case  ProvidersManagementActions.ProvidersManagementActionTypes.LinkSuccess:
      return {...state, providers: {...state.providers, [action.payload.provider]: true}, success: true, error: null, loading: false};

    case  ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkSuccess:
      return {...state, providers: {...state.providers, [action.payload.provider]: false}, success: true, error: null, loading: false};

    case  ProvidersManagementActions.ProvidersManagementActionTypes.LinkError:
    case  ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkError:
      return {...state, success: false, error: action.payload, loading: false};

    default:
      return state;
  }
}
