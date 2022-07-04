import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWineComponent } from './components/add-wine/add-wine.component';
import { EditWineComponent } from './components/edit-wine/edit-wine.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoundBallComponent } from './components/found-ball/found-ball.component';
import { LottieModule } from 'ngx-lottie';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/dialogs/login/login.component';
import { GoogleMapsModule } from '@angular/google-maps';


export function playerFactory(): any {
  return import('lottie-web')
}


@NgModule({
  declarations: [
    AppComponent,
    AddWineComponent,
    EditWineComponent,
    WineListComponent,
    FoundBallComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({player: playerFactory})
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
