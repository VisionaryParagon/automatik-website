import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { WorkshopRegistration } from '../../../services/classes';
import { WorkshopsService } from '../../../services/workshops.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-workshop-registrant-refund',
  templateUrl: './workshop-registrant-refund.component.html',
  styleUrls: ['./workshop-registrant-refund.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class WorkshopRegistrantRefundComponent implements OnInit {
  registrant: WorkshopRegistration = new WorkshopRegistration();
  anyVal: any;
  submitted = false;
  loading = false;
  success = false;
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

  submit(isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      this.workshopsService.processRefund({
        charge_id: this.registrant.charge_id,
        price: this.refundAmount,
        reason: this.refundReason
      })
        .subscribe(
          refRes => {
            this.registrant.refund_id = refRes.id;
            this.registrant.price -= this.refundAmount;
            this.registrant.pmt_status = this.registrant.price === 0 ? 'Refunded' : 'Partially Refunded';

            this.workshopsService.updateRegistrant(this.registrant)
            .subscribe(
              regRes => {
                this.success = true;
                this.loading = false;
              },
              err => this.setError(err)
            );
          },
          err => this.setError('There was an issue processing the refund')
        );
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
