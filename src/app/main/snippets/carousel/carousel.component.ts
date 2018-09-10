import { Component, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input('slides') slides;
  currentSlide = 0;
  carouselDelay = 5000;
  interval: Observable<number> = interval(this.carouselDelay);
  slideSub: Subscription;
  xStart: number;
  xEnd: number;
  swipe: Observable<number> = interval(10);
  swipeSub: Subscription;
  swipeTime: number;
  dataLength: number;

  @ViewChild('carousel') carousel: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.dataLength = this.slides.length - 1;
    this.setCarousel();
    this.startCarousel();
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    this.setCarousel();
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
      if (!this.slideSub || this.slideSub.closed) {
        this.slideSub = this.interval.subscribe(() => {
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
    if (this.slideSub) {
      this.slideSub.unsubscribe();
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

  setXStart(e) {
    this.stopCarousel();

    e.preventDefault();

    this.xStart = e.changedTouches[0].pageX;

    if (!this.swipeSub || this.swipeSub.closed) {
      this.swipeSub = this.swipe.subscribe(t => this.swipeTime = t);
    }
  }

  setXEnd(e) {
    e.preventDefault();

    this.xEnd = e.changedTouches[0].pageX;

    if (this.swipeSub) {
      this.swipeSub.unsubscribe();
    }

    if (Math.abs(this.xStart - this.xEnd) >= 50 && this.swipeTime < 200) {
      if (this.xStart < this.xEnd) {
        this.prevSlide();
      } else if (this.xStart > this.xEnd) {
        this.nextSlide();
      }
    }

    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }
}
