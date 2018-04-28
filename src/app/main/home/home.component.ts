import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ FadeAnimation ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
