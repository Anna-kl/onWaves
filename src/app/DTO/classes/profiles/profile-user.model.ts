
export interface ViewNameProfile {
  Name: string;
  Family: string;
}

export interface ProfileUser {
  Name: ViewNameProfile;
  UserType: UserType;
  Email?: string;
}

export enum UserType {
  User,
  Business,
  Admin
}
