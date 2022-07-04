import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})

export class AuthService {

    private currentUserDetailsSource = new BehaviorSubject<any>(null);
    public currentUserDetails = this.currentUserDetailsSource.asObservable();
    userDetails: any;
    isAdminUser: any;
    adminRef: AngularFireObject<any>;
        
    constructor (private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
        this.firebaseAuth.authState.subscribe(async currentUser => {
            this.userDetails = currentUser
            if (currentUser) {
                this.isAdmin(currentUser.uid);
                this.currentUserDetailsSource.next(this.userDetails);
            }
            
        })
    }

    isAdmin(id: string) {
        this.adminRef = this.db.object('adminUsers/' + id);
        this.isAdminUser = this.adminRef.snapshotChanges();
        this.isAdminUser.subscribe(action => {
            this.userDetails.isAdmin = action.payload.val() || false;
            this.currentUserDetailsSource.next(this.userDetails);
        });
    }

    public async signInWithEmail(email: string, password: string) {
        const userCredential = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
        return userCredential;
      }    

    public async createAccountWithEmail(email: string, password: string) {
        const userCredential = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
        if (userCredential) {
        await (await this.firebaseAuth.currentUser).sendEmailVerification();
        }
        return userCredential;    
    }

    public async resetPassword(email: string) {
        await this.firebaseAuth.sendPasswordResetEmail(email);
    }    

    public async signOut() {
        await this.firebaseAuth.signOut();
    }

}