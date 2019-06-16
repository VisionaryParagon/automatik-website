import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class IntroGuardService implements CanActivate, CanActivateChild {
  returnUrl: string;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return new Promise(resolve => {
      if (this.cookieService.get('intro')) {
        resolve(true);
      } else {
        // Save redirect URL
        this.returnUrl = state.url;

        // Navigate to the login page
        this.router.navigate(['/intro']);

        resolve(false);
      }
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(route, state);
  }
}
