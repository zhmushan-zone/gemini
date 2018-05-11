//合并所有reducer 并返回
import { combineReducers } from 'redux'
import * as ActionTypes from "./actionTypes"

const initState = {
  msg: '',
  username: '',
  password: '',
  re_username: '',
  re_password: '',
  repet_password: '',
  forget_email: '',
}

export function userstatus(state = initState, action) {
  switch (action.type) {
    // case ActionTypes.LOGIN:
    //   return { ...state, msg: action.msg }
    case ActionTypes.AUTH_SUCCESS:
      return { ...state, data: action.payload, redirectTo: '/home' }
    case ActionTypes.FORGET_PASS:
      return { ...state, email: action.email }
    case ActionTypes.ERROR_MSG:
      return { ...state, msg: action.msg }
    case ActionTypes.REMOVE_MSG:
      return { ...state, msg: action.msg }
    case ActionTypes.LOAD_DATA:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default combineReducers({ userstatus })
