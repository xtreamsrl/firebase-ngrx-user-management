import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthActions} from '@xtream/firebase-ngrx-user-management';
import {AuthState} from '../../projects/xtream/firebase-ngrx-user-management/src/lib/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-ngrx-user-management-example';

  constructor(private store: Store<AuthState>) {
    this.store.dispatch(new AuthActions.GetUser());
  }
}
