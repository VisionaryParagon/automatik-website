import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Department, Teammate } from '../../../services/classes';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TeamBioAnimation } from '../../../animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [ FadeAnimation, TeamBioAnimation ]
})
export class TeamComponent implements OnInit {
  @ViewChild('teamBox') teamBox: ElementRef;
  @ViewChild('bioBox') bioBox: ElementRef;
  teamHeight = 'auto';
  newHeight = 'auto';
  teammates: Teammate[];
  teammate: Teammate = new Teammate();
  selected: Teammate;
  departments: Department[];
  anyVal: any;
  submitted = false;
  loading = false;
  error = false;

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.getDepartments()
      .subscribe(
        depts => {
          this.departments = depts;

          this.teamService.getTeammates()
            .subscribe(
              team => {
                this.teammates = this.teamSort(team);
                setTimeout(() => {
                  this.teamHeight = this.teamBox.nativeElement.offsetHeight + 'px';
                  this.newHeight = this.teamHeight;
                }, 50);
              },
              error => this.setError(error)
            );
        },
        error => this.setError(error)
      );
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

  openTeammate(data) {
    this.selected = data;
    setTimeout(() => {
      const bioHeight = this.bioBox.nativeElement.offsetHeight;
      const teamHeight = this.teamBox.nativeElement.offsetHeight;
      if (bioHeight > teamHeight) {
        this.newHeight = bioHeight + 'px';
      }
    }, 50);
  }

  closeTeammate() {
    this.selected = null;
    this.newHeight = this.teamHeight;
  }

  getDepartmentRank(id) {
    if (this.departments) {
      return this.departments.filter(dept => dept._id === id)[0].rank;
    }
  }

  submit(info, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;
      this.teamService.createTeammate(info)
        .subscribe(
          data => {
            this.teammate = new Teammate();
            this.submitted = false;
            this.loading = false;
          },
          error => this.setError(error)
        );
    }
  }

  setError(err) {
    this.error = true;
    console.error(err);
    this.loading = false;
  }

  log(data) {
    console.log(data);
  }
}
