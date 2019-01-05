import * as book from '../actions/book';
import { Book } from '../models/book';

export interface State {
  bookLoaded: Book | null;
  bookUpdated: boolean;
  error: boolean;
  promptOpen: boolean;
}

const initialState: State = {
  bookLoaded: null,
  bookUpdated: false,
  error: false,
  promptOpen: false,
};

export function reducer(state = initialState, action: book.Actions): State {
  switch (action.type) {
    case book.OPEN_EDIT_PROMPT: {
      return {
        bookLoaded: action.payload,
        bookUpdated: false,
        error: false,
        promptOpen: true,
      };
    }

    case book.CLOSE_EDIT_PROMPT: {
      return {
        bookLoaded: null,
        bookUpdated: false,
        error: false,
        promptOpen: false,
      };
    }

    case book.BOOK_EDIT: {
      return {
        bookLoaded: action.payload,
        bookUpdated: false,
        error: false,
        promptOpen: false,
      };
    }

    case book.BOOK_EDIT_OK: {
      return {
        bookLoaded: null,
        bookUpdated: true,
        error: false,
        promptOpen: false,
      };
    }

    case book.BOOK_EDIT_FAILURE: {
      return {
        bookLoaded: null,
        bookUpdated: false,
        error: true,
        promptOpen: false,
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

export const getBookUpdatedStatus = (state: State) => state.bookUpdated;

export const getEditPromptStatus = (state: State) => state.promptOpen;

export const getBookLoaded = (state: State) => state.bookLoaded;
