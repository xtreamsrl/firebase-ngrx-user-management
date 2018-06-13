import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {userReducer} from './reducers/user.reducer';
import {UserEffects} from './effects/user.effects';
import {AngularFireModule} from 'angularfire2';

@NgModule({
  imports: [
    AngularFireModule,
    AngularFireAuthModule,
    EffectsModule.forFeature([
      UserEffects
    ]),

    StoreModule.forFeature('user', userReducer)
  ],
  declarations: [],
  exports: []
})
export class FirebaseNgrxUserManagementModule {
}
