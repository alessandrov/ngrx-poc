import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './containers/app';
import { BookService } from './services/book.service';
import { NavigationComponent } from './components/navigation.component';
import { NotFoundComponent } from './components/not-found.component';
import { LayoutComponent } from './components/layout';

export const COMPONENTS = [
  AppComponent,
  LayoutComponent,
  NavigationComponent,
  NotFoundComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [BookService],
    };
  }
}
