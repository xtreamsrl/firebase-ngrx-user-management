import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginContainerComponent} from './login/container/login-container/login-container.component';
import {RegistrationContainerComponent} from './registration/containers/registration-container/registration-container.component';
import {UserContainerComponent} from './user/containers/user-container/user-container.component';

const routes: Routes = [
  {path: 'user', component: UserContainerComponent},
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
