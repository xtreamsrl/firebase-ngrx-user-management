import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Credentials} from '@xtream/firebase-ngrx-user-management';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  @Output() googleLogin = new EventEmitter();
  @Output() facebookLogin = new EventEmitter();
  @Output() loginWithCredentials = new EventEmitter<Credentials>();

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(true)
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.loginWithCredentials.emit(this.loginForm.getRawValue());
  }

}
