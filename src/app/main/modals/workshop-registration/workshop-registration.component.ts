import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Workshop, WorkshopEvent, WorkshopRegistration } from '../../../services/classes';
import { WorkshopsService } from '../../../services/workshops.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-workshop-registration',
  templateUrl: './workshop-registration.component.html',
  styleUrls: ['./workshop-registration.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class WorkshopRegistrationComponent implements AfterViewInit, OnInit, OnDestroy {
  registrant: WorkshopRegistration = new WorkshopRegistration();
  workshops: Workshop[] = this.workshopsService.workshops;
  events: WorkshopEvent[] = this.workshopsService.events;
  event: WorkshopEvent = {...this.data};
  dates: Date[];
  stepId = 0;
  anyVal: any;
  loading = false;
  step1Checked = false;
  step2Checked = false;
  submitted = false;
  success = false;
  error = '';
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  terms = false;

  @ViewChild('workshop') workshop;
  @ViewChild('workshop_date') workshop_date;
  @ViewChild('email') email;
  @ViewChild('first_name') first_name;
  @ViewChild('last_name') last_name;
  @ViewChild('address') address;
  @ViewChild('city') city;
  @ViewChild('state') state;
  @ViewChild('zip') zip;
  @ViewChild('cardInfo') cardInfo: ElementRef;

  constructor(
    private workshopsService: WorkshopsService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: WorkshopEvent,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.setDates(this.event.workshop);
    this.registrant.workshop = this.event.workshop;
    this.registrant.workshop_date = this.event.start_date;
    this.registrant.price = this.event.price;
  }

  ngAfterViewInit() {
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

  onChange({ error }) {
    this.cardError = error ? error.message : null;
    this.hideError();
    this.cd.detectChanges();
  }

  setDates(workshop) {
    this.dates = this.events.filter(c => c.workshop === workshop && new Date(c.start_date) > new Date()).map(d => d.start_date);
    this.registrant.workshop_date = this.anyVal;
  }

  updatePrice(workshop) {
    this.registrant.price = this.events.filter(e => e.workshop === workshop)[0].price;
  }

  updateWorkshop(workshop) {
    this.event = this.events.filter(e => e.workshop === workshop)[0];
    this.setDates(workshop);
    this.updatePrice(workshop);
  }

  scrollTop() {
    if (isPlatformBrowser(this.platformId)) {
      document.querySelector('.dialogScroll').scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  prevStep() {
    this.hideError();
    this.stepId--;
    this.scrollTop();
    if (this.stepId === 0) {
      this.step1Checked = false;
    } else if (this.stepId === 1) {
      this.step2Checked = false;
    }
  }

  nextStep() {
    this.hideError();
    if (this.stepId === 0) {
      this.step1Checked = true;
      if (!this.workshop.errors && !this.workshop_date.errors && !this.email.errors) {
        this.stepId++;
        this.scrollTop();
      } else {
        this.setError('Please fix the errors above to proceed');
      }
    } else if (this.stepId === 1) {
      this.step2Checked = true;
      if (!this.first_name.errors && !this.last_name.errors && !this.address.errors && !this.city.errors && !this.state.errors && !this.zip.errors) {
        this.stepId++;
        this.scrollTop();
      } else {
        this.setError('Please fix the errors above to proceed');
      }
    }
  }

  async submit(isValid) {
    this.submitted = true;

    if (this.terms && isValid) {
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

  hideError() {
    this.error = '';
  }

  setError(err) {
    this.error = err;
    console.error(err);
    this.loading = false;
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
}

