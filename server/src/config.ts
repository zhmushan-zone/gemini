import * as fs from 'fs';

export const config = {
  port: process.argv[2] || 9999,
  token: {
    secret: 'sdkjfnaskfjnhewkjnfkn',
    expiresIn: '30 days'
  },
  email: {
    resendTime: 60000,
    expiresIn: 300000,
    from: 'IT Alley <zhangtest@yeah.net>',
    subject: '收到来自 IT Alley 的验证邮件',
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
  },
  template: {
    notice: {
      // 当用户发布的问题被回答时
      issueReply: (id: string, time: string, title: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              答疑
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>你的提问</span>
              <a href="/forum/details/${id}">${title}</a>
              <span>有新的回答</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某问题中的回答被回复时
      issueSubReply: (id: string, time: string, title: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              答疑
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>你在</span>
              <a>${title}</a>
              <span>的回答有新的回复</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某问题中在某个回答下的回复被他人回复
      issueSubReply2: (id: string, time: string, title: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              答疑
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>有人在</span>
              <a href="/forum/details/${id}">${title}</a>
              <span>回复了您</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户发布的问题通过审核时
      issuePass: (id: string, time: string, title: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              答疑
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您发布的问题</span>
              <a href="/forum/details/${id}">${title}</a>
              <span>已通过审核</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户发布的问题审核失败
      issueFail: (time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              答疑
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您发布的问题</span>
              <a>${title}</a>
              <span>审核失败,</span>
              <span>原因"${reason}"</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户的问题被他人举报
      issueReported: (time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              答疑
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您发布的问题</span>
              <a>${title}</a>
              <span>被举报,</span>
              <span>原因"${reason}",请您遵循社区规定</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某问题中的回答被他人举报
      issueReplyReported: (id: string, time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              答疑
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您在</span>
              <a href="/forum/details/${id}">${title}</a>
              <span>的回答被举报,</span>
              <span>原因"${reason}",请您遵循社区规定</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某问题下的回答的回复被人举报
      issueSubReplyReported: (id: string, time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              答疑
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您在</span>
              <a href="/forum/details/${id}">${title}</a>
              <span>的回复被举报,</span>
              <span>原因"${reason}",请您遵循社区规定</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户发布的文章被评论时
      articleReply: (id: string, time: string, title: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              看法
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>你发布的文章</span>
              <a href="/article/${id}">${title}</a>
              <span>有新的评论</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在文章中的评论被回复
      articleSubReply: (id: string, time: string, title: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              看法
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>你在</span>
              <a href="/article/${id}">${title}</a>
              <span>中的评论有了新的回复</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某文章中的评论下的回复被他人回复
      articleSubReply2: (id: string, time: string, title: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              看法
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>有人在</span>
              <a href="/article/${id}" >${title}</a>
              <span>回复了您</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户发布的文章通过审核时
      articlePass: (id: string, time: string, title: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              看法
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您发布的文章</span>
              <a href="/article/${id}">${title}</a>
              <span>已通过审核</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户发布的文章审核失败
      articleFail: (time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              看法
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您发布的文章</span>
              <a>${title}</a>
              <span>审核失败,</span>
              <span>原因"${reason}"</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户的文章被他人举报
      articleReported: (time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              看法
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您发布的文章</span>
              <a>${title}</a>
              <span>被举报,</span>
              <span>原因"${reason}",请您遵循社区规定</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某文章中的评论被他人举报
      articleReplyReported: (id: string, time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              看法
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您在</span>
              <a href="/article/${id}">${title}</a>
              <span>的回答被举报,</span>
              <span>原因"${reason}",请您遵循社区规定</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某文章下的评论的回复被人举报
      articleSubReplyReported: (id: string, time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              看法
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您在</span>
              <a href="/article/${id}">${title}</a>
              <span>的回复被举报,</span>
              <span>原因"${reason}",请您遵循社区规定</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某课程中的评论被他人举报
      courseReplyReported: (id: string, time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              课程
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您在</span>
              <a href="/class/${id}">${title}</a>
              <span>的回答被举报,</span>
              <span>原因"${reason}",请您遵循社区规定</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `,
      // 当用户在某课程下的评论的回复被人举报
      courseSubReplyReported: (id: string, time: string, title: string, reason: string, isRead = false) => `
        <div class="message-center-item-${isRead ? '' : 'un'}read">
          <div class="message-center-item-left">
            <div>
              课程
            </div>
          </div>
          <div class="message-center-item-right">
            <div class="message-center-item-content">
              <span>您在</span>
              <a href="/class/${id}">${title}</a>
              <span>的回复被举报,</span>
              <span>原因"${reason}",请您遵循社区规定</span>
            </div>
            <div class="message-center-item-time">
              ${time}
            </div>
          </div>
        </div>
      `
    }
  }
};

const emailTemplatePath = __dirname + '/../assets/email.template.html';
const getEmailTemplate = () => fs.readFileSync(emailTemplatePath).toString();
