//合并所有reducer 并返回
import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

const initState = {
	msg: '',
	username: '',
	email: '',
	re_username: '',
	id: '',
	redirectTo: '',
	job: '未设置',
	city: '未设置',
	sex: '未设置',
	signature: '未设置',
	watchTags: [],
	code: '',
	watchIssuesId: [],
	watchUsersId: [],
	watchedUsersId: [],
	personCenterInfo: '',
	shoppingcart: [],
	joinCourse: [],
}

const courseInitState = {
	msg: '',
	courses: [],
	code: '',
}

const courseInfoInit = {
	msg: '',
	data: {},
	code: '',
}

const articleInit = {
	msg: '',
	code: '',
	comment: [],
	upersId: [],
	articleArray: [],
}

const problemInitState = {
	msg: '',
	problem: [],
	code: '',
}

const problemCommentInit = {
	msg: '',
	replys: [],
	code: '',
}

const reportInit = {
	msg: '',
	reports: [],
	code: '',
}

const Userinit = {}

const videoinit = {
	comment: [],
	issues: [],
	course: [],
	rate: {},
	rateComment: {},
}

const searchInit = {
	courses: [],
	problems: [],
	articles: [],
}

const shoppingCartInit = {
	courses: [],
}

const messageInit = {
	msg: [],
}

const adviceInit = {
	advice: [],
}

const countDownInit = {
	count: 60,
}

export function userstatus(state = initState, action) {
	switch (action.type) {
		// case ActionTypes.LOGIN:
		//   return { ...state, msg: action.msg }
		case ActionTypes.AUTH_SUCCESS:
			return {
				...state,
				...action.payload,
				redirectTo: '/home',
				username: action.username,
				code: action.code,
			}
		case ActionTypes.FORGET_PASS:
			return {
				...state,
				email: action.email,
			}
		case ActionTypes.ERROR_MSG:
			return {
				...state,
				msg: action.msg,
				code: action.code,
			}
		case ActionTypes.REMOVE_MSG:
			return {
				...state,
				msg: action.msg,
			}
		case ActionTypes.LOAD_DATA:
			return {
				...state,
				...action.payload,
			}
		case ActionTypes.UPDATE_PERSON_MSG:
			return {
				...state,
				job: action.payload.job,
				nickname: action.payload.username,
				msg: action.payload.msg,
				city: action.payload.city,
				signature: action.payload.signature,
				sex: action.payload.sex,
			}
		case ActionTypes.CHANGE_AVATAR:
			return {
				...state,
				avatar: action.avatar,
			}
		case ActionTypes.SEND_EMAIL_SUCCESS:
			return {
				...state,
				code: action.code,
			}
		case ActionTypes.LOGOUT:
			return {
				...initState,
			}
		case ActionTypes.UPDATE_FORUM_TAGS:
			return {
				...state,
				watchTags: action.tags,
			}
		case ActionTypes.FOLLOW_PROBLEM:
			return {
				...state,
				watchIssuesId: action.payload,
			}
		case ActionTypes.FETCH_ONE_USER:
			return {
				...state,
				personCenterInfo: action.data,
			}
		case ActionTypes.FOCUS_USER:
			return {
				...state,
				watchUsersId: action.data,
			}
		case ActionTypes.UPDATE_MY_COURSE:
			return {
				...state,
				joinCourse: action.payload,
			}
		case ActionTypes.UPDATE_USER_SHOPPING_CART:
			return {
				...state,
				shoppingcart: action.payload
			}
		default:
			return state
	}
}

export function course(state = courseInitState, action) {
	switch (action.type) {
		case ActionTypes.ERROR_MSG:
			return {
				...state,
				msg: action.msg,
				code: action.code,
			}
		case ActionTypes.CREATE_COURSE_SUCCESS:
			return {
				...state,
				courses: [ ...state.courses, action.payload ],
				msg: '课程创建成功',
				code: action.code,
			}
		case ActionTypes.COURSE_LIST:
			return {
				...state,
				courses: action.payload,
			}
		case ActionTypes.COURSE_DELETE_SUCCESS:
			return {
				...state,
				msg: '课程删除成功',
				code: action.code,
			}
		default:
			return state
	}
}

export function courseInfo(state = courseInfoInit, action) {
	switch (action.type) {
		case ActionTypes.FETCH_ONE_COUSE:
			return {
				...state,
				data: action.payload,
			}
		case ActionTypes.UPDATE_COURSE:
			return {
				...state,
				data: action.payload,
			}
		default:
			return state
	}
}

export function article(state = articleInit, action) {
	switch (action.type) {
		case ActionTypes.REMOVE_MSG:
			return {
				...state,
				msg: action.msg,
			}
		case ActionTypes.CREATE_ARTICLE_SUCCESS:
			return {
				...state,
				code: action.code,
				article: action.article,
				msg: action.msg,
			}
		case ActionTypes.CREATE_ARTICLE_ERROR:
			return {
				...state,
				msg: action.msg,
				code: action.code,
			}
		case ActionTypes.FETCH_All_ARTICLE:
			return {
				...state,
				articleArray: [ ...action.data ],
			}
		case ActionTypes.FETCH_ARTICLE_CATEGORY:
			return {
				...state,
				articleArray: [ ...action.data ],
				code: action.code,
			}
		case ActionTypes.SEND_ARTICLE_COMMENT:
			return {
				...state,
				comment: [ ...state.comment, action.comment ],
			}
		case ActionTypes.GET_ARTICLE_COMMENT:
			return {
				...state,
				comment: action.commentList,
			}
		case ActionTypes.SET_REPLY_COMMENT:
			return {
				...state,
				comment: [ ...state.comment, action.commentReply ],
			}
		case ActionTypes.DELETE_ARTICLE_SUCCESS:
			return {
				...state,
				articleArray: action.articleArray,
			}
		case ActionTypes.CHECK_ARTICLE_ACCEPT:
			return {
				...state,
				articleArray: action.articleArray,
			}
		default:
			return state
	}
}

