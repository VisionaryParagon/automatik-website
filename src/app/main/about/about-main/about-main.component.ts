import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
  atTop = true;
  topScroll = 0;
  teammates: Teammate[] = this.teamService.team;
  departments: Department[] = this.teamService.departments;
  images: Image[] = this.imageService.images;
  positions: CareerPosition[] = this.careersService.positions;
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

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    this.checkScroll();
  }

  scrollPage() {
    if (isPlatformBrowser(this.platformId)) {
      let scrl = window.innerHeight;
      if (document.documentElement.classList.contains('mobile')) {
        scrl = scrl - 50;
      } else {
        scrl = scrl - 60;
      }
      window.scroll({top: scrl, left: 0, behavior: 'smooth'});
    }
  }

  checkScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.atTop = window.scrollY > 50 ? false : true;
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
        data => this.positions = data,
        err => this.setError(err)
      );
  }

  checkData() {
    if (this.teammates && this.departments && this.images && this.positions) {
      this.loading = false;
    }
  }

  scrollTo(id) {
    if (isPlatformBrowser(this.platformId)) {
      if (id) {
        const el = document.getElementById(id);

        if (el) {
          this.topScroll = el.offsetTop;
        }
      } else {
        this.topScroll = 0;
      }

      // console.log('scroll to', id, 'at', this.topScroll);

      window.scroll({top: this.topScroll, left: 0, behavior: 'smooth'});
    }
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
