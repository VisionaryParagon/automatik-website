import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRegistrantDeleteComponent } from './workshop-registrant-delete.component';

describe('WorkshopRegistrantDeleteComponent', () => {
  let component: WorkshopRegistrantDeleteComponent;
  let fixture: ComponentFixture<WorkshopRegistrantDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopRegistrantDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopRegistrantDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
