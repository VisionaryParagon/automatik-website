import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxBgComponent } from './parallax-bg.component';

describe('ParallaxBgComponent', () => {
  let component: ParallaxBgComponent;
  let fixture: ComponentFixture<ParallaxBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
