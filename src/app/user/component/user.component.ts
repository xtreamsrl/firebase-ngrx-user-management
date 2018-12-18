import {Component, Input, OnInit} from '@angular/core';
import {UserState} from '../../../../projects/xtream/firebase-ngrx-user-management/src/public_api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() auth: UserState;

  constructor() { }

  ngOnInit() {
  }

}
