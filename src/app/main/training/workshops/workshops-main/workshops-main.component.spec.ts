import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsMainComponent } from './workshops-main.component';

describe('WorkshopsMainComponent', () => {
  let component: WorkshopsMainComponent;
  let fixture: ComponentFixture<WorkshopsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
