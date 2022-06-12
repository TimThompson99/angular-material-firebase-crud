import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { FoundBallComponent } from './components/found-ball/found-ball.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'found' },
  { path: 'found', component: FoundBallComponent },
  { path: 'found/:id', component: FoundBallComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'books-list', component: BookListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
