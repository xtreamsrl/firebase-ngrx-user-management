import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import * as PasswordActions from '../actions/password-management.actions';
import {catchError, exhaustMap, map, mapTo} from 'rxjs/operators';
import * as UserActions from '../actions/auth.actions';

@Injectable()
export class PasswordManagementEffects {

  @Effect()
  changePassword: Observable<Action> = this.actions$.pipe(
    ofType<PasswordActions.ChangePasswordRequest>(PasswordActions.PasswordManagementActionTypes.ChangePasswordRequest),
    map(action => action.payload),
    exhaustMap(payload => {
      const credentials = firebase.auth.EmailAuthProvider.credential(this.afAuth.auth.currentUser.email, payload.oldPassword);
      return from(this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credentials).then(async res => {
        await this.afAuth.auth.currentUser.updatePassword(payload.newPassword);
        return;
      })).pipe(
        mapTo(new PasswordActions.ChangePasswordSuccess()),
        catchError(error => of(new PasswordActions.ChangePasswordError(error)))
      );
    })
  );

  @Effect()
  passwordForgotten$ = this.actions$.pipe(
    ofType<PasswordActions.ResetPasswordRequest>(PasswordActions.PasswordManagementActionTypes.ResetPasswordRequest),
    map(action => action.payload),
    exhaustMap(payload => {
      return from(this.afAuth.auth.sendPasswordResetEmail(payload.email, {url: payload.redirectUrl})).pipe(
        map(authData => {
          return new PasswordActions.ResetPasswordRequestSuccess();
        }),
        catchError(err => of(new PasswordActions.ResetPasswordRequestError(err)))
      );
    })
  );

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth) {

  }
}
