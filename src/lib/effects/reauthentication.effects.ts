import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {User} from '../models/auth.model';

import {AngularFireAuth} from 'angularfire2/auth';

import {catchError, exhaustMap, map, switchMap, take} from 'rxjs/operators';
import * as userActions from '../actions/auth.actions';
import {from, Observable, of} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export type Action = userActions.AuthActionsUnion;

@Injectable()
export class ReauthenticationEffects {

  constructor(private actions: Actions,
              private afAuth: AngularFireAuth) {
  }

  @Effect()
  googleReauthentication: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.GoogleReauthentication),
    map((action: userActions.GoogleReauthentication) => action.payload),
    exhaustMap(payload => {
      return from(this.doGoogleReauthentication()).pipe(
        map(credential => {
          // successful login
          return new userActions.ReauthenticationSuccess();
        }),
        catchError(error => of(new userActions.ReauthenticationError(error)))
      );
    })
  );

  @Effect()
  facebookReauthentication: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.FacebookReauthentication),
    map((action: userActions.FacebookReauthentication) => action.payload),
    exhaustMap(payload => {
      return from(this.doFacebookReauthentication()).pipe(
        map(credential => {
          // successful login
          return new userActions.ReauthenticationSuccess();
        }),
        catchError(error => of(new userActions.ReauthenticationError(error)))
      );
    })
  );

  @Effect()
  reauthenticateWithCredentials: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.CredentialsReauthentication),
    map((action: userActions.CredentialsReauthentication) => {
      return {
        email: action.email,
        password: action.password
      };
    }),
    exhaustMap(credentials => {
      return from(this.doReauthenticationWithCredentials(credentials)).pipe(
        map(p => {
          // successful login
          return new userActions.ReauthenticationSuccess();
        }),
        catchError(error => of(new userActions.ReauthenticationError(error)))
      );
    })
  );

  private doFacebookReauthentication(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
  }

  private doGoogleReauthentication(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
  }

  private doReauthenticationWithCredentials(credentials: { email: string, password: string}): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      credentials.email,
      credentials.password
    );
    return this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
  }
}
