import { AfterContentInit, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { interval, Observable, Subscription } from 'rxjs';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class HomeComponent implements AfterContentInit, OnDestroy, OnInit {
  atTop = true;

  // Carousel
  currentSlide = 0;
  carouselDelay = 5000;
  interval: Observable<number> = interval(this.carouselDelay);
  subscription: Subscription;
  testimonials = [
    {
      copy: 'The automätik team created a script and a gorgeous slide deck that carried exactly the message our audience needed to hear, and nothing they didn\'t. All in plain English.',
      client: 'Peter Wendy\nSenior Sales Manager\nJBL / Harman Automotive'
    },
    {
      copy: 'One of the very few companies that anytime you work with them you know you are in good hands...',
      client: 'Veronica Garcia\nManager\nMINI USA'
    },
    {
      copy: 'The planning, creative and execution was masterfully done. There is a reason you call yourselves "automätik"...',
      client: 'Jason Nunamaker\nManager\nProduct & Sales Engagement\nToyota Motors North America'
    },
    {
      copy: 'This is the first work that I have seen that captures a piece of the craftsmanship, time, and care that went into the Camry.',
      client: 'Cooper Ericksen\nVP\nToyota Vehicle Marketing & Communications'
    },
    {
      copy: 'Their over-the-top creativity and stellar project management skills—coupled with their servant attitude—make them a true pleasure to work with...',
      client: 'Marian Perkins\nAmerican Honda Motor Company\nDealer Development'
    },
    {
      copy: 'Their knowledge in the industry is unsurpassed. They don’t just train, they transform. automätik is a modern creative company with an old-school work ethic and strong values.',
      client: 'Lisa Judge\nBMW North America'
    },
    {
      copy: 'From the RAV4 team, thank you again for your inspiration, creativity, dedication, patience and great spirit in working with us!',
      client: 'Toyota RAV4 Vehicle Marketing & Communications Team'
    },
    {
      copy: 'Thank you again to both you and your team for all that you have done for us. The programs have been amazing and ended on extremely high notes. We appreciate all that automatik has done to launch our iconic vehicles together.',
      client: 'April Reyst\nSenior Educational Alliances & Experiential Training Manager\nAlfa Romeo'
    }
  ];
  randomTestimonials = [];
  dataLength = this.testimonials.length - 1;

  // Newsletter
  newsletter = {
    name: '',
    email: ''
  };
  submitted = false;
  loading = false;
  success = false;
  error = '';

  @ViewChild('carousel') carousel: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.randomTestimonials = this.shuffle(this.testimonials);
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
          if (this.currentSlide !== this.testimonials.length - 1) {
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
      this.currentSlide = this.testimonials.length - 1;
    }

    this.startCarousel();
  }

  nextSlide() {
    this.stopCarousel();

    if (this.currentSlide !== this.testimonials.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }

    this.startCarousel();
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      setTimeout(() => {
        this.success = true;
        this.loading = false;
      }, 2000);
    }
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
