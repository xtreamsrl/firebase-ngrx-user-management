import {ActionReducer, ActionReducerMap} from '@ngrx/store';
import * as fromApp from './app.reducer';
import {Params} from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  app: any;
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.appReducer
};

