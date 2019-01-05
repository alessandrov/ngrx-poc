import * as book from '../actions/book';

export interface State {
  bookAdded: boolean;
  error: boolean;
  promptOpen: boolean;
}

const initialState: State = {
  bookAdded: false,
  error: false,
  promptOpen: false,
};

export function reducer(state = initialState, action: book.Actions): State {
  switch (action.type) {
    case book.OPEN_ADD_PROMPT: {
      return {
        bookAdded: false,
        error: false,
        promptOpen: true,
      };
    }

    case book.CLOSE_ADD_PROMPT: {
      return {
        bookAdded: false,
        error: false,
        promptOpen: false,
      };
    }

    case book.BOOK_ADD: {
      return {
        bookAdded: false,
        error: false,
        promptOpen: false,
      };
    }

    case book.BOOK_ADD_OK: {
      return {
        bookAdded: true,
        error: false,
        promptOpen: false,
      };
    }

    case book.BOOK_ADD_FAILURE: {
      return {
        bookAdded: false,
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

export const getBookAddedStatus = (state: State) => state.bookAdded;

export const getAddPromptStatus = (state: State) => state.promptOpen;

export const getErrorStatus = (state: State) => state.error;
