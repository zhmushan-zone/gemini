import { ResponseCode } from './utils';

export class GeminiError extends Error {
  code: ResponseCode;
  constructor(code: ResponseCode) {
    super(ResponseCode[code]);
    this.code = code;
  }
}
