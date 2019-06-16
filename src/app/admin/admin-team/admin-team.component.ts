import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { TeamDataComponent } from './team-data/team-data.component';
import { DepartmentDataComponent } from './department-data/department-data.component';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminTeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
