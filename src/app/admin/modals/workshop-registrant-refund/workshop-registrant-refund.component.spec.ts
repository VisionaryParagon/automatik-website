import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRegistrantRefundComponent } from './workshop-registrant-refund.component';

describe('WorkshopRegistrantRefundComponent', () => {
  let component: WorkshopRegistrantRefundComponent;
  let fixture: ComponentFixture<WorkshopRegistrantRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopRegistrantRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopRegistrantRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
