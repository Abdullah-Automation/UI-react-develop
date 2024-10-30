import { AxiosInstance } from 'axios';

import { authUrl, usersUrl } from '~/config';

import { axios } from '../axiosInstance';

import {
  AuthSchema,
  IAuthForm,
  IConfirmationCode,
  IResendConfirmationCode,
  ILogout,
  IForgotPwdForm,
  IResetPassword,
  IRefreshToken,
} from './AuthSchema';

class Auth {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  getAllUsers = async (): Promise<AuthSchema> =>
    this.requestInstance.get(usersUrl.GETALLUSERS);

  login = async (param: IAuthForm): Promise<AuthSchema> =>
    this.requestInstance.post(authUrl.LOGIN, param);

  register = async (param: IAuthForm): Promise<AuthSchema> =>
    this.requestInstance.post(authUrl.REGISTER, param);

  getUser = async (userId: string): Promise<any> =>
    this.requestInstance.get(`${usersUrl.GETALLUSERS}/${userId}`);

  confirmationCode = async (param: IConfirmationCode): Promise<AuthSchema> =>
    this.requestInstance.post(authUrl.REGISTER_CONFIRMATION, param);

  resendConfirmationCode = async (
    param: IResendConfirmationCode
  ): Promise<AuthSchema> =>
    this.requestInstance.post(authUrl.REGISTER_RESEND_CODE, param);

  logout = async (param: ILogout): Promise<any> =>
    this.requestInstance.post(authUrl.LOGOUT, param);

  forgotPassword = async (param: IForgotPwdForm): Promise<any> =>
    this.requestInstance.post(authUrl.FORGOT_PASSWORD, param);

  resetPassword = async (param: IResetPassword): Promise<any> =>
    this.requestInstance.post(authUrl.RESET_PASSWORD, param);

  refreshTokens = async (param: IRefreshToken): Promise<any> =>
    this.requestInstance.post(authUrl.REFRESH_TOKENS, param);
}

export const AuthApi = new Auth(axios);
