import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {User} from '../models/auth.model';

import {AngularFireAuth} from 'angularfire2/auth';

import {catchError, exhaustMap, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import * as userActions from '../actions/auth.actions';
import {from, Observable, of, zip} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export type Action = userActions.AuthActionsUnion;

@Injectable()
export class LoginEffects {

  constructor(private actions: Actions,
              private afAuth: AngularFireAuth) {
  }

  @Effect()
  getUser: Observable<Action> = this.actions.pipe(
    ofType<userActions.GetUser>(userActions.AuthActionTypes.GetUser),
    map((action: userActions.GetUser) => action.payload),
    exhaustMap(payload => this.afAuth.authState.pipe(
      take(1),
      switchMap(authData => {
        console.debug(authData);
        if (authData) {
          /// User logged in
          console.debug('USER', authData);
          return zip(from(authData.getIdToken(true)), from(this.afAuth.auth.fetchSignInMethodsForEmail(this.afAuth.auth.currentUser.email))).pipe(
            map(([res, providers]) => {
              console.debug('providers found', providers);
              const providersMap = {};
              if (providers.indexOf('facebook.com') > -1) {
                providersMap['facebook'] = true;
              }
              if (providers.indexOf('google.com') > -1) {
                providersMap['google'] = true;
              }
              if (providers.indexOf('password') > -1) {
                providersMap['password'] = true;
              }
              const user = new User(authData.uid, authData.displayName, authData.email, providersMap, authData.photoURL, authData.emailVerified);
              return new userActions.Authenticated(user);
            })
          );
        } else {
          return of(new userActions.NotAuthenticated());
        }
      }))
    )
  )
  ;

  @Effect()
  googleLogin: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.GoogleLogin),
    map((action: userActions.GoogleLogin) => action.payload),
    exhaustMap(payload => {
      return from(this.doGoogleLogin()).pipe(
        map(credential => {
          // successful login
          return new userActions.GetUser();
        }),
        catchError(error => of(new userActions.AuthError(error)))
      );
    })
  );

  @Effect()
  facebookLogin: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.FacebookLogin),
    map((action: userActions.FacebookLogin) => action.payload),
    exhaustMap(payload => {
      return from(this.doFacebookLogin()).pipe(
        map(credential => {
          // successful login
          return new userActions.GetUser();
        }),
        catchError(error => of(new userActions.AuthError(error)))
      );
    })
  );

  @Effect()
  loginWithCredentials: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.CredentialsLogin),
    map((action: userActions.CredentialsLogin) => {
      return {
        email: action.email,
        password: action.password,
        remember: (action.remember) ? action.remember : false
      };
    }),
    exhaustMap(credentials => {
      return from(this.doLoginWithCredentials(credentials)).pipe(
        map(p => {
          // successful login
          return new userActions.GetUser();
        }),
        catchError(error => of(new userActions.AuthError(error)))
      );
    })
  );

  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType(userActions.AuthActionTypes.Logout),
    map((action: userActions.Logout) => action.payload),
    exhaustMap(payload => {
      return from(this.afAuth.auth.signOut());
    }),
    map(authData => {
      return new userActions.NotAuthenticated();
    })
  );

  @Effect()
  passwordForgotten$ = this.actions.pipe(
    ofType<userActions.ResetPasswordRequest>(userActions.AuthActionTypes.ResetPasswordRequest),
    map((action: userActions.ResetPasswordRequest) => action.payload),
    exhaustMap(payload => {
      return from(this.afAuth.auth.sendPasswordResetEmail(payload.email));
    }),
    map(authData => {
      return new userActions.ResetPasswordRequestSuccess();
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
