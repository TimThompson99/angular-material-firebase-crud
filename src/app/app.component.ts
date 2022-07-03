import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  opened = false;
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  constructor() {}

  ngOnInit() {

  }

}
