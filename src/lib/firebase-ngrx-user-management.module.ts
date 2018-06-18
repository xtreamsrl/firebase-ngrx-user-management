import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {userReducer} from './reducers/user.reducer';
import {AuthEffects} from './effects/auth.effects';
import {AngularFireModule} from 'angularfire2';

@NgModule({
  imports: [
    AngularFireModule,
    AngularFireAuthModule,
    EffectsModule.forFeature([
      AuthEffects
    ]),

    StoreModule.forFeature('auth', userReducer)
  ],
  declarations: [],
  exports: []
})
export class FirebaseNgrxUserManagementModule {
}
