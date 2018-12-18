import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {getUserState, UserState} from '@xtream/firebase-ngrx-user-management';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../projects/xtream/firebase-ngrx-user-management/src/lib/reducers/user.reducer';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {
  auth$: Observable<UserState>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.auth$ = this.store.pipe(select(getUserState));
  }

}
