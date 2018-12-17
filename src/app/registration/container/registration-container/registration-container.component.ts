import {Component, OnInit} from '@angular/core';
import {AuthActions, AuthState} from '@xtream/firebase-ngrx-user-management';
import {select, Store} from '@ngrx/store';
import {Credentials} from '@xtream/firebase-ngrx-user-management';
import {Observable} from 'rxjs';
import { getAuthError} from '@xtream/firebase-ngrx-user-management';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.css']
})
export class RegistrationContainerComponent implements OnInit {

  public error$: Observable<{ code: string }>;

  constructor(private store: Store<AuthState>) {
    this.error$ = this.store.pipe(
      select(getAuthError)
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
