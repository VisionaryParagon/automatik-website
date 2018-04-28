import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  animations: [ FadeAnimation ]
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
