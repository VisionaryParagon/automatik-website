import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('teamBox') teamBox: ElementRef;
  @ViewChild('bioBox') bioBox: ElementRef;

  constructor() { }

  ngOnInit() {
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
}
