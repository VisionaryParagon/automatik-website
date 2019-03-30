import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Workshop, WorkshopEvent, Location } from '../../../../services/classes';
import { WorkshopsService } from '../../../../services/workshops.service';

import { ScrollArrowComponent } from '../../../snippets/scroll-arrow/scroll-arrow.component';

import { FadeAnimation, TopDownAnimation } from '../../../../animations';

import { WorkshopRegistrationComponent } from '../../../modals/workshop-registration/workshop-registration.component';

@Component({
  selector: 'app-workshops-main',
  templateUrl: './workshops-main.component.html',
  styleUrls: ['./workshops-main.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ],
  providers: [ ScrollArrowComponent ]
})
export class WorkshopsMainComponent implements OnInit {
  heroImages = {
    sm: 'https://assets.automatik.com/images/home-presentaion-hero-bg-900.jpg',
    md: 'https://assets.automatik.com/images/home-presentaion-hero-bg-1440.jpg',
    lg: 'https://assets.automatik.com/images/home-presentaion-hero-bg-2560.jpg'
  };
  workshops: Workshop[] = this.workshopsService.workshops;
  events: WorkshopEvent[] = this.workshopsService.events;
  filteredEvents: WorkshopEvent[];
  selectedEvent: number;
  locations: Location[];
  anyVal: any;
  filter: string;
  filters = {
    workshop: this.anyVal,
    date: this.anyVal,
    location: this.anyVal
  };

  constructor(
    private workshopsService: WorkshopsService,
    private modalService: MatDialog
  ) { }

  ngOnInit() {
    this.setWorkshops();
    this.setEvents();
  }

  setWorkshops() {
    if (!this.workshops) {
      this.workshops = this.workshopsService.getWorkshops();
    }
  }

  setEvents() {
    if (!this.events) {
      this.events = this.workshopsService.getWorkshopEvents();
    }
    this.filteredEvents = [...this.events];
    this.setLocations();
  }

  setLocations() {
    this.locations = this.events.map(c => c.location).filter((loc, idx, self) =>
      idx === self.findIndex(l => l.city === loc.city && l.state === loc.state)
    ).sort((a, b) => {
      return a.city < b.city ? -1 : a.city > b.city ? 1 : 0;
    });
  }

  changeFilter(ev) {
    this.filter = ev;
    Object.keys(this.filters).forEach(f => this.filters[f] = this.anyVal);
    this.filteredEvents = [...this.events];
  }

  filterByWorkshop(ev) {
    this.filteredEvents = this.events.filter(c => c.workshop === ev);
  }

  filterByDate(ev) {
    this.filteredEvents = this.events.filter(c =>
      new Date(c.start_date).getMonth() === new Date(ev).getMonth() &&
      new Date(c.start_date).getDate() === new Date(ev).getDate()
    );
  }

  filterByLocation(ev) {
    this.filteredEvents = this.events.filter(c => c.location.city === ev);
  }

  resetFilters() {
    this.filter = this.anyVal;
    Object.keys(this.filters).forEach(f => this.filters[f] = this.anyVal);
    this.filteredEvents = [...this.events];
  }

  getColor(workshop) {
    return this.workshops.filter(w => w.title === workshop)[0].color;
  }

  getDesc(workshop) {
    return this.workshops.filter(w => w.title === workshop)[0].description;
  }

  getSlug(workshop) {
    return this.workshops.filter(w => w.title === workshop)[0].slug;
  }

  toggleEvent(idx, target) {
    if (target.className.indexOf('autoBtn') === -1) {
      this.selectedEvent = this.selectedEvent !== idx ? idx : null;
    }
  }

  register(event) {
    const modal = this.modalService.open(WorkshopRegistrationComponent, {
      data: event,
      maxHeight: '90%',
      maxWidth: '768px',
      width: '90%'
    });
    modal.afterClosed()
      .subscribe(
        result => {},
        error => {}
      );
  }
}
