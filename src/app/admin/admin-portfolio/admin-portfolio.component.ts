import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-portfolio',
  templateUrl: './admin-portfolio.component.html',
  styleUrls: ['./admin-portfolio.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminPortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
