import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CareerInquiry } from '../../../services/classes';

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
  loading = false;
  submitted = false;
  success = false;
  error = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.inquiry.position = this.data;
  }

  submit(info, valid) {
    this.submitted = true;

    if (valid) {
      console.log(info);
      this.success = true;
    }

    return false;
  }
}

