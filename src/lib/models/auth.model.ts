export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  loading?: boolean;
  error?: string;
}

export class User implements IUser {

  constructor(public uid: string,
              public displayName: string,
              public email: string,
              public loading?: boolean,
              public error?: string) {
  }
}
