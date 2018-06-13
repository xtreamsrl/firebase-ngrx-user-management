import { TestBed, inject } from '@angular/core/testing';

import { FirebaseNgrxUserManagementService } from './firebase-ngrx-user-management.service';

describe('FirebaseNgrxUserManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseNgrxUserManagementService]
    });
  });

  it('should be created', inject([FirebaseNgrxUserManagementService], (service: FirebaseNgrxUserManagementService) => {
    expect(service).toBeTruthy();
  }));
});
