import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class WorkshopsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
