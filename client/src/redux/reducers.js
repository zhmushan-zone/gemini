//合并所有reducer 并返回
import { combineReducers } from 'redux'
import * as ActionTypes from "./actionTypes"

const initState = {
  msg: '',
  pwd: '',
  username: ''

}

export function userstatus(state = initState, action) {
  switch (action.type) {
    // case ActionTypes.LOGIN:
    //   return { ...state, login: action.payload }
    //   break;
    case ActionTypes.ERROR_MSG:
      return { ...state, msg: action.msg }
      break;
    case ActionTypes.REMOVE_MSG:
      return { ...state, msg: action.msg }
      break;
    default:
      return state
      break;
  }
}

export default combineReducers({ userstatus })
