export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  photoUrl?: string;
  emailVerified?: boolean;
}

export class User implements IUser {

  constructor(public uid: string,
              public displayName: string,
              public email: string,
              public photoUrl?: string,
              public emailVerified?: boolean
  ) {
  }
}
