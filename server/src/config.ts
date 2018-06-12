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
    html: (captcha: string) => `<h1>${captcha.toUpperCase()}</h1> is your Gemini captcha.
      Gemini is the third astrological sign in the zodiac, originating from the constellation of Gemini.
      Under the tropical zodiac, the sun transits this sign between May 21 and June 21.
      Gemini is represented by the twins Castor and Pollux.
      The symbol of the twins is based on the Dioscuri, one mortal and one immortal,
      that were granted shared half-immortality after the death of the mortal brother (Castor).`,
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
    video: __dirname + '/../public/video'
  }
};
