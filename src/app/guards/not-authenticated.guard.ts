import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private route: Router) { }

  canActivate() {
    if (!sessionStorage.getItem('userId')) {
      return true;
    } else {
      this.route.navigate(['/books'])
      return false;
    }
  }

}
