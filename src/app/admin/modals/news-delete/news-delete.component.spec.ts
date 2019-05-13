import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDeleteComponent } from './news-delete.component';

describe('NewsDeleteComponent', () => {
  let component: NewsDeleteComponent;
  let fixture: ComponentFixture<NewsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
