import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CloseAddPrompt, CloseEditPrompt} from '../actions/book';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import * as fromBooks from '../../books/reducers';

export interface PromptModel {
  bookTitle: string;
  bookAuthor: string;
}

@Component({
  // selector: 'app-prompt8',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="modal-dialog">
    <form [formGroup]="bookEditForm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">BOOK DETAILS</h4>
        </div>
        <div class="modal-body">
          <label>Title</label>
          <input type="text" class="form-control" formControlName="bookTitle" name="bookTitle"
                 (keyup.enter)="apply()">
          <br>
          <label>Author</label>
          <input type="text" class="form-control" formControlName="bookAuthor" name="bookAuthor"
                 (keyup.enter)="apply()">
          <br>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" (click)="apply()" [disabled]="!(bookEditForm.valid)">
            OK
          </button>
          <button type="button" class="btn btn-default" (click)="closePrompt()">Cancel</button>
        </div>
      </div>
    </form>
  </div>
  `
  // templateUrl: './books.edit.prompt.component.html'
})
export class BookEditPromptComponent extends DialogComponent<PromptModel, string>
  implements PromptModel, OnInit {

  bookEditForm: FormGroup;
  bookTitle: string;
  bookAuthor: string;
  bookId: string;
  loadedBook$ = this.store.select(fromBooks.selectBooksStateBookLoadedStatus);
  loadedBook;

  constructor(private store: Store<fromRoot.State>,
              public dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.bookEditForm = new FormGroup({
      bookTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(70)
      ]),
      bookAuthor: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(70)
      ])
    });
    this.loadedBook = this.loadedBook$.subscribe(
      (result) => {
        if (result) {
          this.bookEditForm.controls['bookTitle'].setValue(result.title);
          this.bookEditForm.controls['bookAuthor'].setValue(result.author);
          this.bookId = result._id;
        }
      }
    );
  }

  apply() {
    this.result = this.bookEditForm.value.bookTitle + '::::' + this.bookEditForm.value.bookAuthor
      + '::::' + this.bookId ;
    this.close();
    this.store.dispatch(new CloseEditPrompt());

  }

  closePrompt() {
    this.close();
    this.store.dispatch(new CloseEditPrompt());
  }

}
