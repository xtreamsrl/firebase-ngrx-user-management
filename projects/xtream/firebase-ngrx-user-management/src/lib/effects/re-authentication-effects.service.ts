import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {AngularFireAuth} from '@angular/fire/auth';

import {catchError, exhaustMap, map, take, tap} from 'rxjs/operators';
import * as userActions from '../actions/auth.actions';
import {from, Observable, of} from 'rxjs';
import {auth} from 'firebase/app';
import {User} from 'firebase';

export type Action = userActions.AuthActionsUnion;

@Injectable()
export class ReAuthenticationEffects {

  @Effect()
  googleReAuthentication: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.GoogleReAuthentication),
    map((action: userActions.GoogleReAuthentication) => action.payload),
    exhaustMap(payload => {
      return this.doGoogleReAuthentication().pipe(
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
      return this.doFacebookReAuthentication().pipe(
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
      return this.doReAuthenticationWithCredentials(credentials).pipe(
        map(p => {
          // successful login
          return new userActions.ReAuthenticationSuccess();
        }),
        catchError(error => of(new userActions.ReAuthenticationError(error)))
      );
    })
  );
  private user: User;
  constructor(private actions: Actions,
              private afAuth: AngularFireAuth) {
    this.userObservable().subscribe(user => this.user = user);
  }

  private doFacebookReAuthentication(): Observable<any> {
    const provider = new auth.FacebookAuthProvider();
    return from(this.user.reauthenticateWithPopup(provider));
  }

  private doGoogleReAuthentication(): Observable<any> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.user.reauthenticateWithPopup(provider));
  }

  private doReAuthenticationWithCredentials(credentials: { email: string, password: string }): Observable<any> {
    const credential = auth.EmailAuthProvider.credential(
      credentials.email,
      credentials.password
    );
    return from(this.user.reauthenticateWithCredential(credential));
  }

  private userObservable(): Observable<User> {
    return this.afAuth.user.pipe(
      take(1),
      map(user => user)
    );
  }

}
