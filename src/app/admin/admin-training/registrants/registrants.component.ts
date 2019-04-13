import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-registrants',
  templateUrl: './registrants.component.html',
  styleUrls: ['./registrants.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class RegistrantsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
