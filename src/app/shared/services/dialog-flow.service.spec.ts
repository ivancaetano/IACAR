import { TestBed } from '@angular/core/testing';

import { DialogFlowService } from './dialog-flow.service';

describe('DialogFlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogFlowService = TestBed.get(DialogFlowService);
    expect(service).toBeTruthy();
  });
});
