import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiweatherComponent } from './piweather.component';

describe('PiweatherComponent', () => {
  let component: PiweatherComponent;
  let fixture: ComponentFixture<PiweatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiweatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
