import * as book from '../actions/book';
import { Book } from '../models/book';

export interface State {
  book: Book | null;
  bookDeleted: boolean;
  error: boolean;
}

const initialState: State = {
  book: null,
  bookDeleted: false,
  error: false,
};

export function reducer(state = initialState, action: book.Actions): State {
  switch (action.type) {
    case book.BOOK_DELETE: {
      return {
        book: action.payload,
        bookDeleted: false,
        error: false,
      };
    }

    case book.BOOK_DELETE_OK: {
      return {
        book: null,
        bookDeleted: true,
        error: false,
      };
    }

    case book.BOOK_DELETE_FAILURE: {
      return {
        book: null,
        bookDeleted: false,
        error: true,
      };
    }

    case book.CLEAR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getBookDeletedStatus = (state: State) => state.bookDeleted;

export const getBookStatus = (state: State) => state.book;
