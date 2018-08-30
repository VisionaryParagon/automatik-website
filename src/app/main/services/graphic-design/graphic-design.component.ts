import { AfterContentInit, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { interval, Observable, Subscription } from 'rxjs';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-graphic-design',
  templateUrl: './graphic-design.component.html',
  styleUrls: ['./graphic-design.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class GraphicDesignComponent implements AfterContentInit, OnInit, OnDestroy {
  atTop = true;

  // Carousel
  currentSlide = 0;
  carouselDelay = 5000;
  interval: Observable<number> = interval(this.carouselDelay);
  subscription: Subscription;
  slides = [
    {
      heading: `Can&rsquo;t beat experience...`,
      copy: `Our team of event managers have a <strong>combined 50+ years of event planning experience</strong>, running the gamut from multi-wave product launch trainings to skills seminars, awards galas, community health fairs, marathons, conventions, and everything in between. <em>All we do</em> is manage events, so you can feel confident knowing we have your&nbsp;back.`
    },
    {
      heading: `OCD-level attention to detail...`,
      copy: `There&rsquo;s a reason many of our clients have told us the events we have managed for them are the most organized events they&rsquo;ve ever been a part of. <strong>We sweat the small stuff</strong>, because we believe that perfectly prepared centerpieces, unique branded touchpoints, and a little extra spice in the morning scrambled eggs are what can make a <em>good</em> event&nbsp;<strong>great</strong>.`
    },
    {
      heading: `Lightning speed...`,
      copy: `For many organizations, gone are the days of year-out lead times. <strong>Enter autom&auml;tik.</strong> We focus not only on getting the job done right, but on getting it done <em>quickly</em> so that you can achieve the objectives of your event the way you envision them even though you don&rsquo;t have enough hours in the day. We pride ourselves on our level of responsiveness to both clients and vendors because we know that the difference between finding a solution today and finding one tomorrow can make all the difference to your&nbsp;event.`
    },
    {
      heading: `Value-based mentality...`,
      copy: `We understand that nothing happens without the funds to make it happen. So, we make it our business to give you the best possible solution to fit within <em>your</em> budget parameters. We pride ourselves on identifying creative ideas that elevate the quality of the programs we manage without necessarily adding cost, so that you can feel comfortable knowing you&rsquo;re getting the <strong>best value for your hard&#8209;earned&nbsp;dollars</strong>.`
    },
    {
      heading: `Indubitable passion...`,
      copy: `As we often say, <strong>event management is not for the faint of heart</strong>. Talk to any of our event managers, and you&rsquo;ll learn that we welcome and thrive on the ever-changing range of unique tasks and challenges that drew us into this field to begin with. Quite simply, <em>we live for this</em>. And we would be grateful for the opportunity to serve you by doing what we&nbsp;love.`
    }
  ];
  dataLength = this.slides.length - 1;

  @ViewChild('carousel') carousel: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.checkScroll();
  }

  ngAfterContentInit() {
    this.setCarousel();
    this.startCarousel();
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    this.setCarousel();
  }
  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    this.checkScroll();
  }

  scrollPage() {
    if (isPlatformBrowser(this.platformId)) {
      let scrl = window.innerHeight;
      if (document.documentElement.classList.contains('mobile')) {
        scrl = scrl - 50;
      } else {
        scrl = scrl - 60;
      }
      window.scroll({top: scrl, left: 0, behavior: 'smooth'});
    }
  }

  checkScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.atTop = window.scrollY > 50 ? false : true;
    }
  }

  setCarousel() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const el = this.carousel.nativeElement;
        const children: Array<HTMLElement> = Array.from(el.children);
        children.sort((a: HTMLElement, b: HTMLElement) => {
          if (a.offsetHeight < b.offsetHeight) {
            return -1;
          } else if (a.offsetHeight > b.offsetHeight) {
            return 1;
          }
          return 0;
        });
        el.style.height = children.pop().offsetHeight + 30 + 'px';
      }, 250);
    }
  }

  startCarousel() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.subscription || this.subscription.closed) {
        this.subscription = this.interval.subscribe(() => {
          if (this.currentSlide !== this.slides.length - 1) {
            this.currentSlide++;
          } else {
            this.currentSlide = 0;
          }
        });
      }
    }
  }

  stopCarousel() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setSlide(idx) {
    this.stopCarousel();

    this.currentSlide = idx;

    this.startCarousel();
  }

  prevSlide() {
    this.stopCarousel();

    if (this.currentSlide !== 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.slides.length - 1;
    }

    this.startCarousel();
  }

  nextSlide() {
    this.stopCarousel();

    if (this.currentSlide !== this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }

    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }
}
