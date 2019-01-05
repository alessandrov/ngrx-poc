import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search';
import * as fromAdd from './add';
import * as fromUpdate from './update';
import * as fromDelete from './delete';
import * as fromRoot from '../../reducers';

export interface BooksState {
  search: fromSearch.State;
  add: fromAdd.State;
  update: fromUpdate.State;
  delete: fromDelete.State;
}

export interface State extends fromRoot.State {
  book: BooksState;
}

export const reducers = {
  search: fromSearch.reducer,
  add: fromAdd.reducer,
  update: fromUpdate.reducer,
  delete: fromDelete.reducer,
};

export const selectBooksState = createFeatureSelector<BooksState>('search');

export const selectBooksStateSearch = createSelector(
  selectBooksState, // 1
  (state: BooksState) => state.search
);

export const selectBooksStateAdd = createSelector(
  selectBooksState, // 1
  (state: BooksState) => state.add
);

export const selectBooksStateUpdate = createSelector(
  selectBooksState, // 1
  (state: BooksState) => state.update
);

export const selectBooksStateDelete = createSelector(
  selectBooksState, // 1
  (state: BooksState) => state.delete
);

export const selectBooksStateSearchBooks = createSelector(
  selectBooksStateSearch,
  fromSearch.getBooks
);

export const selectBooksStateAddedStatus = createSelector(
  selectBooksStateAdd,
  fromAdd.getBookAddedStatus
);

export const selectBooksStateAddPromptStatus = createSelector(
  selectBooksStateAdd,
  fromAdd.getAddPromptStatus
);

export const selectBooksStateUpdatePromptStatus = createSelector(
  selectBooksStateUpdate,
  fromUpdate.getEditPromptStatus
);

export const selectBooksStateErrorStatus = createSelector(
  selectBooksStateAdd,
  fromAdd.getErrorStatus
);

export const selectBooksStateUpdatedStatus = createSelector(
  selectBooksStateUpdate,
  fromUpdate.getBookUpdatedStatus
);

export const selectBooksStateBookLoadedStatus = createSelector(
  selectBooksStateUpdate,
  fromUpdate.getBookLoaded
);

export const selectBooksStateBookDeletedStatus = createSelector(
  selectBooksStateDelete,
  fromDelete.getBookDeletedStatus
);

