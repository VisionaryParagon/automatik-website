import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRegistrantCancelComponent } from './workshop-registrant-cancel.component';

describe('WorkshopRegistrantCancelComponent', () => {
  let component: WorkshopRegistrantCancelComponent;
  let fixture: ComponentFixture<WorkshopRegistrantCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopRegistrantCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopRegistrantCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
