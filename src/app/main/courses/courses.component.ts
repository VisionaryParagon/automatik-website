import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  animations: [ FadeAnimation ]
})
export class CoursesComponent implements AfterViewInit, OnInit {
  heroImages = {
    sm: 'https://assets.automatik9dots.com/images/home-presentaion-hero-bg-900.jpg',
    md: 'https://assets.automatik9dots.com/images/home-presentaion-hero-bg-1440.jpg',
    lg: 'https://assets.automatik9dots.com/images/home-presentaion-hero-bg-2560.jpg'
  };

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => this.scrollTo(fragment));
  }

  scrollTo(id) {
    if (isPlatformBrowser(this.platformId)) {
      const moz = /Firefox/.test(navigator.userAgent);
      const ms = /Edge|Trident/.test(navigator.userAgent);

      if (id) {
        const el = document.getElementById(id);

        if (ms) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (moz) {
          setTimeout(() => {
            window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' });
          }, 50);
        } else {
          window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' });
        }
      } else {
        if (moz) {
          setTimeout(() => {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          }, 50);
        }
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  }
}
