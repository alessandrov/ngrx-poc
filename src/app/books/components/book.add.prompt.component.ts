import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CloseAddPrompt} from '../actions/book';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';

export interface PromptModel {
  bookTitle: string;
  bookAuthor: string;
}

@Component({
  selector: 'app-prompt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="modal-dialog">
      <form [formGroup]="bookAddForm">
        <div class="modal-content">
          <div class="modal-header">
            <!--button type="button" class="close" (click)="close()">&times;</button-->
            <h4 class="modal-title">BOOK DETAILS</h4>
          </div>
          <div class="modal-body">
            <label>Title</label>
            <input type="text" class="form-control" formControlName="bookTitle" name="bookTitle">
            <br>
            <label>Author</label>
            <input type="text" class="form-control" formControlName="bookAuthor" name="bookAuthor">
            <br>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="apply()" [disabled]="!(bookAddForm.valid)">
              OK
            </button>
            <button type="button" class="btn btn-default" (click)="closePrompt()">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class BookAddPromptComponent extends DialogComponent<PromptModel, string> implements PromptModel, OnInit {

  bookAddForm: FormGroup;
  bookTitle: string;
  bookAuthor: string;

  constructor(private store: Store<fromRoot.State>,
              public dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.bookAddForm = new FormGroup({
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
    this.bookAddForm.controls['bookTitle'].setValue(this.bookTitle);
    this.bookAddForm.controls['bookAuthor'].setValue(this.bookAuthor);
  }

  apply() {
    this.result = this.bookAddForm.value.bookAuthor + '::::' + this.bookAddForm.value.bookTitle;
    this.close();
    this.store.dispatch(new CloseAddPrompt());
  }

  closePrompt() {
    this.close();
    this.store.dispatch(new CloseAddPrompt());
  }
}
