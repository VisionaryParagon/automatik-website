import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Workshop } from '../../../services/classes';
import { WorkshopsService } from '../../../services/workshops.service';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-training-main',
  templateUrl: './training-main.component.html',
  styleUrls: ['./training-main.component.scss'],
  animations: [ FadeAnimation ]
})
export class TrainingMainComponent implements AfterViewInit, OnInit {
  heroImages = {
    sm: 'https://assets.automatik.com/images/training-hero-bg-900.jpg',
    md: 'https://assets.automatik.com/images/training-hero-bg-1440.jpg',
    lg: 'https://assets.automatik.com/images/training-hero-bg-2560.jpg'
  };
  workshops: Workshop[] = this.workshopsService.workshops;

  constructor(
    private route: ActivatedRoute,
    private workshopsService: WorkshopsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.setWorkshops();
  }

  setWorkshops() {
    if (!this.workshops) {
      this.workshops = this.workshopsService.getWorkshops();
    }
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
