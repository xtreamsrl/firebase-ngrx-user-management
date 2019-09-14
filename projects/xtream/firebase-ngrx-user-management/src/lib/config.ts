import {InjectionToken} from '@angular/core';

export interface FirebaseUserManagementConfig {
  googleWebClientId?: string;
}

export const FIREBASE_USER_MANAGEMENT_CONFIG = new InjectionToken<FirebaseUserManagementConfig>('userManagement.config');
