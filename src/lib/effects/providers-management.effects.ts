import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {from, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {AuthActionTypes, LinkCredentialAccount, LinkError, LinkFacebookAccount, LinkGoogleAccount, LinkSuccess} from '../actions/auth.actions';
import {catchError, exhaustMap, map, mapTo} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

@Injectable()
export class ProvidersManagementEffects {

  @Effect()
  linkToGoogleAccount: Observable<Action> = this.actions$.pipe(
    ofType<LinkGoogleAccount>(AuthActionTypes.LinkGoogleAccount),
    exhaustMap(actions => {
      return from(this.doLinkToGoogleProvider()).pipe(
        mapTo(new LinkSuccess()),
        catchError(error => of(new LinkError(error)))
      );
    })
  );

  @Effect()
  linkToFacebookAccount: Observable<Action> = this.actions$.pipe(
    ofType<LinkFacebookAccount>(AuthActionTypes.LinkFacebookAccount),
    exhaustMap(actions => {
      return from(this.doLinkToFacebookProvider()).pipe(
        mapTo(new LinkSuccess()),
        catchError(error => of(new LinkError(error)))
      );
    })
  );

  @Effect()
  linkToCredentialsAccount: Observable<Action> = this.actions$.pipe(
    ofType<LinkCredentialAccount>(AuthActionTypes.LinkCredentialAccount),
    map(action => action.payload),
    exhaustMap(payload => {
      return from(this.reAuthenticate().then(async res => {
        await this.doLinkToCredentials(this.afAuth.auth.currentUser.email, payload.password);
      })).pipe(
        mapTo(new LinkSuccess()),
        catchError(error => of(new LinkError(error)))
      );
    })
  );

  private doLinkToGoogleProvider(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.currentUser.linkWithPopup(provider);
  }

  private doLinkToFacebookProvider(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.currentUser.linkWithPopup(provider);
  }

  private doLinkToCredentials(email: string, password: string): Promise<any> {
    const credentials = EmailAuthProvider.credential(email, password);
    return this.afAuth.auth.currentUser.linkAndRetrieveDataWithCredential(credentials);
  }

  private doFacebookReAuthentication(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
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

  private doGoogleReAuthentication(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
  }

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth) {

  }
}
