import { TestBed, inject } from '@angular/core/testing';

import { RgbRealtimeService } from './rgb-realtime.service';

describe('RgbRealtimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RgbRealtimeService]
    });
  });

  it('should be created', inject([RgbRealtimeService], (service: RgbRealtimeService) => {
    expect(service).toBeTruthy();
  }));
});
