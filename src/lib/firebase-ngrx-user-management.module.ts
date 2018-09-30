import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {reducers} from './reducers/index';
import {LoginEffects} from './effects/login.effects';
import {AngularFireModule} from 'angularfire2';
import {RegistrationEffects} from './effects/registration.effects';
import {ReAuthenticationEffects} from './effects/re-authentication-effects.service';
import {ProvidersManagementEffects} from './effects/providers-management.effects';
import {PasswordManagementEffects} from './effects/password-management.effects';

@NgModule({
  imports: [
    AngularFireModule,
    AngularFireAuthModule,
    EffectsModule.forFeature([
      LoginEffects,
      ReAuthenticationEffects,
      RegistrationEffects,
      ProvidersManagementEffects,
      PasswordManagementEffects
    ]),

    StoreModule.forFeature('auth', reducers)
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class FirebaseNgrxUserManagementModule {

}
