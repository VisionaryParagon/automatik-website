import { Component, ElementRef, HostListener, Input, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Department, Image, Teammate } from '../../../services/classes';

import { FadeAnimation, TeamBioAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [ FadeAnimation, TeamBioAnimation, TopDownAnimation ]
})
export class TeamComponent implements OnInit {
  @Input('teammates') teammates: Teammate[];
  @Input('departments') departments: Department[];
  @Input('images') images: Image[];
  teamHeight = 'auto';
  bottomMargin = '0px';
  selected: Teammate;
  changingTeammate = false;

  @ViewChild('teamBox') teamBox: ElementRef;
  @ViewChild('bioBox') bioBox: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event']) onResize(ev) {
    if (this.bioBox) {
      this.setBio();
    }
  }
  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    if (this.bioBox && isPlatformBrowser(this.platformId)) {
      if (window.scrollY > document.getElementById('team').offsetTop + this.bioBox.nativeElement.offsetHeight) {
        this.closeTeammate();
      }
    }
  }

  setBio() {
    const teamHeight = this.teamBox.nativeElement.offsetHeight;
    this.teamHeight = teamHeight + 'px';

    setTimeout(() => {
      const bioHeight = this.bioBox.nativeElement.offsetHeight;
      if (bioHeight > teamHeight) {
        this.bottomMargin = bioHeight - teamHeight + 'px';
      }
    }, 50);
  }

  setScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const moz = /Firefox/.test(navigator.userAgent);
      const ms = /Edge|Trident/.test(navigator.userAgent);
      const el = document.getElementById('team');

      if (window.scrollY > el.offsetTop) {
        if (ms) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (moz) {
          setTimeout(() => {
            window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' });
          }, 50);
        } else {
          window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' });
        }
      }
    }
  }

  openTeammate(data) {
    this.selected = data;
    this.setBio();
    this.setScroll();
  }

  prevTeammate() {
    this.changingTeammate = true;
    const idx = this.teammates.findIndex(i => i._id === this.selected._id);

    setTimeout(() => {
      if (idx === 0) {
        this.selected = this.teammates[this.teammates.length - 1];
      } else {
        this.selected = this.teammates[idx - 1];
      }

      this.setBio();
      this.setScroll();
      this.changingTeammate = false;
    }, 500);
  }

  nextTeammate() {
    this.changingTeammate = true;
    const idx = this.teammates.findIndex(i => i._id === this.selected._id);

    setTimeout(() => {
      if (idx === this.teammates.length - 1) {
        this.selected = this.teammates[0];
      } else {
        this.selected = this.teammates[idx + 1];
      }

      this.setBio();
      this.setScroll();
      this.changingTeammate = false;
    }, 500);
  }

  closeTeammate() {
    this.selected = null;
    this.bottomMargin = '0px';
  }
}
