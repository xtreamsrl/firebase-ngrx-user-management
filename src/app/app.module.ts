import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/component/login/login.component';
import {UserComponent} from './user/components/user/user.component';
import {CustomMaterialModule} from './core/custom-material-module/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {LoginContainerComponent} from './login/container/login-container/login-container.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {reducers} from './core/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FirebaseNgrxUserManagementModule} from '@xtream/firebase-ngrx-user-management';
import {EffectsModule} from '@ngrx/effects';
import {ToolbarContainerComponent} from './toolbar/containers/toolbar-container/toolbar-container.component';
import {ToolbarComponent} from './toolbar/components/toolbar/toolbar.component';
import {RegistrationComponent} from './registration/components/registration/registration.component';
import {RegistrationContainerComponent} from './registration/containers/registration-container/registration-container.component';
import {UserContainerComponent} from './user/containers/user-container/user-container.component';
import {CoreEffects} from './core/effects/core.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    LoginContainerComponent,
    ToolbarContainerComponent,
    ToolbarComponent,
    RegistrationComponent,
    RegistrationContainerComponent,
    UserContainerComponent
  ],
  imports: [
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FirebaseNgrxUserManagementModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CoreEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
