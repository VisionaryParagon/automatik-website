import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Image, Seo, Workshop, WorkshopEvent, Location } from '../../../../services/classes';
import { ImageService } from '../../../../services/image.service';
import { WorkshopsService } from '../../../../services/workshops.service';
import { SeoService } from '../../../../services/seo.service';

import { FadeAnimation, TopDownAnimation } from '../../../../animations';

import { WorkshopRegistrationComponent } from '../../../modals/workshop-registration/workshop-registration.component';

@Component({
  selector: 'app-workshops-event',
  templateUrl: './workshops-event.component.html',
  styleUrls: ['./workshops-event.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class WorkshopsEventComponent implements OnInit {
  slug = this.route.snapshot.params.slug;
  metadata: Seo;
  images: Image[] = this.imageService.images;
  heroImages;
  workshops: Workshop[] = this.workshopService.workshops;
  workshop: Workshop;
  events: WorkshopEvent[];
  filteredEvents: WorkshopEvent[];
  selectedEvent: number;
  locations: Location[];
  anyVal: any;
  filter: string;
  filters = {
    date: this.anyVal,
    location: this.anyVal
  };
  workshopsLoaded = false;
  eventsLoaded = false;
  imagesLoaded = false;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private imageService: ImageService,
    private workshopService: WorkshopsService,
    private modalService: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.getWorkshops();

    if (this.images) {
      this.imagesLoaded = true;
      this.checkData();
    } else {
      this.imageService.getImages()
        .subscribe(
          res => {
            this.images = res;
            this.imagesLoaded = true;
            this.checkData();
          },
          err => this.setError('Could not get images: ' + err)
        );
    }

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        const newSlug = ev.url.split('/').pop();

        if (ev.url.indexOf('/training/workshops/') === 0 && newSlug !== this.slug) {
          this.loading = true;
          this.slug = newSlug;
          this.resetFilters();

          setTimeout(() => this.setWorkshops(), 250);
        }
      }
    });
  }

  scrollTo(id) {
    if (isPlatformBrowser(this.platformId)) {
      const moz = /Firefox/.test(navigator.userAgent);
      const ms = /Edge|Trident/.test(navigator.userAgent);

      if (id) {
        const el = document.getElementById(id);

        if (el) {
          if (ms) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else if (moz) {
            setTimeout(() => {
              window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' });
            }, 50);
          } else {
            window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' });
          }
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

  getWorkshops() {
    if (!this.workshops) {
      this.workshops = this.workshopService.getWorkshops();
      this.setWorkshops();
      /*
      this.workshopService.getWorkshops()
        .subscribe(
          res => {
            this.workshops = res;
            this.setWorkshops();
          },
          err => this.setError('Could not get workshops: ' + err)
        );
      */
    } else {
      this.setWorkshops();
    }
  }

  setWorkshops() {
    this.workshop = this.workshops.filter(w => w.slug === this.slug)[0];
    if (this.workshop) {
      this.setSEO(this.workshop);
      this.getEvents();
    } else {
      this.setSEO();
      this.setError('Sorry! This workshop doesn’t exist.');
    }
    this.heroImages = {
      sm: this.workshop.title_image_sm,
      md: this.workshop.title_image_md,
      lg: this.workshop.title_image_lg
    };
    this.workshopsLoaded = true;
    this.checkData();
  }

  getEvents() {
    if (!this.workshopService.events) {
      this.setEvents(this.workshopService.getWorkshopEvents());
      /*
      this.workshopService.getWorkshopEvents()
        .subscribe(
          res => this.setEvents(res),
          err => this.setError('Could not get events: ' + err)
        );
      */
    } else {
      this.setEvents(this.workshopService.events);
    }
  }

  setEvents(events) {
    this.events = events.filter(c => c.workshop === this.workshop.title);
    this.filteredEvents = [...this.events];
    this.setLocations();
    this.eventsLoaded = true;
    this.checkData();
  }

  setLocations() {
    this.locations = this.events.map(c => c.location).filter((loc, idx, self) =>
      idx === self.findIndex(l => l.city === loc.city && l.state === loc.state)
    ).sort((a, b) => {
      return a.city < b.city ? -1 : a.city > b.city ? 1 : 0;
    });
  }

  setSEO(data?) {
    if (data) {
      this.metadata = {
        title: data.meta_title + ' | automätik',
        metatags: [
          {
            name: 'description',
            content: data.description
          },
          {
            name: 'keywords',
            content: data.keywords
          },
          {
            property: 'og:title',
            content: data.meta_title + ' | automätik'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:url',
            content: 'https://automatik.com/training/workshops/' + data.slug
          },
          {
            property: 'og:image',
            content: data.title_image_lg
          },
          {
            property: 'og:description',
            content: data.description
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            name: 'twitter:site',
            content: '@automatikEvents'
          },
          {
            name: 'twitter:title',
            content: data.meta_title + ' | automätik'
          },
          {
            name: 'twitter:description',
            content: data.description
          },
          {
            name: 'twitter:image:src',
            content: data.title_image_lg
          }
        ]
      };

      this.seoService.addDynamicSeoData(this.metadata);
    } else {
      this.seoService.addDynamicSeoData();
    }
  }

  checkData() {
    if (this.workshopsLoaded && this.eventsLoaded && this.imagesLoaded) {
      if (!this.workshops.length) {
        this.setError('There are currently no workshops available.');
      }
      this.loading = false;
    }
  }

  getImageAlt(path) {
    if (this.images) {
      return this.images.filter(img => img.path === path)[0].alt;
    }
  }

  changeFilter(ev) {
    this.filter = ev;
    Object.keys(this.filters).forEach(f => this.filters[f] = this.anyVal);
    this.filteredEvents = [...this.events];
  }

  filterByWorkshop(ev) {
    this.filteredEvents = this.events.filter(c => c.workshop === ev);
  }

  filterByDate(ev) {
    this.filteredEvents = this.events.filter(c =>
      new Date(c.start_date).getMonth() === new Date(ev).getMonth() &&
      new Date(c.start_date).getDate() === new Date(ev).getDate()
    );
  }

  filterByLocation(ev) {
    this.filteredEvents = this.events.filter(c => c.location.city === ev);
  }

  resetFilters() {
    this.filter = this.anyVal;
    Object.keys(this.filters).forEach(f => this.filters[f] = this.anyVal);
    this.filteredEvents = [...this.events];
  }

  toggleEvent(idx, target) {
    if (target.className.indexOf('autoBtn') === -1) {
      this.selectedEvent = this.selectedEvent !== idx ? idx : null;
    }
  }

  register(event) {
    const modal = this.modalService.open(WorkshopRegistrationComponent, {
      data: event,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '90%'
    });
    modal.afterClosed()
      .subscribe(
        result => {},
        error => {}
      );
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
