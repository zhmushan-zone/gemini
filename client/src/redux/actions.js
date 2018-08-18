import axios from 'axios'
import Cookies from 'js-cookie'
import * as ActionTypes from './actionTypes'

function errorMsg(msg) {
	return { msg, code: 0, type: ActionTypes.ERROR_MSG }
}

export function removeMsg() {
	return { msg: '', type: ActionTypes.REMOVE_MSG }
}

// 加载数据
export function loadData(userinfo) {
	return { type: ActionTypes.LOAD_DATA, payload: userinfo }
}

/* --------------------------------------------------注册-------------------------------------------------------------- */

function authSuccess(obj) {
	const { data } = obj
	return { msg: '', type: ActionTypes.AUTH_SUCCESS, payload: { ...obj }, avatar: data.avatar }
}

export function register(username, password, repet_pass) {
	console.log(username)
	if (!username || !password || !repet_pass) {
		return errorMsg('请输入注册的账号的密码')
	}
	if (username.length < 6) {
		return errorMsg('用户名最少6位')
	}
	if (password.length < 6 || password.length >= 14) {
		return errorMsg('密码个数不能少于６位或者大于14位')
	}
	if (password !== repet_pass) {
		return errorMsg('两次密码不一致')
	}
	return async (dispatch) => {
		const email = Cookies.get('email')
		const captcha = Cookies.get('captcha')
		const res = await axios({
			method: 'post',
			url: '/api/users/register',
			headers: {
				captcha: captcha
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
			dispatch(errorMsg('未知错误'))
		} else if (res.data.code === 102) {
			dispatch(errorMsg('用户已存在'))
		} else if (res.data.code === 104) {
			dispatch(errorMsg('请输入正确的验证码'))
		}
	}
}
/* --------------------------------------------------忘记密码-------------------------------------------------------------- */

function forgetPass(email) {
	return { msg: '', type: ActionTypes.FORGET_PASS, email }
}

export function forgetPassword(forget_email) {
	var regex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	if (!forget_email) {
		return errorMsg('请输入邮箱')
	}
	if (!regex.test(forget_email)) {
		return errorMsg('请输入正确的邮箱格式')
	}
	return async (dispatch) => {
		const res = await axios.post('/user/forget', { forget_email })
		if (res.data.code === 1) {
			dispatch(forgetPass(forget_email))
		} else {
			dispatch(res.data.msg)
		}
	}
}
/* --------------------------------------------------登录-------------------------------------------------------------- */

export function login(username, password) {
	if (!username || !password) {
		return errorMsg('请输入账号或者密码')
	}
	return async (dispatch) => {
		const res = await axios.post('/api/users/login', { username, password })
		if (res.data.code === 1) {
			Cookies.set('_id', res.data.data.id)
			Cookies.set('_token', res.data.data.token)
			dispatch(authSuccess({ username, password, data: res.data.data }))
		} else if (res.data.code === 100) {
			dispatch(errorMsg('登录失败'))
		} else if (res.data.code === -1) {
			dispatch(errorMsg('未知错误'))
		} else {
			dispatch(errorMsg('后端错误'))
		}
	}
}
/* --------------------------------------------------修改个人信息-------------------------------------------------------------- */

// 修改成功
function updateSuccesss(obj) {
	return { payload: { ...obj }, type: ActionTypes.UPDATE_PERSON_MSG }
}

export function changePersonMsg(a) {
	const { sex, username, job, city, signature } = a
	const _id = Cookies.get('_id')
	const _token = Cookies.get('_token')
	console.log(_id)
	return async (dispatch) => {
		const res = await axios({
			method: 'put',
			url: '/api/users',
			headers: {
				id: _id,
				token: _token
			},
			data: {
				nickname: username,
				sex,
				job,
				city,
				signature
			}
		})
		if (res.data.code === 1) {
			return dispatch(updateSuccesss({ msg: res.data.msg, sex: sex === 1 ? '男' : '女', username, job, city, signature }))
		} else {
			return dispatch(errorMsg('修改失败了'))
		}
	}
}
/* --------------------------------------------------注册发送邮件-------------------------------------------------------------- */

// 发送邮箱成功
function sendEmailSuccess() {
	let code = 1
	return { type: ActionTypes.SEND_EMAIL_SUCCESS, code: code }
}

export function RegisterSendEamil(email) {
	if (!email) {
		return errorMsg('请输入邮箱')
	}
	var regex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	if (!regex.test(email)) {
		return errorMsg('邮箱格式错误')
	}
	return async (dispatch) => {
		const res = await axios.post(`/api/users/email/send/${email}`)
		Cookies.set('email', email)
		if (res.data.code === 1) {
			dispatch(sendEmailSuccess())
		} else if (res.data.code === 103) {
			dispatch(errorMsg('发送验证码太过频发', 0))
		} else {
			dispatch(errorMsg('验证码错误', 0))
		}
	}
}
/* --------------------------------------------------检测是否验证码正确-------------------------------------------------------------- */

export function checkedCaptcha(captcha) {
	if (!captcha) {
		return errorMsg('验证码都不写吗？')
	}
	const email = Cookies.get('email')
	return async (dispatch) => {
		const res = await axios({
			method: 'post',
			url: `/api/users/email/validate/${email}`,
			headers: {
				captcha: captcha
			}
		})
		if (res.data.code === 1) {
			Cookies.set('captcha', captcha)
		}
	}
}
/* --------------------------------------------------登出-------------------------------------------------------------- */

export function logout() {
	Cookies.remove('_id')
	Cookies.remove('_token')
	return { type: ActionTypes.LOGOUT, username: '', id: '' }
}

/* --------------------------------------------------修改头像-------------------------------------------------------------- */
function changeAvatarFunc(now) {
	return { type: ActionTypes.CHANGE_AVATAR, avatar: now }
}

export function changeAvatar(name) {
	return changeAvatarFunc(name)
}

/* --------------------------------------------------创建课程-------------------------------------------------------------- */
// 创建课程成功
function createCourseSuccess(course) {
	const code = 1
	return { type: ActionTypes.CREATE_COURSE_SUCCESS, payload: course, code: code }
}

export function createCourse(course) {
	const _token = Cookies.get('_token')
	return async (dispatch) => {
		try {
			const res = await axios({
				method: 'post',
				url: '/api/courses',
				headers: {
					token: _token
				},
				data: {
					...course
				}
			})
			if (res.data.code === 1) {
				dispatch(createCourseSuccess(res.data.data))
			}
		} catch (error) {
			dispatch(errorMsg('服务端错误'))
		}
	}
}
/* --------------------------------------------------获取课程列表-------------------------------------------------------------- */
// 课程列表
function courseList(courses) {
	return { type: ActionTypes.COURSE_LIST, payload: courses }
}
export function getCourseList() {
	return async (dispatch) => {
		const res = await axios.get('/api/courses')
		if (res.data.code === 1) {
			dispatch(courseList(res.data.data))
		}
	}
}

/* --------------------------------------------------删除课程-------------------------------------------------------------- */
// 课程删除成功
function courseDeleteSuccess() {
	let code = 1
	return { type: ActionTypes.COURSE_DELETE_SUCCESS, code: code }
}
export function deleteCourse(id) {
	const _token = Cookies.get('_token')
<<<<<<< HEAD
	return async dispatch => {
		try {
			const res = await axios({
				method: 'delete',
				url: `/api/courses/${id}`,
				headers: {
					token: _token
				}
			})
			if (res.data.code === 1) {
				dispatch(courseDeleteSuccess())
=======
	return async (dispatch) => {
		const res = await axios({
			method: 'delete',
			url: `/api/courses/${id}`,
			headers: {
				token: _token
>>>>>>> f6dc6979a2ef794d899608d2872407eb8020a469
			}
		} catch (error) {
			dispatch(errorMsg('服务端错误'))
		}
	}
}
/* ---------------------------------------------------- 创建问题----------------------------------------------------------------------- */
function createProblemSuccess(problem) {
	const code = 1
	return { type: ActionTypes.CREATE_PROBLEM_SUCCESS, payload: problem, code: code }
}

export function createProblem(problem) {
	const _token = Cookies.get('_token')

	return async (dispatch) => {
		try {
			const res = await axios({
				method: 'post',
				url: '/api/issues',
				headers: {
					token: _token
				},
				data: {
					...problem
				}
			})
			if (res.data.code === 1) {
				dispatch(createProblemSuccess(res.data.data))
			}
		} catch (error) {
			dispatch(errorMsg("服务端错误"))
		}
	}
}
/* ---------------------------------------------------- 获取问题列表----------------------------------------------------------------------- */
function problemList (problem) {
	return { type: ActionTypes.PROBLEM_LIST, payload: problem }
}

export function getProblemList () {
	return async dispatch => {
		const res = await axios.get('/api/issues')
		if (res.data.code === 1) {
			dispatch(problemList(res.data.data))
		}
	}
}
/* ---------------------------------------------------- 更新讨论区标签----------------------------------------------------------------------- */
function updateForumTagsSuccess(tags) {
	return { type: ActionTypes.UPDATE_FORUM_TAGS, tags: tags }
}

export function updateForumTags(tags) {
	const _token = Cookies.get('_token')
	return async (dispatch) => {
		const res = await axios({
			method: 'put',
			url: '/api/users/tags',
			headers: {
				token: _token
			},
			data: {
				tags
			}
		})
		if (res.data.code === 1) {
			dispatch(updateForumTagsSuccess(tags))
		} else {
			dispatch(errorMsg('讨论区关注分类更新失败'))
		}
	}
}
/* ---------------------------------------------------- ARTICLE----------------------------------------------------------------------- */
function createArticlError(msg) {
	return { msg, code: 0, type: ActionTypes.CREATE_ARTICLE_ERROR }
}

function createArticleSuccess(article) {
	let code = 1
	return { type: ActionTypes.CREATE_ARTICLE_SUCCESS, article: article, code }
}
export function publishArticle(state) {
	const { articleName, articleContent, articleTag, articleImage } = state
	if (!articleName) {
		return createArticlError('文章没有名字吗？')
	} else if (!articleContent) {
		return createArticlError('文章没有内容吗？')
	} else if (!articleImage) {
		return createArticlError('文章没有图片吗？')
	} else if (!articleTag) {
		return createArticlError('文章没有标签吗？')
	}
	return async (dispatch) => {
		const _token = Cookies.get('_token')
		const res = await axios({
			method: 'post',
			url: '/api/articles',
			headers: {
				token: _token
			},
			data: {
				title: articleName,
				coverImg: articleImage,
				type: articleTag,
				content: articleContent
			}
		})
		if (res.data.code === 1) {
			dispatch(createArticleSuccess(res.data.data))
			console.log(res)
		} else {
			dispatch(createArticlError('服务端错误'))
		}
	}
}

/* fetch one  */
function fetchOneArticleSuccess(data) {
	return { type: ActionTypes.FETCH_ONE_ARTICLE, data }
}
export function fetchArticleOne(id) {
	return async (dispatch) => {
		const res = await axios({
			method: 'get',
			url: `/api/articles/${id}`
		})
		if (res.data.code === 1) {
			dispatch(fetchOneArticleSuccess(res.data.data))
		} else {
			console.log('服务器出故障了')
		}
	}
}
