# Firebase Ngrx User Management

This library allows to easily manage user auth with ngrx and firebase.
Most of auth flows have bben wrapped in ngrx effect and can be triggered dispatching specifica actions.
## Install

`npm install --save @xtream/firebase-ngrx-user-management`
## Usage
The library acts as a common NgRx feature module. You can find it under the "auth" key in the state tree.

### Import

```ts
import {FirebaseNgrxUserManagementModule} from '@xtream/firebase-ngrx-user-management';

@NgModule({
    ...
    imports: [
        ...
        FirebaseNgrxUserManagementModule,
        AngularFireModule.initializeApp(environment.firebase),
        StoreModule.forRoot(reducers),
        ...
    ]
})
export class AppModule { }
```

In order to try to restore the user and verify if he is logged modify the `app.component.ts` in this way:

```ts
import {AuthActions} from '@xtream/firebase-ngrx-user-management';
 
export class AppComponent implements OnInit {
...
    ngOnInit(): void {
        this.store.dispatch(new AuthActions.GetUser());
    }
...
}
```

### Available actions

The library is logically divided into 4 logical parts:

* Auth
* Password management
* Email actions handling
* Providers management

#### Auth
| Action type | Description |
| ------ | ------ |
|Authenticated|Dispatched when an user is authenticated|
|AuthError|Dispatched when an Authentication error occurs|
|CredentialsLogin||
|CredentialsReAuthentication||
|CredentialsRegistration||
|DeleteAccount||
|DeleteAccountSuccess||
|DeleteAccountError||
|FacebookLogin||
|FacebookReAuthentication||
|FacebookRegistration||
|GetUser|Try to restore the user and dispatch as result `Authenticated` or `NotAuthenticated`|
|GoogleLogin||
|GoogleReAuthentication||
|GoogleRegistration||
|Logout||
|NotAuthenticated||
|ReAuthenticationError||
|ReAuthenticationSuccess||
|RefreshToken||
|RegistrationSuccess||
|ResetAuthState|Will reset loading, error and success state|
|SendVerificationEmail||
|VerificationEmailError||
|VerificationEmailSent||

Social login and registration tries to use popup, if popup-blocked error is trown it fallbacks to redirect.

#### Email Actions Handlers

| Action type | Description |
| ------ | ------ |
|CheckActionCode|Verify if the action code is valid or not|
|CheckActionCodeError||
|CheckActionCodeSuccess||
|RecoverEmail||
|RecoverEmailSuccess||
|RecoverEmailError||
|ResetPassword|Set new password request|
|ResetPasswordSuccess||
|ResetPasswordError||
|VerifyEmailAddress|Use action code to verify email address|
|VerifyEmailAddressSuccess||
|VerifyEmailAddressError||
|VerifyPasswordResetCode||
|VerifyPasswordResetCodeError||
|VerifyPasswordResetCodeSuccess||


### Password management
| Action type | Description |
| ------ | ------ |
|ChangePasswordRequest||
|ChangePasswordError||
|ChangePasswordSuccess||
|ResetPasswordStatus|Reset error, loading and success|
|ResetPasswordRequest||
|ResetPasswordRequestError||
|ResetPasswordRequestSuccess||

### Providers Management
| Action type | Description |
| ------ | ------ |
|CodeSent|Dispatched when phone number code has been sent successfully|
|LinkCredentialAccount||
|LinkFacebookAccount||
|LinkGoogleAccount||
|LinkError||
|LinkSuccess||
|SendPhoneNumberCode||
|SetProviders||
|UnlinkCredentialAccount||
|UnlinkFacebookAccount||
|UnlinkGoogleAccount||
|UnlinkError||
|UnlinkPhoneNumber||
|UnlinkSuccess||
|VerifyPhoneNumber||

### Selectors

|Selector| Description |
| ------ | ------ |
|getUser|Select the current user (null if not logged)|
|getUserProviders|Select the map of providers associated with the user `password`, `facebook`, `google`, `phone`|

There are other selectors to get request status of all the previous actions
