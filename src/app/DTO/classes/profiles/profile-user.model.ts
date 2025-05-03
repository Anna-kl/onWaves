
export interface ViewNameProfile {
  Name: string;
  Family: string;
}

export interface ProfileUser {
  Name: string;
  UserType: UserType;
}

export enum UserType {
  User,
  Business,
  Admin
}
