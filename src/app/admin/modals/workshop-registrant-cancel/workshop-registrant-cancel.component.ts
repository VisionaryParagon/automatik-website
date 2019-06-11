import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { WorkshopRegistration } from '../../../services/classes';
import { WorkshopsService } from '../../../services/workshops.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-workshop-registrant-cancel',
  templateUrl: './workshop-registrant-cancel.component.html',
  styleUrls: ['./workshop-registrant-cancel.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class WorkshopRegistrantCancelComponent implements OnInit {
  registrant: WorkshopRegistration = new WorkshopRegistration();
  anyVal: any;
  submitted = false;
  loading = false;
  success = false;
  sendRefund = true;
  refundAmount = 0;
  refundReason: 'duplicate'|'fraudulent'|'requested_by_customer';
  error = '';

  constructor(
    private workshopsService: WorkshopsService,
    @Inject(MAT_DIALOG_DATA) public data: WorkshopRegistration
  ) { }

  ngOnInit() {
    this.registrant = {...this.data};
    this.refundAmount = this.registrant.price;
  }

  updateRegistrant(registrant) {
    this.workshopsService.updateRegistrant(registrant)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.setError(err)
      );
  }

  submit(isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (this.registrant.charge_id && this.registrant.pmt_status === 'Paid' && this.sendRefund) {
        this.workshopsService.processRefund({
          charge_id: this.registrant.charge_id,
          price: this.refundAmount,
          reason: this.refundReason
        })
          .subscribe(
            res => {
              this.registrant.refund_id = res.id;
              this.registrant.price -= this.refundAmount;
              this.registrant.reg_status = 'Canceled';
              this.registrant.pmt_status = 'Refunded';
              this.updateRegistrant(this.registrant);
            },
            err => this.setError('There was an issue processing the refund')
          );
      } else {
        this.registrant.reg_status = 'Canceled';
        this.updateRegistrant(this.registrant);
      }
    }

    return false;
  }

  hideError() {
    this.error = '';
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }
}
