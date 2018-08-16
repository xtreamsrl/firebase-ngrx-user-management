/*
 * Public API Surface of firebase-ngrx-user-management
 */

import {IUser, User} from './lib/models/auth.model';
import {AuthState, getAuthState, getUser, isAuthLoading, isUserLogged} from './lib/reducers/user.reducer';
import {Credentials} from './lib/models/credentials';

export * from './lib/firebase-ngrx-user-management.service';
export * from './lib/firebase-ngrx-user-management.module';
export * from './lib/actions/auth.actions';

export {AuthState, Credentials, IUser, User, getAuthState, isAuthLoading, isUserLogged, getUser};
