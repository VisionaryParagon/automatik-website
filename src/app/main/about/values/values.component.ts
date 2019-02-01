import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ValuesComponent implements OnInit {
  values = [
    {
      title: 'People First',
      headline: 'Our highest priority is honoring, encouraging, and developing the people we work with and for, because we believe that people—not money, not things, not ideas—can change the world.',
      image: 'https://assets.automatik.com/images/values-people-first.jpg'
    },
    {
      title: 'Excellence',
      headline: 'We revolt against mediocrity, commonplace, and average with everything in us, even when it hurts, because we believe greatness is the “magic” that makes people believe anything is possible.',
      image: 'https://assets.automatik.com/images/values-excellence.jpg'
    },
    {
      title: 'Loyalty',
      headline: 'Because we value deep relationships over “the next best thing,” we are committed to investing in the kind of rewarding loyalty that can only come from consistent service and sacrifice over time.',
      image: 'https://assets.automatik.com/images/values-loyalty.jpg'
    },
    {
      title: 'Integrity',
      headline: 'Since the “high road” is the only road where everyone wins, it’s the only one we’re ever willing to travel—no matter the pressure, no matter the circumstance, no matter the cost.',
      image: 'https://assets.automatik.com/images/values-integrity.jpg'
    },
    {
      title: 'Curiosity',
      headline: 'We tenaciously pursue smarter, better, and more inspiring ways of doing things, because we believe that the world’s greatest ideas started with the question, “What if?”',
      image: 'https://assets.automatik.com/images/values-curiosity.jpg'
    },
    {
      title: 'Teachability',
      headline: 'We believe that the number one ingredient in a life of continuous improvement is a humble and teachable spirit that truly believes there is always a way to get better.',
      image: 'https://assets.automatik.com/images/values-teachability.jpg'
    },
    {
      title: 'Niceness',
      headline: 'We are kind, considerate, agreeable people who frequently set our own agendas aside, surrender our comfort, and bend over backwards to serve our clients and build up our teammates.',
      image: 'https://assets.automatik.com/images/values-niceness.jpg'
    },
    {
      title: 'Can-do Attitude',
      headline: 'We are a unified group of glass-half-full, anything’s possible, no-mountain-high-enough overcomers who delight in the fulfillment that comes from facing adversity—and coming out on top.',
      image: 'https://assets.automatik.com/images/values-can-do-attitude.jpg'
    }
  ];
  hovered = '';
  width: number;
  loading = false;
  error = '';

  constructor() { }

  ngOnInit() {
  }

  toggleHover(id) {
    this.hovered = this.hovered !== id ? id : '';
  }

  setHover(id) {
    if (!document.documentElement.classList.contains('mobile')) {
      if (this.hovered !== id) {
        this.hovered = id;
      }
    }
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}

