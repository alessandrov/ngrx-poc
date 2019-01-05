import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as fromRoot from '../../reducers';
import { environment } from '../../../environments/environment';
import { User, Authenticate } from '../models/user';
import { Clear } from '../../books/actions/book';

@Injectable()
export class AuthService {
  private API_PATH = environment.authUrl;

  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private store: Store<fromRoot.State>,
              private http: HttpClient) {
  }

  login({username, password}: Authenticate): Observable<User> {
    const clientId = environment.client_id;
    const clientSecret = environment.client_secret;

    const userData = 'grant_type=password&client_id=' + clientId +
                     '&client_secret=' + clientSecret +
                     '&username=' + username +
                     '&password=' + password;

    return this.http.post<User>(this.API_PATH, userData, {headers: this.headers});
  }

  refreshToken(refreshToken: string): Observable<User> {
    const clientId = environment.client_id;
    const clientSecret = environment.client_secret;

    const userData = 'grant_type=refresh_token&client_id=' + clientId +
                     '&client_secret=' + clientSecret +
                     '&refresh_token=' + refreshToken;

    return this.http.post<User>(this.API_PATH, userData, {headers: this.headers});
  }

  cleanLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
  }

  resetStore() {
    this.store.dispatch(new Clear());
  }

}
