import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {AngularFireAuth} from '@angular/fire/auth';

import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {AuthActions} from '../actions';
import {from, Observable, of} from 'rxjs';
import {auth} from 'firebase/app';
import {User} from '../models/auth.model';
import {ProvidersManagementActionsUnion, SetProviders} from '../actions/providers-management.actions';
import UserCredential = auth.UserCredential;

export type Action = AuthActions.AuthActionsUnion | ProvidersManagementActionsUnion;

@Injectable()
export class RegistrationEffects {

  @Effect()
  googleSignUp: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.AuthActionTypes.GoogleRegistration),
    map((action: AuthActions.GoogleRegistration) => action.payload),
    exhaustMap(payload => {
      return from(this.doGoogleRegistration()).pipe(
        switchMap(credential => {
          console.debug('credential', credential);
          const authData = credential.user;
          const photoUrl = authData.photoURL;
          const user = new User(authData.uid, authData.displayName, authData.email, authData.phoneNumber, photoUrl, authData.emailVerified);
          return from([new SetProviders({google: true}), new AuthActions.RegistrationSuccess({user})]);
        }),
        catchError(error => of(new AuthActions.AuthError(error)))
      );
    })
  );
  @Effect()
  facebookSignUp: Observable<Action> = this.actions.pipe(
    ofType(AuthActions.AuthActionTypes.FacebookRegistration),
    map((action: AuthActions.FacebookRegistration) => action.payload),
    exhaustMap(payload => {
      return from(this.doFacebookRegistration()).pipe(
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
      return this.afAuth.user.pipe(tap(user => user.sendEmailVerification({url: payload.redirectUrl}))).pipe(
        map(p => {
          return new AuthActions.VerificationEmailSent();
        }),
        catchError(error => of(new AuthActions.VerificationEmailError(error)))
      );
    })
  );

  constructor(private actions: Actions,
              private afAuth: AngularFireAuth) {
  }

  private doFacebookRegistration(): Promise<UserCredential> {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  private doGoogleRegistration(): Promise<UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.afAuth.signInWithPopup(provider);
  }

  private doSignUpWithCredentials(credentials: { email: string, password: string }): Promise<UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }
}
