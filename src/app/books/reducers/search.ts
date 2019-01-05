import * as book from '../actions/book';
import { Book } from '../models/book';

export interface State {
  books: Book[];
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  books: [],
  loading: false,
  error: false,
};

export function reducer(state = initialState, action: book.Actions): State {
  switch (action.type) {
    case book.BOOKS_LOAD: {
        return {
          books: [],
          loading: false,
          error: false,
        };
    }

    case book.BOOKS_LOADED: {
      return {
        books: action.payload,
        loading: false,
        error: false,
      };
    }

    case book.BOOKS_LOAD_ERROR: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }

    case book.CLEAR: {
      /*return {
        ...state,
        loading: false,
        error: false,
      };*/
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoadingStatus = (state: State) => state.loading;

export const getErrorStatus = (state: State) => state.error;

export const getBooks = (state: State) => state.books;
