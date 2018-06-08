export enum ResponseCode {
  UNKNOWN = -1,
  FAILED = 0,
  SUCCESS = 1,
  LOGIN_FAILED = 100,
  TOKEN_EXPIRED = 101,
  USERNAME_EXISIT = 102,
  EMAIL_SEND_FAILED = 200
}

export const response = (code: number, msg: string, data?: any) => ({ code, msg, data });

export const success = (data?: any) => response(ResponseCode.SUCCESS, ResponseCode[ResponseCode.SUCCESS], data);
