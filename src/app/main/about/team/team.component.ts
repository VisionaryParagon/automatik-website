import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Department, Image, Teammate } from '../../../services/classes';
import { ImageService } from '../../../services/image.service';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TeamBioAnimation } from '../../../animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [ FadeAnimation, TeamBioAnimation ]
})
export class TeamComponent implements OnInit {
  teammates: Teammate[] = this.teamService.team;
  departments: Department[] = this.teamService.departments;
  images: Image[] = this.imageService.images;
  teamHeight = 'auto';
  bottomMargin = '0px';
  selected: Teammate;
  teamLoaded = false;
  deptsLoaded = false;
  imagesLoaded = false;
  loading = true;
  error = '';

  @ViewChild('teamBox') teamBox: ElementRef;
  @ViewChild('bioBox') bioBox: ElementRef;

  constructor(
    private imageService: ImageService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    if (this.teammates) {
      this.setTeam(this.teammates);
    } else {
      this.getTeam();
    }

    if (this.departments) {
      this.setDepartments(this.departments);
    } else {
      this.getDepartments();
    }

    if (this.images) {
      this.setImages(this.images);
    } else {
      this.getImages();
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
    this.teammates = this.teamSort(data);
    this.teamLoaded = true;
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
    this.deptsLoaded = true;
    this.checkData();
  }

  getDepartmentRank(id) {
    if (this.departments) {
      return this.departments.filter(dept => dept._id === id)[0].rank;
    }
  }

  teamSort(team) {
    team.sort((a, b) => {
      if (this.getDepartmentRank(a.department) < this.getDepartmentRank(b.department)) {
        return -1;
      }
      if (this.getDepartmentRank(a.department) > this.getDepartmentRank(b.department)) {
        return 1;
      }
      if (a.seniority < b.seniority) {
        return -1;
      }
      if (a.seniority > b.seniority) {
        return 1;
      }
      return 0;
    });

    return team;
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
    this.imagesLoaded = true;
    this.checkData();
  }

  checkData() {
    if (this.teamLoaded && this.deptsLoaded && this.imagesLoaded) {
      this.loading = false;
    }
  }

  openTeammate(data) {
    const teamHeight = this.teamBox.nativeElement.offsetHeight;
    this.teamHeight = teamHeight + 'px';

    this.selected = data;

    setTimeout(() => {
      const bioHeight = this.bioBox.nativeElement.offsetHeight;
      if (bioHeight > teamHeight) {
        this.bottomMargin = bioHeight - teamHeight + 'px';
      }
    }, 50);
  }

  closeTeammate() {
    this.selected = null;
    this.bottomMargin = '0px';
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
