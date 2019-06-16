import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoProductionComponent } from './video-production.component';

describe('VideoProductionComponent', () => {
  let component: VideoProductionComponent;
  let fixture: ComponentFixture<VideoProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
