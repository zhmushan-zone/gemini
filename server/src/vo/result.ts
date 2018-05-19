export enum ResultCode {
  UNKNOWN = -1,
  SUCCESS = 1,
  LOGIN_FAILED = 100,
  TOKEN_EXPIRED = 101,
  USERNAME_EXISIT = 102,
  ID_INVALID = 103,
  NO_PERMISSION = 104,
  UPDATE_FAILED = 105,
  FILE_DEL_FAILED = 200,
  EXTNAME_ERR = 201,
  FILE_NOT_EXISIT = 202,
}

export class ResultVO<T> {
  code: number
  msg: string
  data?: T

  static success(data?: any) {
    return new ResultVO(ResultCode.SUCCESS, '成功', data)
  }

  constructor(code: number, msg: string, data?: T) {
    this.code = code
    this.msg = msg
    this.data = data
  }
}
