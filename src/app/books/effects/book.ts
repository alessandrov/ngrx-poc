import {
  BookAddFailure, BookAddOK, BookDeleteFailure, BookDeleteOK, BookEditFailure, BookEditOK, BooksLoaded} from './../actions/book';
import {BookService} from './../../core/services/book.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import * as book from '../actions/book';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {of} from 'rxjs/observable/of';

@Injectable()
export class BookEffects {
  @Effect()
  loadBooks$: Observable<Action> = this.actions$
    .ofType(book.BOOKS_LOAD)
    .switchMap(() =>
      this.bookService
        .getBooks()
        .map(data => new BooksLoaded(data))
    );

  @Effect()
  addBook$: Observable<Action> = this.actions$
    .ofType(book.BOOK_ADD)
    .switchMap(payload =>
      this.bookService
        .addBook(payload)
        .map(() => new BookAddOK())
        .catch(() => of(new BookAddFailure()))
    );

  @Effect()
  editBook$: Observable<Action> = this.actions$
    .ofType(book.BOOK_EDIT)
    .switchMap(payload =>
      this.bookService
        .editBook(payload)
        .map(() => new BookEditOK())
        .catch(() => of(new BookEditFailure()))
    );

  @Effect()
  deleteBook$: Observable<Action> = this.actions$
    .ofType(book.BOOK_DELETE)
    .switchMap(payload =>
      this.bookService
        .deleteBook(payload)
        .map(() => new BookDeleteOK())
        .catch(() => of(new BookDeleteFailure()))
    );

  constructor(private bookService: BookService,
              private actions$: Actions) {
  }
}
