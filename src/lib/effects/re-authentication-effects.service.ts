import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {User} from '../models/auth.model';

import {AngularFireAuth} from '@angular/fire/auth';

import {catchError, exhaustMap, map, switchMap, take} from 'rxjs/operators';
import * as userActions from '../actions/auth.actions';
import {from, Observable, of} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export type Action = userActions.AuthActionsUnion;

@Injectable()
export class ReAuthenticationEffects {

  constructor(private actions: Actions,
              private afAuth: AngularFireAuth) {
  }

  @Effect()
  googleReAuthentication: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.GoogleReAuthentication),
    map((action: userActions.GoogleReAuthentication) => action.payload),
    exhaustMap(payload => {
      return from(this.doGoogleReAuthentication()).pipe(
        map(credential => {
          // successful login
          return new userActions.ReAuthenticationSuccess();
        }),
        catchError(error => of(new userActions.ReAuthenticationError(error)))
      );
    })
  );

  @Effect()
  facebookReAuthentication: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.FacebookReAuthentication),
    map((action: userActions.FacebookReAuthentication) => action.payload),
    exhaustMap(payload => {
      return from(this.doFacebookReAuthentication()).pipe(
        map(credential => {
          // successful login
          return new userActions.ReAuthenticationSuccess();
        }),
        catchError(error => of(new userActions.ReAuthenticationError(error)))
      );
    })
  );

  @Effect()
  reAuthenticateWithCredentials: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.CredentialsReAuthentication),
    map((action: userActions.CredentialsReAuthentication) => {
      return {
        email: action.email,
        password: action.password
      };
    }),
    exhaustMap(credentials => {
      return from(this.doReAuthenticationWithCredentials(credentials)).pipe(
        map(p => {
          // successful login
          return new userActions.ReAuthenticationSuccess();
        }),
        catchError(error => of(new userActions.ReAuthenticationError(error)))
      );
    })
  );

  private doFacebookReAuthentication(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
  }

  private doGoogleReAuthentication(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
  }

  private doReAuthenticationWithCredentials(credentials: { email: string, password: string}): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      credentials.email,
      credentials.password
    );
    return this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
  }
}
