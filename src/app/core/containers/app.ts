import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import {User} from '../../auth/models/user';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout>
      <app-navigation
        [loggedIn]="loggedIn$ | async"
        [user]="user$ | async">
      </app-navigation>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class AppComponent {
  loggedIn$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
    this.user$ = this.store.select(fromAuth.getUser);
  }

}
/*<app-layout>
      <app-navigation
        [loggedIn]="loggedIn$ | async"
        [user]="user$ | async">
      </app-navigation>
      <router-outlet></router-outlet>
    </app-layout>*/
