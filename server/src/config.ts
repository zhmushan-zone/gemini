export const config = {
  port: 9999,
  token: {
    secret: 'sdkjfnaskfjnhewkjnfkn',
    expiresIn: '7 days'
  },
  email: {
    resendTime: 60000,
    from: 'Gemini <zhmushan@foxmail.com>',
    subject: 'Welcome to Gemini',
    html: (captcha: string) => `<h1>${captcha.toUpperCase()}</h1> is your Gemini captcha`,
    host: 'smtp.qq.com',
    auth: {
      user: 'zhmushan@foxmail.com',
      pass: 'dyiiknrftlndbahg'
    }
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
    video: __dirname + '/../public/video'
  }
};
