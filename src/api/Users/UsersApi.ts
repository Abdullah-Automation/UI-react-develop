import { AxiosInstance } from 'axios';

import { usersUrl } from '~/config';

import { axios } from '../axiosInstance';

import { UserSchema, IUpdateUser } from './UsersSchema';

class Users {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  updateUser = async (userId: string, param: IUpdateUser): Promise<any> =>
    this.requestInstance.patch(usersUrl.UPDATEUSER(userId), param);

  getUserById = async (userId: string): Promise<any> =>
    this.requestInstance.get(usersUrl.GETUSER(userId));

  getUserCreditBalanceById = async (userId: string): Promise<any> =>
    this.requestInstance.get(usersUrl.GETUSER_CREDITBALANCE(userId));

  getAllUsers = async (): Promise<UserSchema> =>
    this.requestInstance.get(usersUrl.GETALLUSERS);
}

export const UsersApi = new Users(axios);
