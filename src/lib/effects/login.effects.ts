import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { User } from '../models/auth.model';

import { AngularFireAuth } from 'angularfire2/auth';

import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as userActions from '../actions/auth.actions';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase';

export type Action = userActions.All;

@Injectable()
export class LoginEffects {

  constructor(private actions: Actions,
              private afAuth: AngularFireAuth) {
  }

  @Effect()
  getUser: Observable<Action> = this.actions.pipe(ofType<userActions.GetUser>(userActions.AuthActionTypes.GET_USER),
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
  googleLogin: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.GOOGLE_LOGIN),
    map((action: userActions.GoogleLogin) => action.payload),
    exhaustMap(payload => {
      return from(this.doGoogleLogin());
    }),
    map(credential => {
      // successful login
      return new userActions.GetUser();
    }));

  @Effect()
  facebookLogin: Observable<Action> = this.actions.pipe(ofType(userActions.AuthActionTypes.FACEBOOK_LOGIN),

    map((action: userActions.FacebookLogin) => action.payload),
    exhaustMap(payload => {
      return from(this.doFacebookLogin());
    }),
    map(credential => {
      // successful login
      return new userActions.GetUser();
    }));

  @Effect()
  loginWithCredentials: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.CREDENTIALS_LOGIN),
    map((action: userActions.CredentialsLogin) => {
      return {
        email: action.email,
        password: action.password,
        remember: (action.remember) ? action.remember : false
      };
    }),
    exhaustMap(credentials => {
      return from(this.doLoginWithCredentials(credentials));
    }),
    map(p => {
      // successful login
      return new userActions.GetUser();
    })
  );

  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.LOGOUT),
    map((action: userActions.Logout) => action.payload),
    exhaustMap(payload => {
      return from(this.afAuth.auth.signOut());
    }),
    map(authData => {
      return new userActions.NotAuthenticated();
    })
  );

  private doFacebookLogin(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private doGoogleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private doLoginWithCredentials(credentials: { email: string, password: string, remember?: boolean }): Promise<any> {
    if (credentials.remember) {
      return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      });
    } else {
      return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      });
    }
  }
}
