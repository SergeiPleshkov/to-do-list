import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(): Promise<boolean> {
    return new Promise(resolve =>
      this.authService.fetchUserInfo().then(user => resolve(!!user))
    );
  }
}