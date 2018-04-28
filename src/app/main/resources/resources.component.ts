import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
  animations: [ FadeAnimation ]
})
export class ResourcesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
