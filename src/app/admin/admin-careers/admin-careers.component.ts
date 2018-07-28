import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-careers',
  templateUrl: './admin-careers.component.html',
  styleUrls: ['./admin-careers.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminCareersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
