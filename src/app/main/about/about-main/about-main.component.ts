import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CareerPosition, Department, Image, Teammate } from '../../../services/classes';
import { CareersService } from '../../../services/careers.service';
import { ImageService } from '../../../services/image.service';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-about-main',
  templateUrl: './about-main.component.html',
  styleUrls: ['./about-main.component.css'],
  animations: [ FadeAnimation ]
})
export class AboutMainComponent implements AfterViewInit, OnInit {
  teammates: Teammate[] = this.teamService.team;
  departments: Department[] = this.teamService.departments;
  images: Image[] = this.imageService.images;
  positions: CareerPosition[] = this.careersService.positions;
  heroImages = {
    main: {
      sm: 'https://assets.automatik9dots.com/images/about-hero-bg-900.jpg',
      md: 'https://assets.automatik9dots.com/images/about-hero-bg-1440.jpg',
      lg: 'https://assets.automatik9dots.com/images/about-hero-bg-2560.jpg'
    },
    history: {
      sm: 'https://assets.automatik9dots.com/images/about-history-bg-900.jpg',
      md: 'https://assets.automatik9dots.com/images/about-history-bg-1440.jpg',
      lg: 'https://assets.automatik9dots.com/images/about-history-bg-2560.jpg'
    }
  };
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private careersService: CareersService,
    private imageService: ImageService,
    private teamService: TeamService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (!this.teammates) {
      this.getTeam();
    } else {
      this.checkData();
    }

    if (!this.departments) {
      this.getDepartments();
    } else {
      this.checkData();
    }

    if (!this.images) {
      this.getImages();
    } else {
      this.checkData();
    }

    if (!this.positions) {
      this.getPositions();
    } else {
      this.checkData();
    }
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => this.scrollTo(fragment));
  }

  scrollTo(id) {
    if (isPlatformBrowser(this.platformId)) {
      const moz = /Firefox/.test(navigator.userAgent);
      const ms = /Edge|Trident/.test(navigator.userAgent);

      if (id) {
        const el = document.getElementById(id);

        if (ms) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (moz) {
          setTimeout(() => {
            window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' });
          }, 50);
        } else {
          window.scroll({ top: el.offsetTop, left: 0, behavior: 'smooth' });
        }
      } else {
        if (moz) {
          setTimeout(() => {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          }, 50);
        }
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  }

  getTeam() {
    this.teamService.getTeammates()
      .subscribe(
        res => this.setTeam(res),
        err => this.setError('Could not get team: ' + err)
      );
  }

  setTeam(data) {
    this.teammates = data;
    this.checkData();
  }

  getDepartments() {
    this.teamService.getDepartments()
      .subscribe(
        res => this.setDepartments(res),
        err => this.setError('Could not get departments: ' + err)
      );
  }

  setDepartments(data) {
    this.departments = data;
    this.checkData();
  }

  getImages() {
    this.imageService.getImages()
      .subscribe(
        res => this.setImages(res),
        err => this.setError('Could not get images: ' + err)
      );
  }

  setImages(data) {
    this.images = data;
    this.checkData();
  }

  getPositions() {
    this.careersService.getPositions()
      .subscribe(
        data => this.setPositions(data),
        err => this.setError('Could not get positions: ' + err)
      );
  }

  setPositions(data) {
    this.positions = data;
    this.checkData();
  }

  checkData() {
    if (this.teammates && this.departments && this.images && this.positions) {
      this.loading = false;
    }
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
