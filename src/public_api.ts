/*
 * Public API Surface of firebase-ngrx-user-management
 */

import {IUser, User} from './lib/models/auth.model';

export * from './lib/firebase-ngrx-user-management.service';
export * from './lib/firebase-ngrx-user-management.module';
export * from './lib/actions/auth.actions';

import {AuthState} from './lib/reducers/user.reducer';
import {Credentials} from './lib/models/credentials';

export {AuthState, Credentials, IUser, User};
