import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService, CookieOptions } from 'ngx-cookie';

import { IntroService } from '../../services/intro.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class IntroComponent implements OnInit {
  returnUrl = this.introService.returnUrl || '/';
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
      response: 'Cool! That makes 56 of&nbsp;us!'
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
  introCookie = this.cookieService.get('intro');
  cookieExp = new Date();
  cookieOptions: CookieOptions = {
    expires: new Date()
  };
  time = new Date().getHours();
  greeting = '';
  hovering = '';
  selected = '';
  success = '';
  greet = false;
  start = false;
  ready = false;
  interact = false;
  clicked = false;
  successShow = false;
  successHide = false;

  constructor(
    private cookieService: CookieService,
    private introService: IntroService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.introCookie) {
      this.router.navigate(['../']);
    }

    if (this.time >= 4 && this.time < 11) {
      this.greeting = 'Morning';
    } else if (this.time >= 12 && this.time < 18) {
      this.greeting = 'Afternoon';
    } else {
      this.greeting = 'Evening';
    }

    this.randomFeelings = this.shuffle(this.feelings);

    setTimeout(() => {
      this.greet = true;

      setTimeout(() => {
        this.greet = false;
        this.start = true;

        setTimeout(() => {
          this.ready = true;

          setTimeout(() => {
            this.interact = true;
          }, 1000);
        }, 3000);
      }, 2000);
    }, 500);

    // Set cookie exp
    this.cookieExp.setDate(this.cookieExp.getDate() + 7);
    this.cookieOptions.expires = this.cookieExp;

    // Get return url from route parameters or default to Home
    this.returnUrl = this.introService.returnUrl || '/';
    // this.returnUrl = '/';
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
        // Set cookie
        this.cookieService.put('intro', 'true', this.cookieOptions);

        // Redirect to saved URL or home
        this.router.navigateByUrl(this.returnUrl);
      }, 500);
    }, 2000);
  }

  skip() {
    // Set cookie
    this.cookieService.put('intro', 'true', this.cookieOptions);

    // Redirect to saved URL or home
    this.router.navigateByUrl(this.returnUrl);
  }
}
