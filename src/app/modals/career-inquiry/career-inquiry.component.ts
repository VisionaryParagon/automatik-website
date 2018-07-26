import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CareerInquiry } from '../../services/classes';
import { CareersService } from '../../services/careers.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

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
  error = false;

  constructor(
    private careersService: CareersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.inquiry.position = this.data.position;
    this.isGeneral = this.data.position === 'General Career Inquiry' ? true : false;
  }

  openForm() {
    this.formOpened = true;
  }

  submit(info, valid) {
    this.submitted = true;

    if (valid) {
      this.loading = true;
      this.careersService.inquire(info)
        .subscribe(
          data => {
            this.success = true;
            this.loading = false;
          },
          error => this.setError(error)
        );
    }

    return false;
  }

  setError(err) {
    this.error = true;
    console.error(err);
    this.loading = false;
  }
}

