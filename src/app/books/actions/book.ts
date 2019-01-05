import {Book} from '../models/book';
import {Action} from '@ngrx/store';

export const OPEN_ADD_PROMPT = '[Book] Open Add Prompt';
export const CLOSE_ADD_PROMPT = '[Book] Close Add Prompt';

export const OPEN_EDIT_PROMPT = '[Book] Open Edit Prompt';
export const CLOSE_EDIT_PROMPT = '[Book] Close Edit Prompt';

export const BOOK_ADD = '[Book] Add Book';
export const BOOK_ADD_OK = '[Book] Book Added OK';
export const BOOK_ADD_FAILURE = '[Book] Error Adding Book';

export const BOOK_EDIT = '[Book] Edit Book';
export const BOOK_EDIT_OK = '[Book] Book Edited OK';
export const BOOK_EDIT_FAILURE = '[Book] Error Editing Book';

export const BOOK_DELETE = '[Book] Delete Book';
export const BOOK_DELETE_OK = '[Book] Book Deleted OK';
export const BOOK_DELETE_FAILURE = '[Book] Error Deleting Book';

export const BOOKS_LOAD = '[Book] LoadAll';
export const BOOKS_LOADED = '[Book] LoadedAll';
export const BOOKS_LOAD_ERROR = '[Book] Load Error';

export const CLEAR = '[Book] Clear';

export class Clear implements Action {
  readonly type = CLEAR;

  constructor() {
  }
}

export class OpenAddPrompt implements Action {
  readonly type = OPEN_ADD_PROMPT;

  constructor() {
  }
}

export class CloseAddPrompt implements Action {
  readonly type = CLOSE_ADD_PROMPT;

  constructor() {
    console.log('ClosePromptClosePromptClosePromptClosePromptClosePrompt');
  }
}

export class OpenEditPrompt implements Action {
  readonly type = OPEN_EDIT_PROMPT;

  constructor(public payload: Book) {
  }
}

export class CloseEditPrompt implements Action {
  readonly type = CLOSE_EDIT_PROMPT;

  constructor() {
  }
}

export class BookAdd implements Action {
  readonly type = BOOK_ADD;

  constructor(public payload: Book) {
  }
}

export class BookAddOK implements Action {
  readonly type = BOOK_ADD_OK;

  constructor() {
  }
}

export class BookAddFailure implements Action {
  readonly type = BOOK_ADD_FAILURE;

  constructor() {
  }
}

export class BookEdit implements Action {
  readonly type = BOOK_EDIT;

  constructor(public payload: Book) {
  }
}

export class BookEditOK implements Action {
  readonly type = BOOK_EDIT_OK;

  constructor() {
  }
}

export class BookEditFailure implements Action {
  readonly type = BOOK_EDIT_FAILURE;

  constructor() {
  }
}

export class BookDelete implements Action {
  readonly type = BOOK_DELETE;

  constructor(public payload: Book) {
  }
}

export class BookDeleteOK implements Action {
  readonly type = BOOK_DELETE_OK;

  constructor() {
  }
}

export class BookDeleteFailure implements Action {
  readonly type = BOOK_DELETE_FAILURE;

  constructor() {
  }
}

export class BooksLoad implements Action {
  readonly type = BOOKS_LOAD;

  constructor() {
  }
}

export class BooksLoaded implements Action {
  readonly type = BOOKS_LOADED;

  constructor(public payload: Book[]) {
  }
}

export class BooksLoadError implements Action {
  readonly type = BOOKS_LOAD_ERROR;

  constructor(public payload: Book[]) {
  }
}

export type Actions = BooksLoad | BooksLoaded | BooksLoadError |
  BookAddOK | BookAdd | BookAddFailure | BookEditOK | BookEdit |
  BookEditFailure | OpenAddPrompt | CloseAddPrompt | OpenEditPrompt | CloseEditPrompt
  | BookDeleteOK | BookDelete | BookDeleteFailure | Clear;

