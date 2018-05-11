import axios from 'axios'
import * as ActionTypes from './actionTypes'

function errorMsg(msg) {
  return { msg, type: ActionTypes.ERROR_MSG }
}

function authSuccess(obj) {
  return { msg: '', type: ActionTypes.AUTH_SUCCESS, payload: { ...obj } }
}

function forgetPass(email) {
  return { msg: '', type: ActionTypes.FORGET_PASS, email }
}

export function removeMsg() {
  return { msg: '', type: ActionTypes.REMOVE_MSG }
}


export function register(re_user, re_pass, repet_pass) {
  if (!re_user || !re_pass || !repet_pass) {
    return errorMsg("请输入注册的账号的密码")
  }
  var regex =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  if (!regex.test(re_user)) {
    return errorMsg("邮箱格式错误")
  }
  if (re_pass.length < 6 || re_pass.length >= 14) {
    return errorMsg("密码个数不能少于６位或者大于14位")
  }
  if (re_pass !== repet_pass) {
    return errorMsg("两次密码不一致")
  }
  return async dispatch => {
    const res = await axios.post('/user/register', { re_user, re_pass })
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess({ re_user, re_pass }))
    } else {
      dispatch(errorMsg(res.data.msg))
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
    if (res.status === 200 && res.data.code === 0) {
      dispatch(forgetPass(forget_email))
    } else {
      dispatch(res.data.msg)
    }
  }
}

export function login(username, passwd) {
  if (!username || !passwd) {
    return errorMsg("请输入账号或者密码")
  }
  return async dispatch => {
    const res = await axios.post('/user/login', { username, passwd })
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess({ username, passwd }))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}
