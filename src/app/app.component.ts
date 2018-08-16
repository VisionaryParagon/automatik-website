import { Component, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { isPlatformBrowser, Location, PopStateEvent } from '@angular/common';

import { CookieService, CookieOptions } from 'ngx-cookie';

import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { AdminService } from './services/admin.service';
import { ProjectService } from './services/project.service';
import { SeoService } from './services/seo.service';

import { IntroAnimation, MobileNavAnimation, FadeAnimation, TopDownAnimation } from './animations';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ IntroAnimation, MobileNavAnimation, FadeAnimation, TopDownAnimation ]
})
export class AppComponent implements OnInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  feelings = [
    {
      name: 'angry',
      response: 'Aww shucks, sorry.<br>We&rsquo;ve been there.'
    },
    {
      name: 'shy',
      response: 'Gotcha. No pressure.'
    },
    {
      name: 'confident',
      response: 'Awesome! Us too.'
    },
    {
      name: 'tired',
      response: 'No judgement here!'
    },
    {
      name: 'excited',
      response: 'Cool! That makes 56 of&nbsp;us!'
    },
    {
      name: 'annoyed',
      response: 'Ugh, so sorry.<br>#LIFE'
    },
    {
      name: 'happy',
      response: 'Pleased to meet&nbsp;you.<br>It&rsquo;s a great&nbsp;day!'
    },
    {
      name: 'mischievous',
      response: 'Hmm... Should we be&nbsp;nervous?'
    },
    {
      name: 'sad',
      response: 'Aww, we&rsquo;re sorry.<br>:('
    }
  ];
  extraFeelings = [
    {
      name: 'sneaky',
      response: 'Hey, we&rsquo;re watching&nbsp;you!'
    },
    {
      name: 'playful',
      response: 'Great minds...'
    },
    {
      name: 'confused',
      response: 'We hear you.<br>Hope we can&nbsp;help.'
    },
    {
      name: 'iffy',
      response: '&lsquo;nuff said. We&rsquo;ll be here if you need&nbsp;us.'
    },
    {
      name: 'dicey',
      response: 'Yikes! We&rsquo;ll keep our&nbsp;distance...'
    },
    {
      name: 'frustrated',
      response: 'Bummer. Hope everything works&nbsp;out.'
    }
  ];
  randomFeelings = [];
  cookieExp = new Date();
  cookieOptions: CookieOptions = {
    expires: new Date()
  };
  hovering = '';
  selected = '';
  success = '';
  start = false;
  ready = false;
  interact = false;
  clicked = false;
  successShow = false;
  successHide = false;

  introActive = true;
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
    private cookieService: CookieService,
    private adminService: AdminService,
    private projectService: ProjectService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIntro();

      this.location.subscribe((ev: PopStateEvent) => {
        this.lastPoppedUrl = ev.url;
      });

      this.router.events.subscribe((ev: any) => {
        if (ev instanceof NavigationStart) {
          this.checkIntro();

          // save page scroll location
          if (ev.url !== this.lastPoppedUrl) {
            this.yScrollStack.push(window.scrollY);
          }

          // Hide intro on blog and admin
          if (ev.url.indexOf('/admin') !== -1 || ev.url.indexOf('/blog') !== -1) {
            this.skipIntro();
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
          // setTimeout(() => {
            this.activePage = ev.url;

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
    } else {
      this.introActive = false;
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

  checkIntro() {
    if (this.cookieService.get('intro')) {
      this.introActive = false;
    } else {
      this.renderer.addClass(document.documentElement, 'modal-open');

      this.randomFeelings = this.shuffle(this.feelings);

      setTimeout(() => {
        this.start = true;

        setTimeout(() => {
          this.ready = true;

          setTimeout(() => {
            this.interact = true;
          }, 1000);
        }, 3000);
      }, 500);

      // Set cookie exp
      this.cookieExp.setDate(this.cookieExp.getDate() + 7);
      this.cookieOptions.expires = this.cookieExp;
    }
  }

  shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  hoverFeeling(face) {
    this.hovering = face;
  }

  selectFeeling(feeling) {
    this.clicked = true;
    this.selected = feeling.name;
    this.success = feeling.response;
    this.successShow = true;

    setTimeout(() => {
      this.successHide = true;

      setTimeout(() => {
        // Set cookie
        this.cookieService.put('intro', 'true', this.cookieOptions);

        // Hide intro
        this.introActive = false;
        this.renderer.removeClass(document.documentElement, 'modal-open');
      }, 500);
    }, 2000);
  }

  skipIntro() {
    // Set cookie
    this.cookieService.put('intro', 'true', this.cookieOptions);

    // Hide intro
    this.introActive = false;
    this.renderer.removeClass(document.documentElement, 'modal-open');
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

