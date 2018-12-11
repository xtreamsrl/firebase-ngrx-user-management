export interface IUser {
  uid?: string;
  displayName: string;
  email: string;
  photoURL?: string;
  phoneNumber: string;
  emailVerified?: boolean;
}

export class User implements IUser {

  constructor(public uid: string,
              public displayName: string,
              public email: string,
              public phoneNumber: string,
              public photoURL?: string,
              public emailVerified?: boolean
  ) {
  }
}
