import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRegistrantFormComponent } from './workshop-registrant-form.component';

describe('WorkshopRegistrantFormComponent', () => {
  let component: WorkshopRegistrantFormComponent;
  let fixture: ComponentFixture<WorkshopRegistrantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopRegistrantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopRegistrantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