export function problem(state = problemInitState, action) {
	switch (action.type) {
		case ActionTypes.ERROR_MSG:
			return {
				...state,
				msg: action.msg,
				code: action.code,
			}
		case ActionTypes.CREATE_PROBLEM_SUCCESS:
			console.log(action.payload)
			return {
				...state,
				problem: [ ...state.problem, action.payload ],
				msg: '提交成功，请等待审核',
				code: action.code,
			}
		case ActionTypes.PROBLEM_LIST:
			return {
				...state,
				problem: action.payload,
			}
		case ActionTypes.PROBLEM_LIST_BY_TYPE:
			return {
				...state,
				problem: action.payload,
			}
		case ActionTypes.DELETE_PROBLEM_SUCCESS:
			return {
				...state,
				problem: action.payload,
			}
		case ActionTypes.CHECK_PROBLEM_ACCEPT:
			return {
				...state,
				problem: action.payload,
			}
		default:
			return state
	}
}

export function problemComment(state = problemCommentInit, action) {
	switch (action.type) {
		case ActionTypes.ERROR_MSG:
			return {
				...state,
				msg: action.msg,
				code: action.code,
			}
		case ActionTypes.COMMENT_PROBLEM:
			return {
				...state,
				replys: [ ...state.replys, action.payload ],
				code: action.code,
				msg: action.msg,
			}
		case ActionTypes.FETCH_COMMENT:
			return {
				...state,
				replys: action.payload,
			}

		default:
			return state
	}
}
/* ------------------举报------------------------- */
export function report(state = reportInit, action) {
	switch (action.type) {
		case ActionTypes.GET_REPORTS_LIST:
			return {
				...state,
				reports: action.payload,
			}
		default:
			return state
	}
}
/* ------------------获取单个user------------------------- */

export function User(state = Userinit, action) {
	switch (action.type) {
		case ActionTypes.FETCH_ONE_USER:
			let sex
			if (action.data.sex === 0) {
				sex = '女'
			} else {
				sex = '男'
			}
			return {
				...state,
				...action.data,
				sex: sex,
			}
		case ActionTypes.UPDATE_PERSON_MSG:
			return {
				...state,
				job: action.payload.job,
				nickname: action.payload.username,
				msg: action.payload.msg,
				city: action.payload.city,
				signature: action.payload.signature,
				sex: action.payload.sex,
			}
		default:
			return state
	}
}

/* -------------------- video------------------- */
export function video(state = videoinit, action) {
	switch (action.type) {
		case ActionTypes.SEND_VIDEO_COMMENT:
			return {
				...state,
				comment: [ ...state.comment, action.comment ],
			}
		case ActionTypes.GET_VIDEO_COMMENT:
			return {
				...state,
				comment: action.commentList,
			}
		case ActionTypes.SET_VIDEO_REPLY_COMMENT:
			return {
				...state,
				comment: [ ...state.comment, action.commentReply ],
			}
		case ActionTypes.GET_VIDEO_ISSUE:
			return {
				...state,
				issues: [ ...state.issues, ...action.issues ],
			}
		case ActionTypes.CREATE_PROBLEM_SUCCESS:
			return {
				...state,
				issues: [ ...state.issues, action.payload ],
				msg: '提交成功，请等待审核',
				code: action.code,
			}
		// case ActionTypes.COURSE_LIST:
		// 	return {
		// 		...state,
		// 		courses: [ ...action.payload ],
		// 	}
		case ActionTypes.FETCH_ONE_COURSE_VIDEO:
			return {
				...state,
				course: action.data,
				rate: action.data.rate,
				rateComment: action.data.rateComment,
			}
		case ActionTypes.COURSE_RATE:
			return {
				...state,
				rate: { ...state.rate, ...action.rateObj },
				rateComment: { ...state.rateComment, ...action.rateCommentObj },
				code: action.code,
			}
		default:
			return state
	}
}
/* -------------------- search------------------- */
export function search(state = searchInit, action) {
	switch (action.type) {
		case ActionTypes.SEARCH:
			return {
				...state,
				courses: action.payload.courses,
				problems: action.payload.problems,
				articles: action.payload.articles,
			}
		default:
			return state
	}
}

export function shoppingCart(state = shoppingCartInit, action) {
	switch (action.type) {
		case ActionTypes.GET_SHOPPING_CART:
			return {
				...state,
				courses: action.payload,
			}
		default:
			return state
	}
}

export function message(state = messageInit, action) {
	switch (action.type) {
		case ActionTypes.FETCH_MESSAGE:
			return {
				...state,
				msg: action.payload,
			}
		default:
			return state
	}
}

/* -------------------- advice------------------- */
export function advice(state = adviceInit, action) {
	switch (action.type) {
		case ActionTypes.FETCH_ADVICE:
			return {
				...state,
				advice: action.payload,
			}
		default:
			return state
	}
}

/* -------------------- 倒计时------------------- */
export function countDown(state = countDownInit, action) {
	switch (action.type) {
		case ActionTypes.COUNT_DOWN:
			return {
				...state,
				count: action.payload,
			}
		default:
			return state
	}
}

export default combineReducers({
	userstatus,
	course,
	courseInfo,
	article,
	problem,
	User,
	video,
	search,
	problemComment,
	report,
	shoppingCart,
	message,
	advice,
	countDown,
})
