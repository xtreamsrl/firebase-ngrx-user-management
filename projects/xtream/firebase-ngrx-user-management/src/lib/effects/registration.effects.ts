import {Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {AngularFireAuth} from '@angular/fire/auth';

import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {AuthActions} from '../actions';
import {from, Observable, of} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {User} from '../models/auth.model';
import {ProvidersManagementActionsUnion, SetProviders} from '../actions/providers-management.actions';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Platform} from '@ionic/angular';
import {FIREBASE_USER_MANAGEMENT_CONFIG, FirebaseUserManagementConfig} from '../config';

export type Action = AuthActions.AuthActionsUnion | ProvidersManagementActionsUnion;

@Injectable()
export class RegistrationEffects {

  constructor(private actions: Actions,
              private fb: Facebook,
              private gplus: GooglePlus,
              private platform: Platform,
              private afAuth: AngularFireAuth,
              @Inject(FIREBASE_USER_MANAGEMENT_CONFIG) private  config: FirebaseUserManagementConfig) {
  }


  @Effect()
  googleSignUp: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.AuthActionTypes.GoogleRegistration),
    map((action: AuthActions.GoogleRegistration) => action.payload),
    exhaustMap(payload => {
      return from(this.doGoogleLogin()).pipe(
        switchMap(credential => {
          console.debug('credential', credential);
          const authData = credential.user;
          const photoUrl = authData.photoURL;
          const user = new User(authData.uid, authData.displayName, authData.email, authData.phoneNumber, photoUrl, authData.emailVerified);
          return from([new SetProviders({google: true}), new AuthActions.RegistrationSuccess({user})]);
        }),
        catchError(error => {
          console.error(error);
          return of(new AuthActions.AuthError(error));
        })
      );
    })
  );

  @Effect()
  facebookSignUp: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.AuthActionTypes.FacebookRegistration),
    map((action: AuthActions.FacebookRegistration) => action.payload),
    exhaustMap(payload => {
      return from(this.doFacebookLogin()).pipe(
        switchMap(credential => {
          console.debug('facebookSignUp', credential);
          const authData = credential.user;
          const photoUrl = authData.photoURL;
          console.log('PhotoUrl', photoUrl);
          const user = new User(authData.uid, authData.displayName, authData.email, authData.phoneNumber, photoUrl, authData.emailVerified);
          return from([new SetProviders({facebook: true}), new AuthActions.RegistrationSuccess({user})]);
        }),
        catchError(error => of(new AuthActions.AuthError(error)))
      );
    })
  );

  @Effect()
  signUpWithCredentials: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.AuthActionTypes.CredentialsRegistration),
    map((action: AuthActions.CredentialsRegistration) => {
      return {
        email: action.payload.email,
        password: action.payload.password
      };
    }),
    exhaustMap(credentials => {
      return from(this.doSignUpWithCredentials(credentials)).pipe(
        map(credential => {
          console.debug('doSignUpWithCredentials', credential);
          const authData = credential.user;
          const user = new User(authData.uid, authData.displayName, authData.email, authData.phoneNumber, authData.photoURL, authData.emailVerified);
          return new AuthActions.RegistrationSuccess({user});
        }),
        catchError(error => of(new AuthActions.AuthError(error)))
      );
    })
  );

  @Effect()
  sendVerificationEmail$: Observable<Action> = this.actions.pipe(
    ofType<AuthActions.SendVerificationEmail>(AuthActions.AuthActionTypes.SendVerificationEmail),
    map(action => action.payload),
    exhaustMap(payload => {
      return from(this.afAuth.auth.currentUser.sendEmailVerification({url: payload.redirectUrl})).pipe(
        map(p => {
          return new AuthActions.VerificationEmailSent();
        }),
        catchError(error => of(new AuthActions.VerificationEmailError(error)))
      );
    })
  );

  private doFacebookLogin(): Promise<firebase.auth.UserCredential> {
    if (this.platform.is('cordova')) {
      return this.doFacebookLoginMobile();
    } else {
      const provider = new firebase.auth.FacebookAuthProvider();
      return this.afAuth.auth.signInWithPopup(provider);
    }
  }

  private doFacebookLoginMobile(): Promise<firebase.auth.UserCredential> {
    return this.fb.login(['public_profile', 'email', 'user_friends', 'user_birthday'])
      .then((res: FacebookLoginResponse) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential);
      });
  }

  private doGoogleLogin(): Promise<firebase.auth.UserCredential> {
    if (this.platform.is('cordova')) {
      return this.doGoogleLoginMobile();
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      return this.afAuth.auth.signInWithPopup(provider);
    }
  }

  private doGoogleLoginMobile(): Promise<firebase.auth.UserCredential> {
    console.debug('Logging in into googlw mobile');
    const loginP = this.gplus.login({
      webClientId: this.config.googleWebClientId,
      offline: true,
      scopes: 'profile email'
    });
    loginP.catch(console.error);
    return loginP.then(gplusUser => {
      console.debug('Logging in into googlw mobile', gplusUser);
      return this.afAuth.auth.signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
    });

  }

  private doSignUpWithCredentials(credentials: {email: string, password: string}): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }
}
