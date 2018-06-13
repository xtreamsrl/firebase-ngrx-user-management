import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseNgrxUserManagementComponent } from './firebase-ngrx-user-management.component';

describe('FirebaseNgrxUserManagementComponent', () => {
  let component: FirebaseNgrxUserManagementComponent;
  let fixture: ComponentFixture<FirebaseNgrxUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseNgrxUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseNgrxUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
