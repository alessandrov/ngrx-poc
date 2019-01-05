import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from './auth';
import * as fromLoginPage from './login-page';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
};

// 1
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// 2
export const selectAuthStatusState = createSelector(
  selectAuthState, // 1
  (state: AuthState) => state.status
);

// 3
export const getLoggedIn = createSelector(
  selectAuthStatusState, // 2
  fromAuth.getLoggedIn
);

// 4
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

// 5
export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

// 6
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

// 7
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
