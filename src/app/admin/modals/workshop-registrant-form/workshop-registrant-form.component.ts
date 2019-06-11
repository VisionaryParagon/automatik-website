import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Workshop, WorkshopEvent, WorkshopRegistration } from '../../../services/classes';
import { WorkshopsService } from '../../../services/workshops.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-workshop-registrant-form',
  templateUrl: './workshop-registrant-form.component.html',
  styleUrls: ['./workshop-registrant-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class WorkshopRegistrantFormComponent implements AfterViewInit, OnInit, OnDestroy {
  registrant: WorkshopRegistration = new WorkshopRegistration();
  workshops: Workshop[] = this.workshopsService.workshops;
  events: WorkshopEvent[] = this.workshopsService.events;
  dates: Date[] = this.events.map(d => d.start_date);
  edit = false;
  anyVal: any;
  submitted = false;
  loading = false;
  success = false;
  invalid = false;
  error = '';
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  resendEmail = false;
  emailSuccess: boolean;

  @ViewChild('workshopRegForm') workshopRegForm: NgForm;
  @ViewChild('cardInfo') cardInfo: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<WorkshopRegistrantFormComponent>,
    private workshopsService: WorkshopsService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: WorkshopRegistration
  ) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick()
      .subscribe(
        res => this.closeDialog()
      );

    if (this.data._id) {
      this.edit = true;
      this.registrant = {...this.data};
      this.setDates(this.registrant.workshop);
    }
  }

  ngAfterViewInit() {
    if (!this.edit) {
      this.card = elements.create('card', {
        hidePostalCode: true,
        style: {
          base: {
            color: '#212529',
            fontFamily: '"Frutiger LT Std", Helvetica, Arial, sans-serif',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '40px',
          },
          invalid: {
            color: '#f00'
          }
        }
      });
      this.card.mount(this.cardInfo.nativeElement);

      this.card.addEventListener('change', this.cardHandler);
    }
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.closeDialog();
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    if (this.workshopRegForm.dirty && !this.success) {
      event.returnValue = false;
    }
  }

  onChange({ error }) {
    this.cardError = error ? error.message : null;
    this.hideError();
    this.cd.detectChanges();
  }

  setDates(workshop) {
    this.dates = this.events.filter(c => c.workshop === workshop).map(d => d.start_date);
    if (!this.edit) {
      this.dates = this.dates.filter(d => new Date(d) > new Date());
    } else {
      this.registrant.workshop_date = new Date(this.registrant.workshop_date);
    }
  }

  updatePrice(workshop) {
    this.registrant.price = this.events.filter(e => e.workshop === workshop)[0].price;
  }

  updateWorkshop(workshop) {
    this.setDates(workshop);
    this.updatePrice(workshop);
    this.registrant.workshop_date = this.anyVal;
  }

  async submit(isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      const { token, error } = await stripe.createToken(this.card, {
        name: `${this.registrant.first_name} ${this.registrant.last_name}`,
        address_line1: this.registrant.address,
        address_line2: this.registrant.address_2,
        address_city: this.registrant.city,
        address_state: this.registrant.state,
        address_zip: this.registrant.zip
      });

      if (!error) {
        this.workshopsService.processPayment({ registrant: this.registrant, token: token })
          .subscribe(
            pmtRes => {
              this.registrant.charge_id = pmtRes.id;
              this.registrant.pmt_status = 'Paid';
              this.registrant.reg_status = 'Registered';

              this.workshopsService.createRegistrant(this.registrant)
                .subscribe(
                  regRes => {
                    this.workshopsService.confirmation(regRes)
                      .subscribe(
                        emlRes => {
                          this.success = true;
                          this.emailSuccess = true;
                          this.loading = false;
                        },
                        err => this.setError(err)
                      );
                  },
                  err => this.setError(err)
                );
            },
            err => this.setError('Payment error: ' + err)
          );
      } else {
        this.setError('Please fix the error(s) above');
      }
    }

    return false;
  }

  update(isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      this.workshopsService.updateRegistrant(this.registrant)
        .subscribe(
          regRes => {
            if (this.resendEmail) {
              this.workshopsService.updateConfirmation(regRes)
                .subscribe(
                  emlRes => {
                    this.emailSuccess = true;
                    this.success = true;
                    this.loading = false;
                  },
                  err => {
                    this.emailSuccess = false;
                    this.success = true;
                    this.loading = false;
                  }
                );
            } else {
              this.success = true;
              this.loading = false;
            }
          },
          err => this.setError(err)
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

  closeDialog() {
    if (this.workshopRegForm.dirty && !this.success) {
      if (confirm('These changes haven’t been submitted yet. Are you sure you want to leave?')) {
        this.dialogRef.close(this.registrant);
      }
    } else {
      this.dialogRef.close(this.registrant);
    }
  }

  ngOnDestroy() {
    if (this.card) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }
}
