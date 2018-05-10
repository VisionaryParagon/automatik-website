import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-resources-main',
  templateUrl: './resources-main.component.html',
  styleUrls: ['./resources-main.component.css'],
  animations: [ FadeAnimation ]
})
export class ResourcesMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
