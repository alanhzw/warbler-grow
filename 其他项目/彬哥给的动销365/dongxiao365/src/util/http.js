

// 引用axios
const util = require('./util')

// 配置API接口地址
const root = process.env.API_ROOT

// 自定义判断元素类型JS
function toType(obj) {
	return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
	for (const key in o) {
		if (o[key] === null) {
			delete o[key]
		}
		if (toType(o[key]) === 'string') {
			o[key] = o[key].trim()
		} else if (toType(o[key]) === 'object') {
			o[key] = filterNull(o[key])
		} else if (toType(o[key]) === 'array') {
			o[key] = filterNull(o[key])
		}
	}
	return o
}

// 没有令牌
function onNoAuth() {
	window.location.href = '/#/login'
}

function renew() {
	const expire = localStorage.expire
	if (expire > 0) {
		const currentTime = new Date().getTime()
		const time = parseInt(expire, 10) * 1000 // to ms
		const expireTime = util.format_time(new Date(currentTime + time))
		localStorage.expireTime = expireTime
	} else {
		localStorage.removeItem('expireTime')
	}
}

// 请求成功
function onSuccess(res, success, failure) {
	if (res.data.code === 0) {
		if (success) {
			success(res.data)
		}
	} else if (res.data.success) {
		if (success) {
			success(res.data)
		}
	} else if (res.data.code === 801) {
		onNoAuth()
	} else {
		onError(res.data, failure)
	}
}

// 请求失败
function onError(res, failure) {
	console.error(res)
	if (failure) {
		failure(res)
	} else {
		if (res.code === 801) {
			onNoAuth()
		} else {
			window.vm.$message.error(res.msg)
		}
	}
}

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/
function apiAxios(method, url, params, success, failure) {
	const asscessToken = localStorage.getItem('access_token')
	params = filterNull(params)
	const token = util.token()
	axios({
		method: method,
		url: url,
		data: method === 'POST' || method === 'PUT' ? params : null,
		params: method === 'GET' || method === 'DELETE' ? params : null,
		headers: {
      'access-token': asscessToken,
			'State': token
		},
		baseURL: root,
		withCredentials: false
	})
		.then(function (res) {
			renew()// 令牌续约
			onSuccess(res, success, failure)
		})
		.catch(function (res) {
			renew()// 令牌续约
			onError(res, failure)
		})
}

// 返回在vue模板中的调用接口
export default {
	root: root,
	get: function (url, params, success, failure) {
		return apiAxios('GET', url, params, success, failure)
	},
	post: function (url, params, success, failure) {
		return apiAxios('POST', url, params, success, failure)
	}
}
