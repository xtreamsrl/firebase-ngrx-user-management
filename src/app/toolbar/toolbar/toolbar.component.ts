import {Component, Input, OnInit} from '@angular/core';
import {UserState} from '../../../../projects/xtream/firebase-ngrx-user-management/src/public_api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() auth: UserState;

  constructor() {
  }

  ngOnInit() {
  }

}
