import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {User} from '../models/auth.model';

import {AngularFireAuth} from 'angularfire2/auth';

import {catchError, exhaustMap, map, mergeMap} from 'rxjs/operators';
import * as userActions from '../actions/auth.actions';
import {from, Observable} from 'rxjs';
import * as firebase from 'firebase';

export type Action = userActions.All;

@Injectable()
export class AuthEffects {

  constructor(private actions: Actions,
              private afAuth: AngularFireAuth) {
  }

  @Effect()
  getUser: Observable<Action> = this.actions.pipe(ofType<userActions.GetUser>(userActions.GET_USER),
    map((action: userActions.GetUser) => action.payload),
    exhaustMap(payload => this.afAuth.authState),
    map(authData => {
      console.debug(authData);
      if (authData) {
        /// User logged in
        console.debug('USER', authData);
        const user = new User(authData.uid, authData.displayName, authData.email, authData.photoURL);
        return new userActions.Authenticated(user);
      } else {
        /// User not logged in
        return new userActions.NotAuthenticated();
      }

    }));

  @Effect()
  login: Observable<Action> = this.actions.pipe(
    ofType(userActions.GOOGLE_LOGIN),
    map((action: userActions.GoogleLogin) => action.payload),
    exhaustMap(payload => {
      return from(this.googleLogin());
    }),
    map(credential => {
      // successful login
      return new userActions.GetUser();
    }));

  @Effect()
  loginFacebook: Observable<Action> = this.actions.pipe(ofType(userActions.FACEBOOK_LOGIN),

    map((action: userActions.FacebookLogin) => action.payload),
    exhaustMap(payload => {
      return from(this.facebookLogin());
    }),
    map(credential => {
      // successful login
      return new userActions.GetUser();
    }));

  @Effect()
  loginCredentials: Observable<Action> = this.actions.pipe(
    ofType(userActions.CREDENTIALS_LOGIN),
    map((action: userActions.CredentialsLogin) => {
      return {
        email: action.email,
        password: action.password
      };
    }),
    exhaustMap(credentials => {
      return from(this.credentialsLogin(credentials));
    }),
    map(p => {
      // successful login
      return new userActions.GetUser();
    })
  );

  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType(userActions.LOGOUT),
    map((action: userActions.Logout) => action.payload),
    exhaustMap(payload => {
      return from(this.afAuth.auth.signOut());
    }),
    map(authData => {
      return new userActions.NotAuthenticated();
    })
  );

  private facebookLogin(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private credentialsLogin(credentials: { email: string, password: string }): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }
}
