import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBookComponent } from './components/add-book/add-book.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { FoundBallComponent } from './components/found-ball/found-ball.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'found', component: FoundBallComponent },
  { path: 'found/:id', component: FoundBallComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'wine-list', component: WineListComponent },
  { path: 'home', component: HomeComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
