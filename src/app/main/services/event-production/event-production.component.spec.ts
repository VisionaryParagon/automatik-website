import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProductionComponent } from './event-production.component';

describe('EventProductionComponent', () => {
  let component: EventProductionComponent;
  let fixture: ComponentFixture<EventProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
