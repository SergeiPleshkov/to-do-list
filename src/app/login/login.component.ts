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

  constructor(private authService: AuthService, private router: Router) {
  }

    signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['/list'])
        })
      .catch((err) => console.log('сайнин эрор',err));
    }

  ngOnInit() {
  }

}