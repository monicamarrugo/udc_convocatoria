import { TestBed } from '@angular/core/testing';

import { PasswordEncryptionService } from './password-encryption.service';

describe('PasswordEncryptionService', () => {
  let service: PasswordEncryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordEncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
