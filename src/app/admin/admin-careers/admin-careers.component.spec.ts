import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCareersComponent } from './admin-careers.component';

describe('AdminCareersComponent', () => {
  let component: AdminCareersComponent;
  let fixture: ComponentFixture<AdminCareersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCareersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
