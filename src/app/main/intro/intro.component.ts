import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { CookieService, CookieOptions } from 'ngx-cookie';

import { IntroGuardService } from '../../services/intro-guard.service';

import { IntroAnimation, FadeAnimation } from '../../animations';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations: [ IntroAnimation, FadeAnimation ]
})
export class IntroComponent implements OnInit {
  returnUrl: string;
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
      response: 'Cool! That makes 32 of&nbsp;us!'
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

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private cookieService: CookieService,
    private introService: IntroGuardService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Set return URL
    this.returnUrl = this.introService.returnUrl ? this.introService.returnUrl : '/';

    // Set cookie exp
    this.cookieExp.setDate(this.cookieExp.getDate() + 7);
    this.cookieOptions.expires = this.cookieExp;

    if (this.cookieService.get('intro')) {
      this.endIntro();
    } else {
      this.startIntro();
    }
  }

  startIntro() {
    // Set up and start intro
    this.randomFeelings = this.shuffle(this.feelings);

    if (isPlatformBrowser(this.platformId)) {
      // Add modal class
      this.renderer.addClass(document.documentElement, 'modal-open');

      setTimeout(() => {
        this.start = true;

        setTimeout(() => {
          this.ready = true;

          setTimeout(() => {
            this.interact = true;
          }, 1000);
        }, 3000);
      }, 500);
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
        this.endIntro();
      }, 500);
    }, 2000);
  }

  endIntro() {
    // Set cookie
    this.cookieService.put('intro', 'true', this.cookieOptions);

    // Remove modal class
    this.renderer.removeClass(document.documentElement, 'modal-open');

    // Redirect to route
    this.router.navigate([this.returnUrl]);
  }
}
