import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [ FadeAnimation ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
