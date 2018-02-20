import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };
  auth: any;

  constructor(authService: AuthService, private router: Router) {
    this.auth = authService;
  }

    signInWithGoogle() {
      this.auth.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['/list'])
        })
      .catch((err) => console.log(err));
    }

  ngOnInit() {
  }

}