import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getUserState, UserState} from '../../../../projects/xtream/firebase-ngrx-user-management/src/public_api';
import {State} from '../../core/reducers';

@Component({
  selector: 'app-toolbar-container',
  templateUrl: './toolbar-container.component.html',
  styleUrls: ['./toolbar-container.component.css']
})
export class ToolbarContainerComponent implements OnInit {
  auth$: Observable<UserState>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.auth$ = this.store.pipe(select(getUserState));
  }

}
