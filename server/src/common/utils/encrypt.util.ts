import * as crypto from 'crypto';

export const generateSalt: () => string = () =>
  (Math.random() * +new Date()).toString(36);

export const md5 = (text: string) =>
  crypto.createHash('md5').update(text).digest('hex');

export const encrpty = (password: string, salt: string) =>
  md5(md5(password) + salt);

export const generateCaptcha = () =>
  generateSalt().split('.')[0].toUpperCase();
