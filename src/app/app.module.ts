import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/component/login/login.component';
import {UserComponent} from './user/user.component';
import {CustomMaterialModule} from './core/custom-material-module/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {LoginContainerComponent} from './login/container/login-container/login-container.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {reducers} from './core/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    LoginContainerComponent
  ],
  imports: [
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
