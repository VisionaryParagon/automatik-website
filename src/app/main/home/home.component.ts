import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Subscriber } from '../../services/classes';
import { SubscriberService } from '../../services/subscriber.service';

import { ScrollArrowComponent } from '../snippets/scroll-arrow/scroll-arrow.component';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ],
  providers: [ ScrollArrowComponent ]
})
export class HomeComponent implements OnInit {
  isIE = false;
  images = {
    home1: {
      sm: 'https://assets.automatik.com/images/home-car-drifting-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-car-drifting-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-car-drifting-bg-2560.jpg'
    },
    home2: {
      sm: 'https://assets.automatik.com/images/home-mesh-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-mesh-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-mesh-bg-2560.jpg'
    },
    home4: {
      sm: 'https://assets.automatik.com/images/home-5-secrets-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-5-secrets-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-5-secrets-bg-2560.jpg'
    },
    home5: {
      sm: 'https://assets.automatik.com/images/home-one-stop-event-shop-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-one-stop-event-shop-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-one-stop-event-shop-bg-2560.jpg'
    },
    home6: {
      sm: 'https://assets.automatik.com/images/home-platimum-rule-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-platimum-rule-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-platimum-rule-bg-2560.jpg'
    },
    home7: {
      sm: 'https://assets.automatik.com/images/home-presentaion-hero-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-presentaion-hero-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-presentaion-hero-bg-2560.jpg'
    },
    home8: {
      sm: 'https://assets.automatik.com/images/home-tips-from-the-gurus-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-tips-from-the-gurus-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-tips-from-the-gurus-bg-2560.jpg'
    },
    home10: {
      sm: 'https://assets.automatik.com/images/home-we-dont-do-boring-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-we-dont-do-boring-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-we-dont-do-boring-bg-2560.jpg'
    },
    home11: {
      sm: 'https://assets.automatik.com/images/home-meet-in-style-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-meet-in-style-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-meet-in-style-bg-2560.jpg'
    },
    home12: {
      sm: 'https://assets.automatik.com/images/home-engage-to-the-max-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-engage-to-the-max-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-engage-to-the-max-bg-2560.jpg'
    },
    home13: {
      sm: 'https://assets.automatik.com/images/home-perfect-speech-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-perfect-speech-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-perfect-speech-bg-2560.jpg'
    },
    home14: {
      sm: 'https://assets.automatik.com/images/home-powerpoint-jedi-bg-900.jpg',
      md: 'https://assets.automatik.com/images/home-powerpoint-jedi-bg-1440.jpg',
      lg: 'https://assets.automatik.com/images/home-powerpoint-jedi-bg-2560.jpg'
    }
  };
  testimonials = [
    {
      quote: 'The automätik team created a script and a gorgeous slide deck that carried exactly the message our audience needed to hear, and nothing they didn\'t. All in plain English.',
      client: 'Peter Wendy\nSenior Sales Manager\nJBL / Harman Automotive'
    },
    {
      quote: 'One of the very few companies that anytime you work with them you know you are in good hands...',
      client: 'Veronica Garcia\nManager\nMINI USA'
    },
    {
      quote: 'The planning, creative and execution was masterfully done. There is a reason you call yourselves "automätik"...',
      client: 'Jason Nunamaker\nManager\nProduct & Sales Engagement\nToyota Motors North America'
    },
    {
      quote: 'This is the first work that I have seen that captures a piece of the craftsmanship, time, and care that went into the Camry.',
      client: 'Cooper Ericksen\nVP\nToyota Vehicle Marketing & Communications'
    },
    {
      quote: 'Their over-the-top creativity and stellar project management skills—coupled with their servant attitude—make them a true pleasure to work with...',
      client: 'Marian Perkins\nAmerican Honda Motor Company\nDealer Development'
    },
    {
      quote: 'Their knowledge in the industry is unsurpassed. They don’t just train, they transform. automätik is a modern creative company with an old-school work ethic and strong values.',
      client: 'Lisa Judge\nBMW North America'
    },
    {
      quote: 'From the RAV4 team, thank you again for your inspiration, creativity, dedication, patience and great spirit in working with us!',
      client: 'Toyota RAV4 Vehicle Marketing & Communications Team'
    },
    {
      quote: 'Thank you again to both you and your team for all that you have done for us. The programs have been amazing and ended on extremely high notes. We appreciate all that automatik has done to launch our iconic vehicles together.',
      client: 'April Reyst\nSenior Educational Alliances & Experiential Training Manager\nAlfa Romeo'
    }
  ];
  randomTestimonials = this.shuffle(this.testimonials);

  // Newsletter
  subscriber: Subscriber = new Subscriber();
  submitted = false;
  loading = false;
  success = false;
  error = '';

  constructor(
    private subscriberService: SubscriberService,
    private scroller: ScrollArrowComponent,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isIE = /Trident/.test(navigator.userAgent);
    }
  }

  scrollPage() {
    this.scroller.scrollPage();
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

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;
      this.subscriber.status = 'subscribed';
      this.subscriber.timestamp_signup = new Date();

      this.subscriberService.createSubscriber(this.subscriber)
        .subscribe(
          res => {
            this.subscriberService.sendConfirmation(res)
              .subscribe(
                res2 => {
                  this.success = true;
                  this.loading = false;
                },
                err => this.setError(err)
              );
          },
          err => this.setError(err)
        );
    }
  }

  hideError() {
    this.error = '';
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
