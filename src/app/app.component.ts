import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

import { CookieService } from 'ngx-cookie';

import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { SeoService } from './services/seo.service';

import { NavAnimation, FadeAnimation, TopDownAnimation } from './animations';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ NavAnimation, FadeAnimation, TopDownAnimation ]
})
export class AppComponent implements OnInit {
  isMobile = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  introCookie = this.cookieService.get('intro');
  introActive = true;
  isAdmin = false;
  state = 'inactive';
  stateServices = 'inactive';
  stateCourses = 'inactive';
  stateResources = 'inactive';
  stateAbout = 'inactive';
  activePage = '';

  constructor(
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    private router: Router,
    private location: Location,
    private cookieService: CookieService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.testMobile();

    this.seoService.addSeoData();

    if (this.introCookie) {
      this.introActive = false;
    }

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        // save page scroll location
        if (ev.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (ev instanceof NavigationEnd) {
        // Google Analytics events
        ga('set', 'page', ev.urlAfterRedirects);
        ga('send', 'pageview');

        // set page scroll
        if (ev.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }

        // route checks for nav
        setTimeout(() => {
          this.activePage = ev.url;

          if (ev.url.indexOf('/welcome') === 0) {
            this.introActive = true;
          } else {
            this.introActive = false;
          }

          if (ev.url.indexOf('/admin') === 0) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        }, 250);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.testMobile();
  }

  testMobile() {
    this.isMobile = /Android|iPhone|iPad/i.test(window.navigator.userAgent);
    this.state = 'inactive';
    this.stateServices = 'inactive';
    this.stateCourses = 'inactive';
    this.stateResources = 'inactive';
    this.stateAbout = 'inactive';
  }

  toggleNav() {
    this.state = (this.state === 'active' ? 'inactive' : 'active');

    if (document.body.className.indexOf('modal') === -1) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }

  closeNav() {
    this.state = 'inactive';
    document.body.classList.remove('modal-open');
  }

  outsideNav() {
    if (this.state === 'active') {
      this.state = 'inactive';
      document.body.classList.remove('modal-open');
    }
  }

  toggleSubNav(e, id) {
    if (e.target.tagName === 'A') {
      if (id === 'Services') {
        this.stateServices = 'active';
        this.stateCourses = 'inactive';
        this.stateResources = 'inactive';
        this.stateAbout = 'inactive';
      } else if (id === 'Courses') {
        this.stateServices = 'inactive';
        this.stateCourses = 'active';
        this.stateResources = 'inactive';
        this.stateAbout = 'inactive';
      } else if (id === 'Portfolio') {
        this.closeSubNav();
      } else if (id === 'Resources') {
        this.stateServices = 'inactive';
        this.stateCourses = 'inactive';
        this.stateResources = 'active';
        this.stateAbout = 'inactive';
      } else if (id === 'About') {
        this.stateServices = 'inactive';
        this.stateCourses = 'inactive';
        this.stateResources = 'inactive';
        this.stateAbout = 'active';
      }
    } else {
      this.closeSubNav();
    }
  }

  toggleMobileSubNav(id) {
    if (id === 'Services') {
      this.stateServices = (this.stateServices === 'active' ? 'inactive' : 'active');
      this.stateCourses = 'inactive';
      this.stateResources = 'inactive';
      this.stateAbout = 'inactive';
    } else if (id === 'Courses') {
      this.stateServices = 'inactive';
      this.stateCourses = (this.stateCourses === 'active' ? 'inactive' : 'active');
      this.stateResources = 'inactive';
      this.stateAbout = 'inactive';
    } else if (id === 'Portfolio') {
      this.closeSubNav();
    } else if (id === 'Resources') {
      this.stateServices = 'inactive';
      this.stateCourses = 'inactive';
      this.stateResources = (this.stateResources === 'active' ? 'inactive' : 'active');
      this.stateAbout = 'inactive';
    } else if (id === 'About') {
      this.stateServices = 'inactive';
      this.stateCourses = 'inactive';
      this.stateResources = 'inactive';
      this.stateAbout = (this.stateAbout === 'active' ? 'inactive' : 'active');
    }
  }

  closeSubNav() {
    this.stateServices = 'inactive';
    this.stateCourses = 'inactive';
    this.stateResources = 'inactive';
    this.stateAbout = 'inactive';
  }

  logoutAdmin() {
    this.cookieService.removeAll();
    // this.adminService.logout();
    // this.adminService.loggedIn = false;

    this.router.navigate(['/admin/login']);
  }
}

