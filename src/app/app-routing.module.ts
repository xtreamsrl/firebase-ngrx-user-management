import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user/component/user.component';
import {LoginContainerComponent} from './login/container/login-container/login-container.component';
import {RegistrationContainerComponent} from './registration/container/registration-container/registration-container.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginContainerComponent},
  {path: 'registration', component: RegistrationContainerComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
