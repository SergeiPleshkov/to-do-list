import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  userId: any;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userId = user.uid;

        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  fetchUserInfo() {
    return new Promise(resolve => {
      this.user.subscribe(user => {
        if (user) {
          this.userDetails = user;
          this.userId = user.uid;
        } else {
          this.userDetails = null;
        }
        resolve(user);
      });
    });
  }


  logout() {
    this.userDetails = null;
    this.userId = null;
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['login']));
  }
}