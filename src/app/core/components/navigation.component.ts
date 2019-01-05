import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {User} from '../../auth/models/user';
import * as Auth from '../../auth/actions/auth';
import {BooksLoad} from '../../books/actions/book';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class='container'>
      <nav class='navbar navbar-expand-lg navbar-dark bg-primary rounded'>
        <div class='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul class='navbar-nav mr-auto'>
            <li class='nav-item active'>
              <a class='nav-link' href='#'>Home <span class='sr-only'>(current)</span></a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='#'>Link</a>
            </li>
            <li class='nav-item dropdown'>
              <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button'
                 data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                Dropdown
              </a>
              <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                <a class='dropdown-item' href='#'>Action</a>
                <a class='dropdown-item' href='#'>Another action</a>
                <div class='dropdown-divider'></div>
                <a class='dropdown-item' href='#'>Something else here</a>
              </div>
            </li>
          </ul>
          <div class='form-inline my-2 my-lg-0' *ngIf='loggedIn'>
            <ul class='navbar-nav mr-auto'>
              <li class='nav-item'>
                <a class='nav-link' style='cursor: pointer;' (click)='logout()'>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  `,
  styleUrls: ['./navigation.component.scss'],

})
export class NavigationComponent implements OnInit {
  @Output() navigate = new EventEmitter();

  @Input()
  loggedIn = false;

  @Input()
  user: User;

  constructor(private store: Store<fromRoot.State>,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.cleanLocalStorage();
    this.store.dispatch(new Auth.Logout());
  }

  home() {
    this.store.dispatch(new BooksLoad());
  }

}
