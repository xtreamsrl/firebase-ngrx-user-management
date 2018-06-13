import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {User} from '../models/user.model';

import {AngularFireAuth} from 'angularfire2/auth';

import {catchError, map, mergeMap, take} from 'rxjs/operators';
import * as userActions from '../actions/user.actions';
import {from, Observable} from 'rxjs';
import * as firebase from 'firebase';

export type Action = userActions.All;

@Injectable()
export class UserEffects {

  constructor(private actions: Actions,
              private afAuth: AngularFireAuth) {
  }

  @Effect()
  getUser: Observable<Action> = this.actions.pipe(ofType(userActions.GET_USER),
    map((action: userActions.GetUser) => action.payload),
    mergeMap(payload => this.afAuth.authState),
    map(authData => {
      console.debug(authData);
      if (authData) {
        /// User logged in
        console.debug('USER', authData);
        const user = new User(authData.uid, authData.displayName);
        return new userActions.Authenticated(user);
      } else {
        /// User not logged in
        return new userActions.NotAuthenticated();
      }

    }));

  @Effect()
  login: Observable<Action> = this.actions.pipe(ofType(userActions.GOOGLE_LOGIN),

    map((action: userActions.GoogleLogin) => action.payload),
    mergeMap(payload => {
      return from(this.googleLogin());
    }),
    map(credential => {
      // successful login
      return new userActions.GetUser();
    }));

  private googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  @Effect()
  loginFacebook: Observable<Action> = this.actions.pipe(ofType(userActions.FACEBOOK_LOGIN),

    map((action: userActions.FacebookLogin) => action.payload),
    mergeMap(payload => {
      return from(this.facebookLogin());
    }),
    map(credential => {
      // successful login
      return new userActions.GetUser();
    }));

  private facebookLogin(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
