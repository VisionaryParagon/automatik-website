import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CareerPosition } from '../../../services/classes';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { CareerInquiryComponent } from '../../modals/career-inquiry/career-inquiry.component';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class CareersComponent implements OnInit {
  @Input('positions') positions: CareerPosition[];
  inquiry: CareerPosition = new CareerPosition();

  constructor(
    private modalService: MatDialog
  ) { }

  ngOnInit() {
  }

  inquire(position?) {
    if (position) {
      this.inquiry = {...position};
    } else {
      this.inquiry = new CareerPosition();
      this.inquiry.position = 'General Career Inquiry';
    }

    const modal = this.modalService.open(CareerInquiryComponent, {
      data: this.inquiry,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed()
      .subscribe(
        result => {},
        error => {}
      );
  }
}
