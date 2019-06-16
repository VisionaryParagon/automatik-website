import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWebDevelopmentComponent } from './app-web-development.component';

describe('AppWebDevelopmentComponent', () => {
  let component: AppWebDevelopmentComponent;
  let fixture: ComponentFixture<AppWebDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppWebDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppWebDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
