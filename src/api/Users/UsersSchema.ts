export interface UserSchema {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface IUpdateUser {
  pronunciationWords?: string[];
}
