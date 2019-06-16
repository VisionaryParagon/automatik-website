import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionalDesignComponent } from './instructional-design.component';

describe('InstructionalDesignComponent', () => {
  let component: InstructionalDesignComponent;
  let fixture: ComponentFixture<InstructionalDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionalDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionalDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
