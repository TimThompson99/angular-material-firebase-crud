import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})

export class FoundBallService {

    private currentUserDetailsSource = new BehaviorSubject<any>(null);
    public currentUserDetails = this.currentUserDetailsSource.asObservable();
    userDetails: any;
    locationsRef: AngularFireList<any>;
    locationRef: AngularFireObject<any>;
    foundBallsRef: AngularFireList<any>;
    foundBallRef: AngularFireObject<any>;
        
    constructor (private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
        this.firebaseAuth.authState.subscribe(async currentUser => {
            this.userDetails = currentUser
        })
        this.locationsRef = this.db.list('saved-places');
        this.locationRef = this.db.object('places/')
        this.foundBallsRef = this.db.list('found-balls');
    }

    checkPlace(place) {
        this.locationRef = this.db.object('saved-places/' + place.place_id)
        const data = this.locationRef.valueChanges()
        .subscribe(async (data) => {
          if (data) {
            return true
          } else {
            this.addPlace(place);
            return true;
          }
        });        
    }

    foundBall(place, userId) {
        this.checkPlace(place)
        this.foundBallsRef = this.db.list('found-balls/'+ userId);
        this.foundBallsRef
        .push({
            foundBy: this.userDetails.uid || 'anonymous',
            foundOn: Date.now(),
            foundAt: place.name,
            placeId: place.place_id
        })    
        .catch((error) => {
          this.errorMgmt(error);
        });
    }

    addPlace(place) {
        const data = {
            formatted_address: place.formatted_address,
            formatted_phone_number: place.formatted_phone_number,
            name: place.name,
            rating: place.rating,
            mapUrl: place.url,
            website: place.website
        }
        this.locationRef.update(data)
        .catch((error) => {
            this.errorMgmt(error);
        })
    }

    getLocations() {

    }

  // Error management
  private errorMgmt(error) {
    console.log(error);
  }    
}