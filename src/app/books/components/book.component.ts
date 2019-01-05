import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {BookDelete, BooksLoad, OpenAddPrompt, OpenEditPrompt} from './../actions/book';
import {Store} from '@ngrx/store';
import * as fromBooks from './../reducers/';
import * as fromRoot from '../../reducers';
import {ModalService} from '../../core/services/modal.service';

@Component({
  // selector: 'app-books',
  template: `<div class="container">
    <div class="card">
      <div class="card-block">
        <div class="row" [ngStyle]="{'cursor' : 'pointer'}">
          <div class="col-md-12" align="right">
            <a [ngStyle]="colorArray[0]"
               (click)="setPageSize(5)">5</a>&nbsp;&nbsp;
            <a [ngStyle]="colorArray[1]"
               (click)="setPageSize(10)">10</a>&nbsp;&nbsp;
            <a [ngStyle]="colorArray[2]"
               (click)="setPageSize(20)">20</a>&nbsp;&nbsp;
          </div>
        </div>
        <table class="table table-bordered table-striped">
          <thead class="thead-default">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let book of (books$ | async) | paginate: { itemsPerPage: pageSize, currentPage: page };
               let rowNumber = index">
            <td>{{rowNumber + 1  + ((page - 1) * pageSize)}}</td>
            <td>{{book.title | truncate: 25}}</td>
            <td>{{book.author | truncate: 25}}</td>
            <td>
              <button class="btn btn-sm btn-warning" (click)="edit(book)"><i class="fa fa-pencil"></i> Edit
              </button>
              <button class="btn btn-sm btn-danger" (click)="delete(book)"><i class="fa fa-trash"></i> Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
        <pagination-controls *ngIf="(books$ | async)" (pageChange)="page = $event"
                             previousLabel="Previous"
                             nextLabel="Next">
        </pagination-controls>

        <table class="table">
          <tbody>
          <tr>
            <td>
              <button class="btn btn-sm btn-primary" (click)="addBook()"><i class="fa">ADD BOOK</i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`,
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit, OnDestroy {

  colorArray = [];
  boldConfig = {'color': '#362F20', 'font-weight': 'bold'};
  normalConfig = {'color': '#212529', 'font-weight': 'normal'};

  books$ = this.store.select(fromBooks.selectBooksStateSearchBooks);

  wasBookAdded$ = this.store.select(fromBooks.selectBooksStateAddedStatus);
  wasBookUpdated$ = this.store.select(fromBooks.selectBooksStateUpdatedStatus);
  wasBookDeleted$ = this.store.select(fromBooks.selectBooksStateBookDeletedStatus);

  shouldAddPromptBeLaunched$ = this.store.select(fromBooks.selectBooksStateAddPromptStatus);
  shouldEditPromptBeLaunched$ = this.store.select(fromBooks.selectBooksStateUpdatePromptStatus);

  hasAnErrorOccured$ = this.store.select(fromBooks.selectBooksStateErrorStatus);

  pageSize = 5;
  page = 1;

  wasBookAddedSubscription;
  wasBookUpdatedSubscription;
  wasBookDeletedSubscription;
  shouldAddPromptBeLaunchedSubscription;
  shouldEditPromptBeLaunchedSubscription;
  hasAnErrorOccurredSubscription;

  constructor(private store: Store<fromRoot.State>,
              private toastrService: ToastrService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.initStyles();

    this.hasAnErrorOccurredSubscription = this.hasAnErrorOccured$.subscribe(
      (result) => {
        if (result) {
          this.anErrorOccurred();
        }
      }
    );

    this.wasBookAddedSubscription = this.wasBookAdded$.subscribe(
      (result) => {
        if (result) {
          this.bookWasAdded();
        }
      }
    );

    this.wasBookUpdatedSubscription = this.wasBookUpdated$.subscribe(
      (result) => {
        if (result) {
          this.bookWasUpdated();
        }
      }
    );

    this.wasBookDeletedSubscription = this.wasBookDeleted$.subscribe(
      (result) => {
        if (result) {
          this.bookWasDeleted();
        }
      }
    );

    this.shouldAddPromptBeLaunchedSubscription = this.shouldAddPromptBeLaunched$.subscribe(
      (result) => {
        if (result) {
          this.launchAddPrompt();
        }
      }
    );

    this.shouldEditPromptBeLaunchedSubscription = this.shouldEditPromptBeLaunched$.subscribe(
      (result) => {
        if (result === true) {
          this.launchEditPrompt();
        }
      }
    );

    this.store.dispatch(new BooksLoad());
  }

  launchEditPrompt() {
    this.modalService.openEditBookDialog();
  }

  launchAddPrompt() {
    this.modalService.openAddBookDialog();
  }

  addBook() {
    this.store.dispatch(new OpenAddPrompt());
  }

  edit(book) {
    this.store.dispatch(new OpenEditPrompt(book));
  }

  anErrorOccurred() {
    this.toastrService.error('An error occurred while saving!',
      '',
      {timeOut: 3000});
  }

  bookWasAdded() {
    this.toastrService.success('Successfully added!',
      '',
      {timeOut: 2000});
    this.store.dispatch(new BooksLoad());
  }

  bookWasUpdated() {
    this.toastrService.success('Successfully updated!',
      '',
      {timeOut: 2000});

    this.store.dispatch(new BooksLoad());
  }

  bookWasDeleted() {
    this.toastrService.success('Successfully deleted!',
      '',
      {timeOut: 2000});

    this.store.dispatch(new BooksLoad());
  }

  delete(book) {
    if (window.confirm('Are you sure you want to delete this Book?')) {
      this.store.dispatch(new BookDelete(book));
    }
  }

  ngOnDestroy() {
    this.hasAnErrorOccurredSubscription.unsubscribe();
    this.shouldAddPromptBeLaunchedSubscription.unsubscribe();
    this.shouldEditPromptBeLaunchedSubscription.unsubscribe();
    this.wasBookAddedSubscription.unsubscribe();
    this.wasBookDeletedSubscription.unsubscribe();
    this.wasBookUpdatedSubscription.unsubscribe();
  }

  initStyles() {
    if (this.pageSize === 5) {
      this.colorArray[0] = this.boldConfig;
      this.colorArray[1] = this.normalConfig;
      this.colorArray[2] = this.normalConfig;
    } else if (this.pageSize === 10) {
      this.colorArray[0] = this.normalConfig;
      this.colorArray[1] = this.boldConfig;
      this.colorArray[2] = this.normalConfig;
    } else if (this.pageSize === 20) {
      this.colorArray[0] = this.normalConfig;
      this.colorArray[1] = this.normalConfig;
      this.colorArray[2] = this.boldConfig;
    }
  }

  setPageSize(value) {
    this.pageSize = value;
    this.initStyles();
  }

}
