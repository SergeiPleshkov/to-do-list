import { Component } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private routes: Router) {
  }
  title = 'app';
  ngOnInit() {
    this.auth.isLoggedIn() ? this.routes.navigate(['list']) : this.routes.navigate(['login'])
  }
}
