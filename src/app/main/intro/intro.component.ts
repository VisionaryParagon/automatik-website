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
    'angry',
    'shy',
    'confident',
    'tired',
    'excited',
    'annoyed',
    'happy',
    'mischievous',
    'sad'
  ];
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

  hoverFeeling(face) {
    this.hovering = face;
  }

  selectFeeling(face) {
    this.clicked = true;
    this.selected = face;

    if (face === 'confident' || face === 'excited' || face === 'happy') {
      this.success = 'Right on! Us too!';
    } else {
      this.success = 'Bummer... Let\'s change that!';
    }

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
