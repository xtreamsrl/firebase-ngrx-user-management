import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Credentials} from '../../../../../projects/xtream/firebase-ngrx-user-management/src/public_api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  @Input() error: string;
  @Input() success: boolean;
  @Output() googleLogin = new EventEmitter();
  @Output() facebookLogin = new EventEmitter();
  @Output() loginWithCredentials = new EventEmitter<Credentials>();

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(true)
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.error = null;
    this.loginWithCredentials.emit(this.loginForm.getRawValue());
  }
}
