import { TestBed, inject } from '@angular/core/testing';

import { RgbService } from './rgb.service';

describe('RgbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RgbService]
    });
  });

  it('should be created', inject([RgbService], (service: RgbService) => {
    expect(service).toBeTruthy();
  }));
});
