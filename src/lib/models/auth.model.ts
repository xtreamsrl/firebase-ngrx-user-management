export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export class User implements IUser {

  constructor(public uid: string,
              public displayName: string,
              public email: string,
              public photoURL?: string) {
  }
}
