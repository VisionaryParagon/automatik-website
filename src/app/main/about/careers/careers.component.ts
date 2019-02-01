import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CareerPosition } from '../../../services/classes';
import { CareersService } from '../../../services/careers.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { CareerInquiryComponent } from '../../modals/career-inquiry/career-inquiry.component';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class CareersComponent implements OnInit {
  positions: CareerPosition[] = this.careersService.positions;
  inquiry: CareerPosition = new CareerPosition();
  error = '';

  constructor(
    private careersService: CareersService,
    private modalService: MatDialog
  ) { }

  ngOnInit() {
    if (!this.positions) {
      this.careersService.getPositions()
        .subscribe(
          res => this.positions = res,
          err => this.setError('Could not get positions: ' + err)
        );
    }
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

  setError(err) {
    this.error = err;
    console.error(err);
  }
}
