import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from 'ng2-bootstrap-modal';
import * as fromRoot from '../../reducers';
import { Book } from '../../books/models/book';
import { BookAdd, BookEdit } from '../../books/actions/book';
import { BookAddPromptComponent } from '../../books/components/book.add.prompt.component';
import { BookEditPromptComponent } from '../../books/components/book.edit.prompt.component';

@Injectable()
export class ModalService {

  constructor(private store: Store<fromRoot.State>,
              public dialogService: DialogService) {
  }

  openAddBookDialog() {
    this.dialogService.addDialog(BookAddPromptComponent, {}).subscribe((result) => {
      if (result) {
        const fields = result.split('::::');
        const author = fields[0];
        const title = fields[1];

        const book: Book = {
          '_id': '',
          'title': title,
          'author': author
        };

        this.store.dispatch(new BookAdd(book));
      }
    });
  }

  openEditBookDialog() {
    this.dialogService.addDialog(BookEditPromptComponent,
      {}).subscribe((vvv) => {
      if (vvv) {
        const fields = vvv.split('::::');
        const title = fields[0];
        const author = fields[1];
        const bookId = fields[2];

        const book: Book = {
          '_id': bookId,
          'title': title,
          'author': author
        };

        this.store.dispatch(new BookEdit(book));
      }
    });
  }

}
