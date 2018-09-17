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
  },
  integral: {
    article: {
      reviewed: 20,
      weekRank: {
        first: 50,
        second: 30,
        third: 20,
        fourthTOTenth: 10
      },
      monthRank: {
        first: 100,
        second: 70,
        third: 50,
        fourthTOTenth: 30
      },
      up: 0.4
    },
    course: {
      up: 0.2,
      rateAndRateComment: 5
    },
    issue: {
      create: -5,
      reply: 3,
      replyUp: 0.2,
      weekRank: {
        first: 50,
        second: 30,
        third: 20,
        fourthTOTenth: 10
      },
      monthRank: {
        first: 100,
        second: 70,
        third: 50,
        fourthTOTenth: 30
      }
    }
  }
};

const emailTemplatePath = __dirname + '/../assets/email.template.html';
const getEmailTemplate = () => fs.readFileSync(emailTemplatePath).toString();
