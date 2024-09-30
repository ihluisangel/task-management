export interface TransactionUsers {
  data: DataUser;
}

export interface DataUser {
  users: UserModel[];
}

export interface UserModel {
  id:       string;
  fullName: string;
  avatar:   null | string;
}
