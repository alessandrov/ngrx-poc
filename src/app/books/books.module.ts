import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {BootstrapModalModule, DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TruncateModule } from 'ng2-truncate';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogHolderComponent } from 'ng2-bootstrap-modal/dist/dialog-holder.component';
import { DialogWrapperComponent } from 'ng2-bootstrap-modal/dist/dialog-wrapper.component';

import { reducers } from './reducers';
import { BookEffects } from './effects/book';
import { BookComponent} from './components/book.component';
import { BookService } from '../core/services/book.service';
import { ModalService } from '../core/services/modal.service';
import { BookAddPromptComponent } from './components/book.add.prompt.component';
import { BookEditPromptComponent } from './components/book.edit.prompt.component';

@NgModule({
  imports: [
    BootstrapModalModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: BookComponent },
    ]),
    TruncateModule,
    EffectsModule.forFeature([BookEffects]),
    StoreModule.forFeature('search', reducers),
  ],
  declarations: [
    BookComponent, BookAddPromptComponent, BookEditPromptComponent
  ],
  entryComponents: [
    BookAddPromptComponent, BookEditPromptComponent, DialogHolderComponent, DialogWrapperComponent
  ],
  providers: [BookService, DialogService, ModalService, ToastrService],
})

export class BooksModule {}

/*export class BooksModule {
  static forRoot() {
    return {
      ngModule: BooksModule,
      providers: [BookService, ModalService, DialogService, ToastrService],
    };
  }
}*/
