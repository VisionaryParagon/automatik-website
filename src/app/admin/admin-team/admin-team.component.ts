import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminTeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
