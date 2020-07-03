import {Component, OnInit} from '@angular/core';
import {AuthActions, AuthState} from '../../../../../projects/xtream/firebase-ngrx-user-management/src/public_api';
import {select, Store} from '@ngrx/store';
import {Credentials} from '../../../../../projects/xtream/firebase-ngrx-user-management/src/public_api';
import {Observable} from 'rxjs';
import {getAuthError, isAuthSuccess} from '../../../../../projects/xtream/firebase-ngrx-user-management/src/public_api';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.css']
})
export class RegistrationContainerComponent implements OnInit {

  public error$: Observable<{ code: string }>;
  public success$: Observable<boolean>;

  constructor(private store: Store<AuthState>) {
    this.error$ = this.store.pipe(
      select(getAuthError)
    );
    this.success$ = this.store.pipe(
      select(isAuthSuccess)
    );
  }

  ngOnInit(): void {
  }

  onGoogleLogin(): void {
    this.store.dispatch(new AuthActions.GoogleLogin());
  }

  onFacebookLogin(): void {
    this.store.dispatch(new AuthActions.FacebookLogin());
  }

  onSignUpWithCredentials(credentials: Credentials): void {
    this.store.dispatch(new AuthActions.CredentialsRegistration(credentials));
  }
}
