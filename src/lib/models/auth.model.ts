export interface IUser {
  uid?: string;
  displayName: string;
  email: string;
  photoURL?: string;
  emailVerified?: boolean;
  providers: {
    password?: boolean;
    facebook?: boolean;
    google?: boolean;
    phone?: boolean;
  };
}

export class User implements IUser {

  constructor(public uid: string,
              public displayName: string,
              public email: string,
              public providers: {
                password?: boolean;
                facebook?: boolean;
                google?: boolean;
                phone?: boolean;
              },
              public photoURL?: string,
              public emailVerified?: boolean
  ) {
  }
}
