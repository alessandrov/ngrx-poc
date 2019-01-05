import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { BookEffects } from './book';
import {Observable} from 'rxjs/Observable';
import {BooksLoad, BooksLoaded} from '../actions/book';

describe('Book Effects first attempt', () => {
  let effects: BookEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions),
        // other providers
      ],
    });

    effects = TestBed.get(BookEffects);
  });

  it('should work', () => {
    actions = hot('--a-', { a: BooksLoad });

    const expected = cold('--b', { b: BooksLoaded});

    expect(effects.loadBooks$).toBeObservable(expected);
  });

  /*it('should work also', () => {
    actions = new ReplaySubject(1);

    actions.next(SomeAction);

    effects.someSource$.subscribe(result => {
      expect(result).toBe(AnotherAction);
    });
  });*/
});
