/// Reducer function
import {State} from './index';
import {Action} from '@ngrx/store';

export function appReducer(state: State = {} as State, action: Action): State {
  switch (action.type) {
    default:
      return state;
  }
}
