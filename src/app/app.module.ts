import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { TodoComponent } from './todo/todo.component';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './todo/list/list.component';
import { NgbdDatepickerAdapter } from './todo/datepicker-adapter/datepicker-adapter.component';
import { ListItemComponent } from './todo/list/list-item/list-item.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service'
import { AuthGuard } from './guard.service'

const appRoutes: Routes = [
  { path: 'list', component: TodoComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    AboutComponent,
    ListComponent,
    NgbdDatepickerAdapter,
    ListItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }