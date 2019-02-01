import { AfterContentInit, Component, ElementRef, HostListener, Input, Inject, OnChanges, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export class ParallaxImages {
  sm: string;
  md: string;
  lg: string;
}

@Component({
  selector: 'parallax-bg',
  templateUrl: './parallax-bg.component.html',
  styleUrls: ['./parallax-bg.component.scss']
})
export class ParallaxBgComponent implements AfterContentInit, OnChanges, OnInit {
  @Input() images: ParallaxImages = new ParallaxImages();
  image: string;
  top: number;
  height: number;
  width: number;
  windowHeight = 0;
  windowHeightExtra = 0;
  speed = 4;

  @ViewChild('parallax') parallax: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.width = window.innerWidth;
    }
  }

  ngOnChanges() {
    this.getContainer();
  }

  ngAfterContentInit() {
    this.getContainer();
  }

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    if (isPlatformBrowser(this.platformId)) {
      let el = this.parallax.nativeElement;

      while (el) {
        if (el.tagName === 'SECTION') {
          const container = el.getBoundingClientRect();

          if (container.top + container.height >= 0 && container.top <= this.windowHeight) {
            this.setParallax(container, this.speed);
          }
          return;
        }
        el = el.offsetParent;
      }
    }
  }
  @HostListener('window:resize', ['$event']) onResize(ev) {
    const mobile = /Mobi/.test(navigator.userAgent);
    const w = window.innerWidth;

    if (!mobile || w !== this.width) {
      this.getContainer();
      this.width = w;
    }
  }

  getContainer() {
    if (isPlatformBrowser(this.platformId)) {
      const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const mobile = /Mobi/.test(navigator.userAgent);
      let el = this.parallax.nativeElement;
      this.windowHeight = window.innerHeight;

      if (safari && !mobile) {
        this.windowHeightExtra = window.outerHeight - window.innerHeight;
      }

      if (mobile) {
        this.windowHeight = window.screen.availHeight;
        this.windowHeightExtra = (window.screen.availHeight - window.innerHeight) / 2;
      }

      if (window.innerWidth >= 1200) {
        this.image = this.images.lg;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        this.image = this.images.md;
      } else {
        this.image = this.images.sm;
      }

      while (el) {
        if (el.tagName === 'SECTION') {
          const container = el.getBoundingClientRect();
          const elemOffsetTop = (this.windowHeight - container.height) / 2;
          const bgHeight = container.height + (elemOffsetTop - elemOffsetTop / this.speed) * 1.5;

          this.parallax.nativeElement.style.height = container.height + 'px';
          this.height = bgHeight + this.windowHeightExtra * 2;
          this.setParallax(container, this.speed);
          return;
        }
        el = el.offsetParent;
      }
    }
  }

  setParallax(container, speed) {
    const bgScroll = container.top / speed - this.windowHeightExtra;
    this.top = bgScroll;
  }
}
