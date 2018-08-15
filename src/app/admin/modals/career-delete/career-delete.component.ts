import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CareerPosition } from '../../../services/classes';
import { CareersService } from '../../../services/careers.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-career-delete',
  templateUrl: './career-delete.component.html',
  styleUrls: ['./career-delete.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class CareerDeleteComponent implements OnInit {
  career: CareerPosition = new CareerPosition();
  loading = false;
  success = false;
  error = '';

  constructor(
    private careersService: CareersService,
    @Inject(MAT_DIALOG_DATA) public data: CareerPosition
  ) { }

  ngOnInit() {
    if (this.data) {
      this.career = this.data;
    }
  }

  delete() {
    this.loading = true;
    this.careersService.deletePosition(this.career)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.setError(err)
      );
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
