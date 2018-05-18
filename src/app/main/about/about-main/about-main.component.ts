import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-about-main',
  templateUrl: './about-main.component.html',
  styleUrls: ['./about-main.component.css'],
  animations: [ FadeAnimation ]
})
export class AboutMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
