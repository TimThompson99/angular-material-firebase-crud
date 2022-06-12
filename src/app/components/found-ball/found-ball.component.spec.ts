import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundBallComponent } from './found-ball.component';

describe('FoundBallComponent', () => {
  let component: FoundBallComponent;
  let fixture: ComponentFixture<FoundBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundBallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
