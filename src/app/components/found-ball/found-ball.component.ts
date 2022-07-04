import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { FoundBallService } from 'src/app/shared/found-ball.service';
import { LoginComponent } from '../dialogs/login/login.component';

@Component({
  selector: 'app-found-ball',
  templateUrl: './found-ball.component.html',
  styleUrls: ['./found-ball.component.css']
})
export class FoundBallComponent implements OnInit {

  ballId: string
  apiLoaded: Observable<boolean>;

  @ViewChild('search', {static: false})
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    // maxZoom:this.maxZoom,
    // minZoom:this.minZoom,
  };
  latitude!: any;
  longitude!: any;  
  showMap: boolean;
  place: any;
  showSaveButton = false;
  userDetails: any;

  foundBallform = new FormGroup({
    emailControl: new FormControl('', [
      Validators.required,
    ])
  })  

  constructor(private actRoute: ActivatedRoute, private router: Router, private authService: AuthService, 
    private dialog: MatDialog, private httpClient: HttpClient, 
    private ngZone: NgZone, private foundBallService: FoundBallService) { 
    this.ballId = this.actRoute.snapshot.paramMap.get('id').toLowerCase();
    switch(this.ballId) {
      case 'todd':
      case 'leanne':
      case 'jer':
      case 'kierst':
        break;
      default:
        this.router.navigate(['home']);
        break;
    }

    this.authService.currentUserDetails.subscribe(user => {
      if (user) this.userDetails = user;
    })
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });    
  }

  setupSearch() {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    autocomplete.setComponentRestrictions({
      country: ["ca"],
    });    

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.place = place;
        this.showSaveButton = true;

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
        this.map.googleMap.setZoom(17);
      });
    });    
  }

  saveLocation() {
    this.foundBallService.foundBall(this.place, this.ballId);   
    this.showMap = false; 
  }

  cancelLocation() {
    this.showSaveButton = false;
    this.showMap = false;
  }

  showMapsForm() {
    if (this.userDetails) {
      this.apiLoaded = this.httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=AIzaSyAIyMUwrJ0biRFlpvmnUxxPkIQnBCEEinI&libraries=places", 'callback').pipe(
        map(() => true),
        catchError(() => of(false)),
      );
      setTimeout(() => {
        this.showMap = true;
        if (this.apiLoaded) this.setupSearch()  
      }, 1000);
    } else {
      this.showLogin();
    }
    
  }

  showLogin() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = false
    this.dialog.open(LoginComponent, dialogConfig)
  }

}
