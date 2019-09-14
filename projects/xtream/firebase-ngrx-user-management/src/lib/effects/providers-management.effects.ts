import {Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {from, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {ProvidersManagementActions} from '../actions';
import {catchError, exhaustMap, map, mapTo} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import ConfirmationResult = firebase.auth.ConfirmationResult;
import {Platform} from '@ionic/angular';
import {FIREBASE_USER_MANAGEMENT_CONFIG, FirebaseUserManagementConfig} from '../config';

@Injectable()
export class ProvidersManagementEffects {

  @Effect()
  linkToGoogleAccount$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.LinkGoogleAccount>(ProvidersManagementActions.ProvidersManagementActionTypes.LinkGoogleAccount),
    exhaustMap(actins => {
      return from(this.doLinkToGoogleProvider()).pipe(
        mapTo(new ProvidersManagementActions.LinkSuccess({provider: 'google'})),
        catchError(error => of(new ProvidersManagementActions.LinkError(error)))
      );
    })
  );

  @Effect()
  linkToFacebookAccount$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.LinkFacebookAccount>(ProvidersManagementActions.ProvidersManagementActionTypes.LinkFacebookAccount),
    exhaustMap(actions => {
      return from(this.doLinkToFacebookProvider()).pipe(
        mapTo(new ProvidersManagementActions.LinkSuccess({provider: 'facebook'})),
        catchError(error => of(new ProvidersManagementActions.LinkError(error)))
      );
    })
  );

  @Effect()
  linkToCredentialsAccount$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.LinkCredentialAccount>(ProvidersManagementActions.ProvidersManagementActionTypes.LinkCredentialAccount),
    map(action => action.payload),
    exhaustMap(payload => {
      return from(this.reAuthenticate().then(async res => {
        await this.doLinkToCredentials(this.afAuth.auth.currentUser.email, payload.password);
      })).pipe(
        mapTo(new ProvidersManagementActions.LinkSuccess({provider: 'password'})),
        catchError(error => {
          if (error.code === 'auth/popup-blocked') {
            return from(this.reAuthenticateWithRedirect().then(async res => {
              await this.doLinkToCredentials(this.afAuth.auth.currentUser.email, payload.password);
            })).pipe(
              mapTo(new ProvidersManagementActions.LinkSuccess({provider: 'password'})),
              catchError(error1 => of(new ProvidersManagementActions.LinkError(error1)))
            );
          } else {
            return of(new ProvidersManagementActions.LinkError(error));
          }
        })
      );
    })
  );

  @Effect()
  unlinkGoogleAccount$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.UnlinkGoogleAccount>(ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkGoogleAccount),
    exhaustMap(actions => {
      return from(this.doUnlinkToGoogleProvider()).pipe(
        mapTo(new ProvidersManagementActions.UnlinkSuccess({provider: 'google'})),
        catchError(error => of(new ProvidersManagementActions.UnlinkError(error)))
      );
    })
  );

  @Effect()
  unlinkFacebookAccount$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.UnlinkFacebookAccount>(ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkFacebookAccount),
    exhaustMap(actions => {
      return from(this.doUnlinkToFacebookProvider()).pipe(
        mapTo(new ProvidersManagementActions.UnlinkSuccess({provider: 'facebook'})),
        catchError(error => of(new ProvidersManagementActions.UnlinkError(error)))
      );
    })
  );

  @Effect()
  unlinkCredentialsAccount$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.UnlinkCredentialAccount>(ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkCredentialAccount),
    exhaustMap(action => {
      return from(this.reAuthenticate().then(async res => {
        await this.doUnlinkToCredentials();
      })).pipe(
        mapTo(new ProvidersManagementActions.UnlinkSuccess({provider: 'password'})),
        catchError(error => of(new ProvidersManagementActions.UnlinkError(error)))
      );
    })
  );

  @Effect()
  unlinkPhone$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.UnlinkPhoneNumber>(ProvidersManagementActions.ProvidersManagementActionTypes.UnlinkPhoneNumber),
    exhaustMap(action => {
      return from(this.doUnlinkPhoneNumber()).pipe(
        mapTo(new ProvidersManagementActions.UnlinkSuccess({provider: 'phone'})),
        catchError(error => of(new ProvidersManagementActions.UnlinkError(error)))
      );
    })
  );

  @Effect()
  sendCodeToPhone$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.SendPhoneNumberCode>(ProvidersManagementActions.ProvidersManagementActionTypes.SendPhoneNumberCode),
    map(action => action.payload),
    exhaustMap(payload => {
      return from((() => {
        return this.afAuth.auth.currentUser.linkWithPhoneNumber(payload.number, new firebase.auth.RecaptchaVerifier(payload.captchaContainerId, {
          size: 'invisible',
          callback: token => {
            console.debug('Captcha token', token);

          }
        })).then(confirmation => {
          this.phoneNumberConfirmation = confirmation;
        });
      })()).pipe(
        mapTo(new ProvidersManagementActions.CodeSent()),
        catchError(error => of(new ProvidersManagementActions.LinkError(error)))
      );
    })
  );

  @Effect()
  verifyCode$: Observable<Action> = this.actions$.pipe(
    ofType<ProvidersManagementActions.VerifyPhoneNumber>(ProvidersManagementActions.ProvidersManagementActionTypes.VerifyPhoneNumber),
    map(action => action.payload),
    exhaustMap(payload => {
      return from(this.phoneNumberConfirmation.confirm(payload.code)).pipe(
        mapTo(new ProvidersManagementActions.LinkSuccess({provider: 'phone'})),
        catchError(error => of(new ProvidersManagementActions.LinkError(error)))
      );
    })
  );

  private phoneNumberConfirmation: ConfirmationResult;

  private doLinkToGoogleProvider(): Promise<any> {
    const loginP = this.gplus.login({
      webClientId: this.config.googleWebClientId,
      offline: true,
      scopes: 'profile email'
    });
    loginP.catch(console.error);
    return loginP.then(gplusUser => {
      console.debug('Logging in into googlw mobile', gplusUser);
      return this.afAuth.auth.currentUser.linkWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
    });
  }

  private doUnlinkToGoogleProvider(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.currentUser.unlink(provider.providerId);
  }

  private doLinkToFacebookProvider(): Promise<any> {
    return this.fb.login(['public_profile', 'email', 'user_friends', 'user_birthday'])
      .then((res: FacebookLoginResponse) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.afAuth.auth.currentUser.linkWithCredential(facebookCredential);
      });
  }

  private doUnlinkToFacebookProvider(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.currentUser.unlink(provider.providerId);
  }

  private doUnlinkPhoneNumber(): Promise<any> {
    const provider = new firebase.auth.PhoneAuthProvider();
    return this.afAuth.auth.currentUser.unlink(provider.providerId);
  }

  private doLinkToCredentials(email: string, password: string): Promise<any> {
    const credentials = EmailAuthProvider.credential(email, password);
    return this.afAuth.auth.currentUser.linkAndRetrieveDataWithCredential(credentials);
  }

  private doUnlinkToCredentials(): Promise<any> {
    return this.afAuth.auth.currentUser.unlink(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD);
  }

  private doFacebookReAuthentication(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
  }

  private doFacebookReAuthenticationWithRedirect(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithRedirect(provider);
  }

  private reAuthenticate(): Promise<any> {
    return this.afAuth.auth.fetchSignInMethodsForEmail(this.afAuth.auth.currentUser.email).then(
      async res => {
        if (res.indexOf('facebook.com') >= 0) {
          await this.doFacebookReAuthentication();
          return;
        } else {
          await this.doGoogleReAuthentication();
          return;
        }
      }
    );
  }

  private reAuthenticateWithRedirect(): Promise<any> {
    return this.afAuth.auth.fetchSignInMethodsForEmail(this.afAuth.auth.currentUser.email).then(
      async res => {
        if (res.indexOf('facebook.com') >= 0) {
          await this.doFacebookReAuthenticationWithRedirect();
          return;
        } else {
          await this.doGoogleReAuthenticationWithRedirect();
          return;
        }
      }
    );
  }

  private doGoogleReAuthentication(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
  }

  private doGoogleReAuthenticationWithRedirect(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
  }

  constructor(private actions$: Actions,
              private fb: Facebook,
              private gplus: GooglePlus,
              private afAuth: AngularFireAuth,
              @Inject(FIREBASE_USER_MANAGEMENT_CONFIG) private  config: FirebaseUserManagementConfig) {
  }

}
