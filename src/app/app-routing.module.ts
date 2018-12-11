import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
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
