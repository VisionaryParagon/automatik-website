import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CareerPosition } from '../../../services/classes';

import { FadeAnimation } from '../../../animations';

import { CareerInquiryComponent } from '../../modals/career-inquiry/career-inquiry.component';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
  animations: [ FadeAnimation ]
})
export class CareersComponent implements OnInit {
  careerData: CareerPosition = new CareerPosition();

  constructor(
    private modalService: MatDialog
  ) { }

  ngOnInit() {
  }

  openForm(position) {
    this.careerData.position = position;

    const modal = this.modalService.open(CareerInquiryComponent, {
      data: this.careerData,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '80%'
    });
    modal.afterClosed().subscribe(result => {
    });
  }
}
