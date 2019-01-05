import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authenticate } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bc-login-form',
  template: `
    <div class="container" >
      <div class="row">
        <form [formGroup]="loginForm" (ngSubmit)="submit()" >
          <div class="center-form is-responsive">
            <div class="col-sm-12 col-md-10 col-md-offset-1">
              <div class="form-group input-group">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input autofocus class="form-control" type="text" name='username'
                       formControlName="username" placeholder="username"/>
              </div>
              <div class="form-group input-group">
                <span class="input-group-addon"><i class="fa fa-key"></i></span>
                <input class="form-control" type="password" name='password' formControlName="password"
                       placeholder="password"/>
              </div>
              <div class="form-group input-group">
                <button class="btn btn-success" type="submit" [disabled]="!loginForm.valid">Login</button>
              </div>
              <div class="loginError" *ngIf="errorMessage">
                {{ (errorMessage) }}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginFormComponent implements OnInit {

  errorMessage: string | null;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  @Input()
  set error(errorResponse: HttpErrorResponse) {
    if (errorResponse) {
      if (errorResponse.status === 403) {
        this.errorMessage = 'Invalid credentials';
      } else {
        this.errorMessage = 'Error while authenticating';
      }
    }
  }

  @Output() submitted = new EventEmitter<Authenticate>();

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)
    ]),
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.loginForm.valid) {
      this.submitted.emit(this.loginForm.value);
    }
  }

}
