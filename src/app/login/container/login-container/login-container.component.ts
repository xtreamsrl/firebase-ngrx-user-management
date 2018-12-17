import {Component, OnInit} from '@angular/core';
import {AuthActions, AuthState} from '@xtream/firebase-ngrx-user-management';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent implements OnInit {

  constructor(private store: Store<AuthState>) {
  }

  ngOnInit() {
  }

  onGoogleLogin(): void {
    this.store.dispatch(new AuthActions.GoogleLogin());
  }

  onFacebookLogin(): void {
    this.store.dispatch(new AuthActions.FacebookLogin());
  }

  onLoginWithCredentials(credentials: { email: string, password: string, rememberMe?: boolean }): void {
    this.store.dispatch(new AuthActions.CredentialsLogin(credentials.email, credentials.password, credentials.rememberMe));
  }

}
