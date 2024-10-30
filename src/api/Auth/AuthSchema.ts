export interface AuthSchema {
  user: any;
  tokens: {
    access: {
      token: string;
      expires: number;
    };
    refresh: {
      token: string;
      expires: number;
    };
  };
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IConfirmationCode {
  email: string;
  confirmationCode: string;
}

export interface IResendConfirmationCode {
  email: string;
}

export interface ILogout {
  tokens: {
    idToken: string;
    refreshToken: string;
  };
}

export interface IForgotPwdForm {
  email: string;
}

export interface IResetPassword {
  email: string;
  password: string;
  verificationCode: string;
}

export interface IRefreshToken {
  email: string;
  refreshToken: string;
}
