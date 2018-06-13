/*
 * Public API Surface of firebase-ngrx-user-management
 */

import * as userActions from './lib/actions/user.actions';
import {IUser, User} from './lib/models/user.model';


export * from './lib/firebase-ngrx-user-management.service';
export * from './lib/firebase-ngrx-user-management.module';

export {userActions, IUser, User};
