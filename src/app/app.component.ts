import { Component, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { isPlatformBrowser, Location, PopStateEvent } from '@angular/common';

import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { AdminService } from './services/admin.service';
import { ProjectService } from './services/project.service';
import { SeoService } from './services/seo.service';

import { MobileNavAnimation, FadeAnimation, TopDownAnimation } from './animations';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ MobileNavAnimation, FadeAnimation, TopDownAnimation ]
})
export class AppComponent implements OnInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  isIntro = false;
  isAdmin = false;
  isLogin = false;
  state = 'inactive';
  stateServices = 'inactive';
  stateCourses = 'inactive';
  stateResources = 'inactive';
  stateAbout = 'inactive';
  activePage = '';
  currentYear = new Date().getFullYear();

  constructor(
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    private router: Router,
    private location: Location,
    private renderer: Renderer2,
    private adminService: AdminService,
    private projectService: ProjectService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
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
          if (ev.url !== this.lastPoppedUrl && ev.url.indexOf('/about') === -1) {
            window.scrollTo(0, 0);
          } else {
            this.lastPoppedUrl = undefined;
            window.scrollTo(0, this.yScrollStack.pop());
          }

          // route checks for nav
          // setTimeout(() => {
            this.activePage = ev.url;

            if (ev.url.indexOf('/intro') === 0) {
              this.isIntro = true;
            } else {
              this.isIntro = false;
            }

            if (ev.url.indexOf('/admin') === 0) {
              this.isAdmin = true;
            } else {
              this.isAdmin = false;
            }

            if (ev.url.indexOf('/login') > -1) {
              this.isLogin = true;
            } else {
              this.isLogin = false;
            }
          // }, 250);
        }
      });
    }

    this.seoService.addSeoData();

    this.testMobile();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.testMobile();
  }

  @HostListener('document:mouseout', ['$event']) onLeave(event) {
    if (event.toElement === null || event.relatedTarget === null) {
      this.closeSubNav();
    }
  }

  testMobile() {
    if (isPlatformBrowser(this.platformId)) {
      if (/Android|iPhone|iPad/i.test(window.navigator.userAgent)) {
        this.renderer.addClass(document.documentElement, 'mobile');
      } else {
        if (document.documentElement.classList.contains('mobile')) {
          this.renderer.removeClass(document.documentElement, 'mobile');
        }
      }
    }
    this.state = 'inactive';
    this.stateServices = 'inactive';
    this.stateCourses = 'inactive';
    this.stateResources = 'inactive';
    this.stateAbout = 'inactive';
  }

  toggleNav() {
    if (this.state === 'active') {
      this.state = 'inactive';

      this.renderer.removeClass(document.documentElement, 'modal-open');
    } else {
      this.state = 'active';

      this.renderer.addClass(document.documentElement, 'modal-open');
    }
  }

  closeNav() {
    this.state = 'inactive';
    this.renderer.removeClass(document.documentElement, 'modal-open');
  }

  outsideNav() {
    if (this.state === 'active') {
      this.state = 'inactive';
      this.renderer.removeClass(document.documentElement, 'modal-open');
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
      } else if (id === 'Blog') {
        this.closeSubNav();
        /*
      } else if (id === 'Resources') {
        this.stateServices = 'inactive';
        this.stateCourses = 'inactive';
        this.stateResources = 'active';
        this.stateAbout = 'inactive';
        */
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
    } else if (id === 'Blog') {
      this.closeSubNav();
      /*
    } else if (id === 'Resources') {
      this.stateServices = 'inactive';
      this.stateCourses = 'inactive';
      this.stateResources = (this.stateResources === 'active' ? 'inactive' : 'active');
      this.stateAbout = 'inactive';
      */
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

  activeLink(fragment) {
    return fragment === this.router.url.split('#').pop() ? true : false;
  }

  setPortfolio() {
    this.projectService.selectedCategory = '';
    this.projectService.filter = '';
  }

  logoutAdmin() {
    this.adminService.logout()
      .subscribe(
        res => this.router.navigate(['/admin/login']),
        err => console.log('logout error: ', err)
      );
  }
}
