import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ValuesComponent implements OnInit {
  values = [
    {
      title: 'People First',
      headline: 'Our highest priority is honoring, encouraging, and developing the people we work with and for, because we believe that people—not money, not things, not ideas—can change the world.',
      image: 'https://images.unsplash.com/photo-1525856326341-8adeed4c8b8b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=664eca9d03a5be8e34786a5222862411&auto=format&fit=crop&w=1665&q=80'
    },
    {
      title: 'Excellence',
      headline: 'We revolt against mediocrity, commonplace, and average with everything in us, even when it hurts, because we believe greatness is the “magic” that makes people believe anything is possible.',
      image: 'https://images.unsplash.com/photo-1532685274648-71618a3b66c7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=734f6b7bf414b4b7f84cbe570ba8fdbe&auto=format&fit=crop&w=1630&q=80'
    },
    {
      title: 'Loyalty',
      headline: 'Because we value deep relationships over “the next best thing,” we are committed to investing in the kind of rewarding loyalty that can only come from consistent service and sacrifice over time.',
      image: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d812e1079e635c6fb59ded315f72316f&auto=format&fit=crop&w=934&q=80'
    },
    {
      title: 'Integrity',
      headline: 'Since the “high road” is the only road where everyone wins, it’s the only one we’re ever willing to travel—no matter the pressure, no matter the circumstance, no matter the cost.',
      image: 'https://images.unsplash.com/photo-1465855127502-7a9d0a103271?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e564559520b6662fadfc3c0b646aba9&auto=format&fit=crop&w=1650&q=80'
    },
    {
      title: 'Curiosity',
      headline: 'We tenaciously pursue smarter, better, and more inspiring ways of doing things, because we believe that the world’s greatest ideas started with the question, “What if?”',
      image: 'https://images.unsplash.com/photo-1507197974251-6548cdf8efee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2850781017bb255dcb1e281fa44b9363&auto=format&fit=crop&w=1650&q=80'
    },
    {
      title: 'Teachability',
      headline: 'We believe that the number one ingredient in a life of continuous improvement is a humble and teachable spirit that truly believes there is always a way to get better.',
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=86c090f47b65d8de1b34f447c5d929e8&auto=format&fit=crop&w=1656&q=80'
    },
    {
      title: 'Niceness',
      headline: 'We are kind, considerate, agreeable people who frequently set our own agendas aside, surrender our comfort, and bend over backwards to serve our clients and build up our teammates.',
      image: 'https://images.unsplash.com/photo-1451471016731-e963a8588be8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2da73700e95907cf25d606819826b6e5&auto=format&fit=crop&w=1652&q=80'
    },
    {
      title: 'Can-do Attitude',
      headline: 'We are a unified group of glass-half-full, anything’s possible, no-mountain-high-enough overcomers who delight in the fulfillment that comes from facing adversity—and coming out on top.',
      image: 'https://images.unsplash.com/photo-1523325343676-4136d25d013b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=13b1c738aab8ed9cc3ddf9b905ea0e71&auto=format&fit=crop&w=1650&q=80'
    }
  ];
  hovered = '';
  loading = false;
  error = '';

  @ViewChild('tileBox') tileBox: ElementRef;
  @ViewChildren('tiles') tiles: QueryList<ElementRef>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.setTilePosition();
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    this.setTilePosition();
  }

  setTilePosition() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (window.outerWidth >= 1200) {
          if (this.tiles.length) {
            this.tiles.forEach((el, idx) => {
              const x = idx % 4;
              const y = Math.floor(idx / 4.0);
              const height = el.nativeElement.getBoundingClientRect().height;
              const width = el.nativeElement.getBoundingClientRect().width;

              el.nativeElement.style.left = x * width + 'px';
              el.nativeElement.style.top = y * height + 'px';
            });

            this.tileBox.nativeElement.style.height = this.tiles.first.nativeElement.getBoundingClientRect().height * Math.ceil(this.tiles.length / 4.0) + 'px';
          } else {
            if (document.documentElement.classList.contains('mobile')) {
              this.tileBox.nativeElement.style.height = window.innerHeight - 50 + 'px';
            } else {
              this.tileBox.nativeElement.style.height = window.innerHeight - 60 + 'px';
            }
          }
        } else if (window.outerWidth >= 768 && window.outerWidth < 1200) {
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

  toggleHover(id, e) {
    if (this.hovered !== id) {
      this.hovered = id;
    } else {
      this.hovered = '';
    }

    e.preventDefault();
  }

  setHover(id) {
    if (this.hovered !== id) {
      this.hovered = id;
    }
  }

  setError(err) {
    this.error = err;
    console.error(err);
  }
}

