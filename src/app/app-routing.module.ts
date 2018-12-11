import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {LoginContainerComponent} from './login/container/login-container/login-container.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginContainerComponent},
  {path: '', redirectTo: 'user', pathMatch: 'full'}
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
