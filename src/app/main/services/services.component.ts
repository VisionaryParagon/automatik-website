import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  animations: [ FadeAnimation ]
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
