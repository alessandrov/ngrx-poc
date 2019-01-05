import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers/index';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuth.getLoggedIn)
      .map(loggedIn => {
        if (!loggedIn) {
          this.store.dispatch(new Auth.LoginFailure(null));
          return false;
        }
        return true;
      })
      .take(1);
  }

}
