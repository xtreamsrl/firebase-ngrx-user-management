import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() googleLogin = new EventEmitter();
  @Output() facebookLogin = new EventEmitter();

  public loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(true)
    });
  }

  ngOnInit() {
  }

  public toggleRememberMe(): void {
    this.loginForm.controls['rememberMe'].setValue(!this.loginForm.controls['rememberMe'].patchValue);
  }

}
