import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {userReducer} from './reducers/user.reducer';
import {LoginEffects} from './effects/login.effects';
import {AngularFireModule} from 'angularfire2';
import {RegistrationEffects} from './effects/registration.effects';

@NgModule({
  imports: [
    AngularFireModule,
    AngularFireAuthModule,
    EffectsModule.forFeature([
      LoginEffects,
      RegistrationEffects
    ]),

    StoreModule.forFeature('auth', userReducer)
  ],
  declarations: [],
  exports: []
})
export class FirebaseNgrxUserManagementModule {
}
