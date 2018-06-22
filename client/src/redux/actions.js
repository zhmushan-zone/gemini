import axios from 'axios'
import Cookies from 'js-cookie'
import * as ActionTypes from './actionTypes'

function errorMsg(msg) {
  return { msg, code: 0, type: ActionTypes.ERROR_MSG }
}

function authSuccess(obj) {
  const { data } = obj
  return { msg: '', type: ActionTypes.AUTH_SUCCESS, payload: { ...obj }, avatar: data.avatar }
}

function forgetPass(email) {
  return { msg: '', type: ActionTypes.FORGET_PASS, email }
}

function changeAvatarFunc(now) {
  return { type: ActionTypes.CHANGE_AVATAR, avatar: now }
}


// 修改成功
function updateSuccesss(obj) {
  return { payload: { ...obj }, type: ActionTypes.UPDATE_PERSON_MSG }
}

export function removeMsg() {
  return { msg: '', type: ActionTypes.REMOVE_MSG }
}

// 加载数据
export function loadData(userinfo) {
  return { type: ActionTypes.LOAD_DATA, payload: userinfo }
}

// 发送邮箱成功
function sendEmailSuccess() {
  let code = 1
  return { type: ActionTypes.SEND_EMAIL_SUCCESS, code: code }
}

// 创建课程成功
function createCourseSuccess(course) {
  return { type: ActionTypes.CREATE_COURSE_SUCCESS, payload: course }
}

export function register(username, password, repet_pass) {
  console.log(username)
  if (!username || !password || !repet_pass) {
    return errorMsg("请输入注册的账号的密码")
  }
  if (username.length < 6) {
    return errorMsg("用户名最少6位")
  }
  if (password.length < 6 || password.length >= 14) {
    return errorMsg("密码个数不能少于６位或者大于14位")
  }
  if (password !== repet_pass) {
    return errorMsg("两次密码不一致")
  }
  return async dispatch => {
    const email = Cookies.get('email')
    const captcha = Cookies.get('captcha')
    const res = await axios({
      method: 'post',
      url: '/api/users/register',
      headers: {
        "captcha": captcha,
      },
      data: {
        username,
        email,
        password
      }
    })
    if (res.data.code === 1) {
      Cookies.set('_id', res.data.data.id)
      Cookies.set('_token', res.data.data.token)
      dispatch(authSuccess({ username, password, email, data: res.data.data }))
    } else if (res.data.code === -1) {
      dispatch(errorMsg("未知错误"))
    } else if (res.data.code === 102) {
      dispatch(errorMsg("用户已存在"))
    } else if (res.data.code === 104) {
      dispatch(errorMsg("请输入正确的验证码"))
    }
  }
}

export function forgetPassword(forget_email) {
  var regex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  if (!forget_email) {
    return errorMsg("请输入邮箱")
  }
  if (!regex.test(forget_email)) {
    return errorMsg("请输入正确的邮箱格式")
  }
  return async dispatch => {
    const res = await axios.post('/user/forget', { forget_email })
    if (res.data.code === 1) {
      dispatch(forgetPass(forget_email))
    } else {
      dispatch(res.data.msg)
    }
  }
}

export function login(username, password) {
  if (!username || !password) {
    return errorMsg("请输入账号或者密码")
  }
  return async dispatch => {
    const res = await axios.post('/api/users/login', { username, password })
    if (res.data.code === 1) {
      Cookies.set('_id', res.data.data.id)
      Cookies.set('_token', res.data.data.token)
      dispatch(authSuccess({ username, password, data: res.data.data }))
    } else if (res.data.code === 100) {
      dispatch(errorMsg("登录失败"))
    } else if (res.data.code === -1) {
      dispatch(errorMsg("未知错误"))
    } else {
      dispatch(errorMsg("后端错误"))
    }
  }
}

// 修改个人信息
export function changePersonMsg(a) {
  const { sex, username, job, city, signature } = a
  const _id = Cookies.get('_id')
  const _token = Cookies.get('_token')
  console.log(_id)
  return async dispatch => {
    const res = await axios({
      method: 'put',
      url: '/api/users',
      headers: {
        "id": _id,
        "token": _token,
      },
      data: {
        "nickname": username,
        sex,
        job,
        city,
        signature
      }
    })
    if (res.data.code === 1) {
      return dispatch(updateSuccesss({ msg: res.data.msg, sex: sex === 1 ? '男' : '女', username, job, city, signature }))
    } else {
      return dispatch(errorMsg("修改失败了"))
    }
  }
}
// 注册发送邮件
export function RegisterSendEamil(email) {
  if (!email) {
    return errorMsg("请输入邮箱")
  }
  var regex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  if (!regex.test(email)) {
    return errorMsg("邮箱格式错误")
  }
  return async dispatch => {
    const res = await axios.post(`/api/users/email/send/${email}`)
    Cookies.set("email", email)
    if (res.data.code === 1) {
      dispatch(sendEmailSuccess())
    } else if (res.data.code === 103) {
      dispatch(errorMsg("发送验证码太过频发", 0))
    }
    else {
      dispatch(errorMsg("验证码错误", 0))
    }
  }

}
// 检测是否验证码正确
export function checkedCaptcha(captcha) {
  if (!captcha) {
    return errorMsg("验证码都不写吗？")
  }
  const email = Cookies.get('email')
  return async  dispatch => {
    const res = await axios({
      method: 'post',
      url: `/api/users/email/validate/${email}`,
      headers: {
        "captcha": captcha
      }
    })
    if (res.data.code === 1) {
      Cookies.set("captcha", captcha)
    }
  }
}


export function logout() {
  Cookies.remove('_id')
  Cookies.remove('_token')
  return { type: ActionTypes.LOGOUT, username: '', id: '' }
}

// 修改头像
export function changeAvatar(name) {
  return changeAvatarFunc(name)
}

//创建课程
export function createCourse(course) {
  const _token = Cookies.get('_token')
  return async dispatch => {
    const res = await axios({
      method: 'post',
      url: '/api/courses',
      headers: {
        "token": _token
      },
      data: {
        ...course
      }
    })
    if (res.data.code === 1) {
      dispatch(createCourseSuccess(res.data.data))
    } else {
      dispatch(errorMsg("服务端错误"))
    }
  }
}