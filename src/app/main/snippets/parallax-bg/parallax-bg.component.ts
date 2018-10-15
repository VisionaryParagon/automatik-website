import { Component, ElementRef, HostListener, Input, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'parallax-bg',
  templateUrl: './parallax-bg.component.html',
  styleUrls: ['./parallax-bg.component.css']
})
export class ParallaxBgComponent implements OnInit {
  @Input('images') images;
  image: string;
  center: number;
  imgHeight = 'auto';
  imgWidth = '100%';
  top = '50%';

  @ViewChild('parallax') parallax: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.center = this.parallax.nativeElement.offsetHeight / 2;
    this.top = this.center + 'px';

    this.checkBanner();
  }

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    if (isPlatformBrowser(this.platformId)) {
      let y = 0;
      let el = this.parallax.nativeElement;

      while (el) {
        y += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
      }

      this.top = this.center + ((window.scrollY - y) * 0.75) + 'px';
    }
  }
  @HostListener('window:resize', ['$event']) onResize(ev) {
    this.checkBanner();
  }

  checkBanner() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth >= 1200) {
        this.image = this.images.lg;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        this.image = this.images.md;
      } else {
        this.image = this.images.sm;
      }

      if (window.innerWidth * 0.565 < window.innerHeight) {
        this.imgHeight = '120%';
        this.imgWidth = 'auto';
      } else {
        this.imgHeight = 'auto';
        this.imgWidth = '100%';
      }
    }
  }
}
