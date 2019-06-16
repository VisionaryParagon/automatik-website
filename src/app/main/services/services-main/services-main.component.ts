import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-services-main',
  templateUrl: './services-main.component.html',
  styleUrls: ['./services-main.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ServicesMainComponent implements OnInit {
  services = [
    {
      title: 'Event Planning',
      headline: 'Let our team sweat the details on your behalf.',
      title_image: 'https://assets.automatik.com/images/event-planning-hero-bg-900.jpg',
      slug: 'event-planning',
      keywords: 'agenda planning, hotel sourcing and contracting, site procurement, OEM automotive training tour routing, OEM automotive press drives, shuttle sourcing, food and beverage planning, contract staffing, vehicle acquisition, vehicle transportation, uniform sourcing, gifts and premiums sourcing'
    },
    {
      title: 'Event Production',
      headline: '“Drop the mic” event lighting, staging, projection, and audio.',
      title_image: 'https://assets.automatik.com/images/event-production-hero-bg-900.jpg',
      slug: 'event-production',
      keywords: 'Vehicle acquisition, transportation, staging, screen rental, video rental, audio visual rental, LED lighting rental, track setup design, event stage rental'
    },
    {
      title: 'Instructional Design',
      headline: 'Creating engaging training experiences is the heartbeat of automätik.',
      title_image: 'https://assets.automatik.com/images/instructional-design-hero-bg-900.jpg',
      slug: 'instructional-design',
      keywords: 'Product launch training, sales skill training, consultative sales training, parts and service training, management training, train the trainer training, instructional design, elearning, corporate learning consulting, presentation training, powerpoint training, slide design training, and executive presentation consultation'
    },
    {
      title: 'Graphic Design',
      headline: 'Award-winning, graphic design strategy and production.',
      title_image: 'https://assets.automatik.com/images/graphic-design-hero-bg-900.jpg',
      slug: 'graphic-design',
      keywords: 'Visual identity, packaging, digital advertising, graphic design, logo design, layout, large format graphic design, banner design, environmental design, CAD, website design'
    },
    {
      title: 'Video Production',
      headline: 'Full-service video and audio production.',
      title_image: 'https://images.unsplash.com/photo-1534351594065-55bd7f5f75d0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ac1f6086a14195985ea4d32644f9d90d&auto=format&fit=crop&w=934&q=80',
      // title_image: 'https://assets.automatik.com/images/video-production-hero-bg-900.jpg',
      slug: 'video-production',
      keywords: 'Onsite videography, post production, motion graphic design, audio recording and mixing, corporate video production, opening videos, closing videos, royalty-free videos'
    },
    {
      title: 'App and Web Development',
      headline: 'Seamless integration to deliver results.',
      title_image: 'https://assets.automatik.com/images/app-web-development-hero-bg-900.jpg',
      slug: 'app-and-web-development',
      keywords: 'UI / UX Design, event websites, registration websites, digital event guides, live polling, gamification, elearning, augmented reality, virtual product explorations, Apple ARKit'
    },
  ];
  filteredServices = [...this.services];
  filter = '';
  hovered = '';
  filterOpen = false;
  width: number;
  loading = false;
  error = '';

  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('tileBox') tileBox: ElementRef;
  @ViewChildren('tiles') tiles: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.setTilePosition();

    if (isPlatformBrowser(this.platformId)) {
      this.width = window.innerWidth;
    }
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    const w = window.innerWidth;

    if (w !== this.width) {
      this.setTilePosition();
      this.width = w;
    }
  }
  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    const tileBoxHeight = this.tileBox.nativeElement.getBoundingClientRect().height;
    let scrollHeight = window.innerHeight + window.scrollY;

    if (document.documentElement.classList.contains('mobile')) {
      scrollHeight = scrollHeight - 50;
    } else {
      scrollHeight = scrollHeight - 60;
    }

    if (window.innerWidth >= 1200) {
      if (scrollHeight >= tileBoxHeight) {
        this.sidebar.nativeElement.style.top = tileBoxHeight - scrollHeight + 'px';
      } else {
        this.sidebar.nativeElement.style.top = '0px';
      }
    }
  }

  setServices(srv) {
    this.services = [...this.serviceSort(srv)];
    this.filteredServices = this.serviceSort(srv);
    this.setTilePosition();
  }

  serviceSort(services) {
    services.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });

    return services;
  }

  setTilePosition() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

      setTimeout(() => {
        if (window.innerWidth >= 1200) {
          if (this.tiles.length) {
            this.tiles.forEach((el, idx) => {
              const x = idx % 3;
              const y = Math.floor(idx / 3.0);
              const height = el.nativeElement.getBoundingClientRect().height;
              const width = el.nativeElement.getBoundingClientRect().width;

              el.nativeElement.style.left = x * width + 'px';
              el.nativeElement.style.top = y * height + 'px';
            });

            this.tileBox.nativeElement.style.height = this.tiles.first.nativeElement.getBoundingClientRect().height * Math.ceil(this.tiles.length / 3.0) + 'px';
          } else {
            if (document.documentElement.classList.contains('mobile')) {
              this.tileBox.nativeElement.style.height = window.innerHeight - 50 + 'px';
            } else {
              this.tileBox.nativeElement.style.height = window.innerHeight - 60 + 'px';
            }
          }
        } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
          if (this.tiles.length) {
            this.tiles.forEach((el, idx) => {
              const x = idx % 2;
              const y = Math.floor(idx / 2.0);
              const height = el.nativeElement.getBoundingClientRect().height;
              const width = el.nativeElement.getBoundingClientRect().width;

              el.nativeElement.style.left = x * width + 'px';
              el.nativeElement.style.top = y * height + 'px';
            });

            this.tileBox.nativeElement.style.height = this.tiles.first.nativeElement.getBoundingClientRect().height * Math.ceil(this.tiles.length / 2.0) + 'px';
          } else {
            if (document.documentElement.classList.contains('mobile')) {
              this.tileBox.nativeElement.style.height = window.innerHeight - 50 + 'px';
            } else {
              this.tileBox.nativeElement.style.height = window.innerHeight - 60 + 'px';
            }
          }
        } else {
          this.tiles.forEach((el, idx) => {
            el.nativeElement.style.left = '0px';
            el.nativeElement.style.top = '0px';
          });

          this.tileBox.nativeElement.style.height = 'auto';
        }
      }, 250);
    }
  }

  setHover(id) {
    if (this.hovered !== id) {
      this.hovered = id;
    }
  }

  openPanel() {
    this.filterOpen = true;
    this.setModalClass();
  }

  closePanel() {
    this.filterOpen = false;
    this.setModalClass();
  }

  setModalClass() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.filterOpen) {
        this.renderer.removeClass(document.documentElement, 'modal-open');
      } else {
        this.renderer.addClass(document.documentElement, 'modal-open');
      }
    }
  }

  updateFilter() {
    const val = this.filter.toLowerCase();
    let filtered = [];

    filtered = this.filteredServices.filter(d => JSON.stringify(Object.values(d)).toLowerCase().indexOf(val) !== -1);

    this.services = filtered;
    this.setTilePosition();
  }

  clearFilter() {
    this.filter = '';
    this.updateFilter();
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
