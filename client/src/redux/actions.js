import axios from 'axios'
import * as ActionTypes from './actionTypes'

function errorMsg(msg) {
  return { msg, type: ActionTypes.ERROR_MSG }
}

export function removeMsg() {
  return { msg:'', type: ActionTypes.REMOVE_MSG }
}

export function login({ username, passwd }) {
  if (!username || !passwd) {
    return errorMsg("没有信息输入")
  }
  return async dispatch => {
    const res = await axios.post('/user/login', { username, passwd })
    if (res.status === 200 && res.data.code === 0) {
      dispatch()
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}
