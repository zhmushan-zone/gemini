//合并所有reducer 并返回
import { combineReducers } from 'redux'
import * as ActionTypes from "./actionTypes"

const initState = {
  msg: '',
  username: '',
  password: '',
  email:'',
  re_username: '',
  re_password: '',
  repet_password: '',
  forget_email: '',
  id: '',
  data: '',
  redirectTo: '',
  job: '未设置',
  city: '未设置',
  sex: '未设置',
  signature: '未设置',
  code:''
}

const courseInitState = {
  msg: '',
  courses: [],
  code: ''
}

export function userstatus(state = initState, action) {
  switch (action.type) {
    // case ActionTypes.LOGIN:
    //   return { ...state, msg: action.msg }
    case ActionTypes.AUTH_SUCCESS:
      return { ...state, ...action.payload, redirectTo: '/home', username: action.payload.username,avatar:action.avatar,email:action.payload.email }
    case ActionTypes.FORGET_PASS:
      return { ...state, email: action.email }
    case ActionTypes.ERROR_MSG:
      return { ...state, msg: action.msg,code:action.code }
    case ActionTypes.REMOVE_MSG:
      return { ...state, msg: action.msg }
    case ActionTypes.LOAD_DATA:
      return { ...state, ...action.payload }
    case ActionTypes.UPDATE_PERSON_MSG:
      return { ...state, job: action.payload.job, nickname: action.payload.username, msg: action.payload.msg, city: action.payload.city, signature: action.payload.signature, sex: action.payload.sex }
    case ActionTypes.CHANGE_AVATAR:
      return { ...state, avatar: action.avatar }
    case ActionTypes.SEND_EMAIL_SUCCESS:
      return { ...state, code: action.code }
    case ActionTypes.LOGOUT:
      return { ...initState }
    default:
      return state
  }
}

export function course(state = courseInitState, action) {
  switch (action.type) {
    case ActionTypes.ERROR_MSG:
      return { ...state, msg: action.msg,code:action.code }
    case ActionTypes.CREATE_COURSE_SUCCESS:
      return { ...state, courses: [...state.courses, action.payload], msg: '课程创建成功',code: action.code }
    case ActionTypes.COURSE_LIST:
      return { ...state, courses: action.payload }
    case ActionTypes.COURSE_DELETE_SUCCESS:
      return { ...state, msg: '课程删除成功', code: action.code }
    default:
      return state
  }
}

export default combineReducers({ userstatus, course })
