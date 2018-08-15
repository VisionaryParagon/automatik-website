import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CareerInquiry, CareerPosition } from '../../../services/classes';
import { CareersService } from '../../../services/careers.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-career-inquiry',
  templateUrl: './career-inquiry.component.html',
  styleUrls: ['./career-inquiry.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class CareerInquiryComponent implements OnInit {
  inquiry: CareerInquiry = new CareerInquiry();
  anyVal: any;
  isGeneral = false;
  formOpened = false;
  loading = false;
  submitted = false;
  success = false;
  error = '';

  constructor(
    private careersService: CareersService,
    @Inject(MAT_DIALOG_DATA) public data: CareerPosition
  ) { }

  ngOnInit() {
    this.inquiry.position = this.data.position;
    this.isGeneral = this.data.position === 'General Career Inquiry' ? true : false;
  }

  openForm() {
    this.formOpened = true;
  }

  submit(info, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;
      this.careersService.inquire(info)
        .subscribe(
          data => {
            this.success = true;
            this.loading = false;
          },
          err => this.setError(err)
        );
    }

    return false;
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}

