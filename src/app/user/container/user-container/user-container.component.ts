import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {getUserState, UserState} from '@xtream/firebase-ngrx-user-management';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../projects/xtream/firebase-ngrx-user-management/src/lib/reducers/user.reducer';
import {AuthActions} from '@xtream/firebase-ngrx-user-management';
import {Actions} from '@ngrx/effects';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {
  auth$: Observable<UserState>;

  constructor(private store: Store<State>, private router: Router) {
  }

  ngOnInit(): void {
    this.auth$ = this.store.pipe(select(getUserState));
  }

  sendVerificationEmail(): void {
    this.store.dispatch(new AuthActions.SendVerificationEmail({redirectUrl: '/'}));
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/login']);
  }

}
