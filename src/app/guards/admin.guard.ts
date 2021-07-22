import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private route: Router) { }

  canActivate() {
    if (sessionStorage.getItem('tipoUsuario') && sessionStorage.getItem('tipoUsuario')! == "ADMINSTRADOR") {
      return true;
    } else if (!sessionStorage.getItem('userId')) {
      this.route.navigate(['/log-in'])
      return false;
    } else {
      this.route.navigate(['/books'])
      return false;
    }
  }

}
