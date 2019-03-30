import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsEventComponent } from './workshops-event.component';

describe('WorkshopsEventComponent', () => {
  let component: WorkshopsEventComponent;
  let fixture: ComponentFixture<WorkshopsEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopsEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
