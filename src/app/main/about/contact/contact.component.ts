import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Contact, Subscriber } from '../../../services/classes';
import { ContactService } from '../../../services/contact.service';
import { SubscriberService } from '../../../services/subscriber.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ContactComponent implements OnInit {
  contact: Contact = new Contact();
  subscriber: Subscriber = new Subscriber();
  submitted = false;
  loading = false;
  success = false;
  error = '';

  // map
  centerLat = 39.8283;
  centerLng = -98.5795;
  lat = 33.41659;
  lng = -112.006583;

  constructor(
    private contactService: ContactService,
    private subscriberService: SubscriberService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.contact.optin = true;
  }

  isBrowser() {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    }
    return false;
  }

  submit(info, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;
      this.contactService.sendMessage(info)
        .subscribe(
          res => {
            this.success = true;
            this.loading = false;

            // Subscribe contact
            this.subscriber.name = info.name;
            this.subscriber.email_address = info.email;
            this.subscriber.timestamp_signup = new Date();
            if (info.optin) {
              this.subscriber.status = 'subscribed';
            } else {
              this.subscriber.status = 'unsubscribed';
            }

            this.subscriberService.createSubscriber(this.subscriber)
              .subscribe(
                resSub => {
                  if (info.optin) {
                    this.subscriberService.sendConfirmation(resSub)
                      .subscribe(
                        resConf => console.log('Subscribed successfully'),
                        err => console.log('subscribe failed')
                      );
                  }
                },
                err => console.log('subscriber error')
              );
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
