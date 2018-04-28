import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  animations: [ FadeAnimation ]
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
