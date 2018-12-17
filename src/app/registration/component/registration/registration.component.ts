import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Credentials} from '@xtream/firebase-ngrx-user-management';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  @Input() error: string;
  @Output() googleLogin = new EventEmitter();
  @Output() facebookLogin = new EventEmitter();
  @Output() signUpWithCredentials = new EventEmitter<Credentials>();

  constructor() {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, this.passwordConfirming.bind(this));
  }

  ngOnInit(): void {
  }

  passwordConfirming(frm: FormGroup): any {
    if (frm.get('password').value !== frm.get('confirmPassword').value) {
      this.registrationForm.controls['confirmPassword'].setErrors({passwordsMismatch: true});
      return {passwordsMismatch: true};
    }
    return null;
  }

  public signUp(): void {
    this.error = null;
    this.signUpWithCredentials.emit({
        email: this.registrationForm.controls['email'].value,
        password: this.registrationForm.controls['password'].value
      }
    );
  }

}
