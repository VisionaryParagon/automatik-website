import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class IntroService implements CanActivate {
  returnUrl: string;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cookieService.get('intro')) {
      return true;
    }

    // Save redirect URL
    this.returnUrl = state.url;

    // Navigate to the intro page
    this.router.navigate(['/welcome']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
