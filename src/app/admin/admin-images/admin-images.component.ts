import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrls: ['./admin-images.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminImagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
