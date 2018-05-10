import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [ FadeAnimation ]
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
