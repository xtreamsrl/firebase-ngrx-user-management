/*
 * Public API Surface of firebase-ngrx-user-management
 */

import * as ua from './lib/actions/auth.actions';
import {IUser, User} from './lib/models/auth.model';

export * from './lib/firebase-ngrx-user-management.service';
export * from './lib/firebase-ngrx-user-management.module';
const userActions = ua;
export {userActions, IUser, User};
