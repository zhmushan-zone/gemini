import * as fs from 'fs';

export const config = {
  port: 9999,
  token: {
    secret: 'sdkjfnaskfjnhewkjnfkn',
    expiresIn: '7 days'
  },
  email: {
    resendTime: 60000,
    expiresIn: 300000,
    from: 'Gemini <zhangtest@yeah.net>',
    subject: 'Welcome to Gemini',
    html: (captcha: string) => getEmailTemplate().replace('{{captcha}}', captcha),
    host: 'smtp.yeah.net',
    auth: {
      user: 'zhangtest@yeah.net',
      pass: 'mv2if2pqcjo0nv8c'
    },
    secure: true
  },
  typeorm: {
    type: 'mongodb' as 'mongodb',
    host: 'localhost',
    database: 'gemini',
    entities: [
      __dirname + '/**/*.entity{.ts,.js}'
    ],
    synchronize: true
    // dropSchema: true
  },
  path: {
    avatar: __dirname + '/../public/avatar',
    video: __dirname + '/../public/video',
    coverImg: __dirname + '/../public/cover-img'
  }
};

const emailTemplatePath = __dirname + '/../assets/email.template.html';
const getEmailTemplate = () => fs.readFileSync(emailTemplatePath).toString();
