import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found.component';
import { AuthGuard } from './auth/guards/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full'},
  {
    path: 'books',
    loadChildren: './books/books.module#BooksModule',
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent }
];
