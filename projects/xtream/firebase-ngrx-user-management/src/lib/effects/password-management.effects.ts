import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {auth} from 'firebase/app';

import * as PasswordActions from '../actions/password-management.actions';
import {catchError, exhaustMap, map, mapTo, take} from 'rxjs/operators';
import {User} from 'firebase';

@Injectable()
export class PasswordManagementEffects {

  @Effect()
  passwordForgotten$ = this.actions$.pipe(
    ofType<PasswordActions.ResetPasswordRequest>(PasswordActions.PasswordManagementActionTypes.ResetPasswordRequest),
    map(action => action.payload),
    exhaustMap(payload => {
      return from(this.afAuth.sendPasswordResetEmail(payload.email, {url: payload.redirectUrl})).pipe(
        map(authData => {
          return new PasswordActions.ResetPasswordRequestSuccess();
        }),
        catchError(err => of(new PasswordActions.ResetPasswordRequestError(err)))
      );
    })
  );
  private user: User;
  @Effect()
  changePassword: Observable<Action> = this.actions$.pipe(
    ofType<PasswordActions.ChangePasswordRequest>(PasswordActions.PasswordManagementActionTypes.ChangePasswordRequest),
    map(action => action.payload),
    exhaustMap(payload => {
      const credentials = auth.EmailAuthProvider.credential(this.user.email, payload.oldPassword);
      return from(this.user.reauthenticateWithCredential(credentials).then(async res => {
        await this.user.updatePassword(payload.newPassword);
        return;
      })).pipe(
        mapTo(new PasswordActions.ChangePasswordSuccess()),
        catchError(error => of(new PasswordActions.ChangePasswordError(error)))
      );
    })
  );

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth) {
    this.userObservable().subscribe(user => this.user = user);

  }

  private userObservable(): Observable<User> {
    return this.afAuth.user.pipe(
      take(1),
      map(user => user)
    );
  }
}
