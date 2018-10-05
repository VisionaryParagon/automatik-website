import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Contact } from '../../../services/classes';
import { ContactService } from '../../../services/contact.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ContactComponent implements OnInit {
  contact: Contact = new Contact();
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
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
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
          data => {
            this.success = true;
            this.loading = false;
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
