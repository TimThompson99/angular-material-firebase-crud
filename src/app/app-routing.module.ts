import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWineComponent } from './components/add-wine/add-wine.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { EditWineComponent } from './components/edit-wine/edit-wine.component';
import { FoundBallComponent } from './components/found-ball/found-ball.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'found', component: FoundBallComponent },
  { path: 'found/:id', component: FoundBallComponent },
  { path: 'add-wine', component: AddWineComponent },
  { path: 'edit-wine/:id', component: EditWineComponent },
  { path: 'wine-list', component: WineListComponent },
  { path: 'home', component: HomeComponent},
  { path: '**', redirectTo: 'home' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
