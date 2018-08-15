import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CareerPosition } from '../../../services/classes';
import { CareersService } from '../../../services/careers.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class CareerFormComponent implements OnInit {
  career: CareerPosition = new CareerPosition();
  new = true;
  loading = false;
  submitted = false;
  success = false;
  error = '';

  constructor(
    private careersService: CareersService,
    @Inject(MAT_DIALOG_DATA) public data: CareerPosition
  ) { }

  ngOnInit() {
    if (this.data) {
      this.career = this.data;
      this.new = false;
    }
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (this.new) {
        this.careersService.createPosition(this.career)
          .subscribe(
            res => {
              this.success = true;
              this.loading = false;
            },
            err => this.setError('New career error: ' + err)
          );
      } else {
        this.careersService.updatePosition(this.career)
          .subscribe(
            res => {
              this.success = true;
              this.loading = false;
            },
            err => this.setError('Update career error: ' + err)
          );
      }
    }
  }

  addAnother() {
    this.career = new CareerPosition();
    this.submitted = false;
    this.success = false;
  }

  editAgain() {
    this.submitted = false;
    this.success = false;
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
