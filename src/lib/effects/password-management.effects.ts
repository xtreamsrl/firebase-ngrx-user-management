import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AngularFireAuth} from 'angularfire2/auth';
import {from, Observable, of} from 'rxjs';
import {Action, select} from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

import * as passwordActions from '../actions/password-management.actions';
import {catchError, exhaustMap, map, mapTo} from 'rxjs/operators';

@Injectable()
export class PasswordManagementEffects {

  @Effect()
  changePassword: Observable<Action> = this.actions$.pipe(
    ofType<passwordActions.ChangePasswordRequest>(passwordActions.PasswordManagementActionTypes.ChangePasswordRequest),
    map(action => action.payload),
    exhaustMap(payload => {
      const credentials = EmailAuthProvider.credential(this.afAuth.auth.currentUser.email, payload.oldPassword);
      return from(this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credentials).then(async res => {
        await this.afAuth.auth.currentUser.updatePassword(payload.newPassword);
        return;
      })).pipe(
        mapTo(new passwordActions.ChangePasswordSuccess()),
        catchError(error => of(new passwordActions.ChangePasswordError(error)))
      );
    })
  );

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth) {

  }
}
