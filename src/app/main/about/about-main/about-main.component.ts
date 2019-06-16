import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-about-main',
  templateUrl: './about-main.component.html',
  styleUrls: ['./about-main.component.scss'],
  animations: [ FadeAnimation ]
})
export class AboutMainComponent implements AfterViewInit, OnInit {
  heroImages = {
    main: {
      sm: 'https://assets.automatik.com/images/about-hero-bg-900.jpg',
      md: 'https://assets.automatik.com/images/about-hero-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/about-hero-bg-2560.jpg'
    },
    history: {
      sm: 'https://assets.automatik.com/images/about-history-bg-900.jpg',
      md: 'https://assets.automatik.com/images/about-history-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/about-history-bg-2560.jpg'
    }
  };
  error = '';

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
