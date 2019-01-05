import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import * as Auth from '../actions/auth';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .map(user => new Auth.LoginSuccess({user}))
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect()
  loginFailure$ = this.actions$
    .ofType(Auth.LOGIN_FAILURE)
    .map((action: Auth.LoginFailure) => action.payload)
    .exhaustMap(auth =>
      this.checkToken(auth)
    );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/books']));

  @Effect({dispatch: false})
  logout$ = this.actions$
    .ofType(Auth.LOGOUT)
    .do(() => this.router.navigate(['/books']));

  @Effect({dispatch: false})
  resetStore$ = this.actions$
    .ofType(Auth.LOGOUT)
    .do(() => {
      this.authService.resetStore();
    });

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(() => {
      this.router.navigate(['/login']);
    });

  checkToken(auth) {
    /*const username = localStorage.getItem('user');
    const refreshToken = localStorage.getItem('refresh-token-' + username);*/
    const refreshToken = localStorage.getItem('refresh-token');
    console.log('***************** refreshToken ' + refreshToken);

    return this.authService
      .refreshToken(refreshToken)
      .map(user => new Auth.LoginSuccess({user}))
      .catch(() => of(new Auth.LoginRedirect()));
  }

  constructor(private authService: AuthService,
              private actions$: Actions,
              private router: Router) {
  }

}
