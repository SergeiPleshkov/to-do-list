import { Component } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService) {
  }
  title = 'app';
}
