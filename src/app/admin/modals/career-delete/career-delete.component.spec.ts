import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerDeleteComponent } from './career-delete.component';

describe('CareerDeleteComponent', () => {
  let component: CareerDeleteComponent;
  let fixture: ComponentFixture<CareerDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
