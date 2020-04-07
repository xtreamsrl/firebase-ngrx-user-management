import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';

import * as customEmailHandlerActions from '../actions/custom-email-handler.actions';
import {catchError, map, mapTo, switchMap} from 'rxjs/operators';

export type Action = customEmailHandlerActions.CustomEmailHandlerActionsUnion;

@Injectable()
export class CustomEmailHandlerEffects {

  @Effect()
  verifyEmail: Observable<Action> = this.actions$.pipe(
    ofType<customEmailHandlerActions.VerifyEmailAddress>(customEmailHandlerActions.CustomEmailHandlerActionTypes.VerifyEmailAddress),
    map(action => action.payload),
    switchMap(payload => {
      return from(this.afAuth.applyActionCode(payload.actionCode).then(async res => {
      })).pipe(
        mapTo(new customEmailHandlerActions.VerifyEmailAddressSuccess()),
        catchError(error => of(new customEmailHandlerActions.VerifyEmailAddressError(error)))
      );
    })
  );

  @Effect()
  verifyPasswordResetCode: Observable<Action> = this.actions$.pipe(
    ofType<customEmailHandlerActions.VerifyPasswordResetCode>(customEmailHandlerActions.CustomEmailHandlerActionTypes.VerifyPasswordResetCode),
    map(action => action.payload),
    switchMap(payload => {
      return from(this.afAuth.verifyPasswordResetCode(payload.actionCode)).pipe(
        switchMap((email: string) => {
          return of(new customEmailHandlerActions.VerifyPasswordResetCodeSuccess({
            email,
            actionCode: payload.actionCode
          }));
        }),
        catchError(error => of(new customEmailHandlerActions.VerifyPasswordResetCodeError(error)))
      );
    })
  );

  @Effect()
  resetPassword: Observable<Action> = this.actions$.pipe(
    ofType<customEmailHandlerActions.ResetPassword>(customEmailHandlerActions.CustomEmailHandlerActionTypes.ResetPassword),
    map(action => action.payload),
    switchMap(payload => {
      return from(this.afAuth.confirmPasswordReset(payload.actionCode, payload.newPassword)).pipe(
        switchMap(() => {
          return of(new customEmailHandlerActions.ResetPasswordSuccess());
        }),
        catchError(error => of(new customEmailHandlerActions.ResetPasswordError(error)))
      );
    })
  );

  @Effect()
  checkActionCode: Observable<Action> = this.actions$.pipe(
    ofType<customEmailHandlerActions.CheckActionCode>(customEmailHandlerActions.CustomEmailHandlerActionTypes.CheckActionCode),
    map(action => action.payload),
    switchMap(payload => {
      return from(this.afAuth.checkActionCode(payload.actionCode)).pipe(
        map(info => info['data']['email']),
        switchMap((restoredEmail: string) => {
          return of(new customEmailHandlerActions.CheckActionCodeSuccess({
            actionCode: payload.actionCode,
            restoredEmail
          }));
        }),
        catchError(error => of(new customEmailHandlerActions.CheckActionCodeError(error)))
      );
    })
  );

  @Effect()
  revertOldEmail: Observable<Action> = this.actions$.pipe(
    ofType<customEmailHandlerActions.RecoverEmail>(customEmailHandlerActions.CustomEmailHandlerActionTypes.RecoverEmail),
    map(action => action.payload),
    switchMap(payload => {
      return from(this.afAuth.applyActionCode(payload.actionCode)).pipe(
        switchMap(() => {
          return of(new customEmailHandlerActions.RecoverEmailSuccess());
        }),
        catchError(error => of(new customEmailHandlerActions.RecoverEmailError(error)))
      );
    })
  );

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth) {

  }
}
