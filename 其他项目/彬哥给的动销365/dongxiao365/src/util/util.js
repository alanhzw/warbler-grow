
// transfer
Vue.prototype.transChara = function (value) {
  if (value !== null && value !== undefined) {
    value = value.replace(/&/gi, '&amp;')
    value = value.replace(/</gi, '&lt;')
    value = value.replace(/>/gi, '&gt;')
    value = value.replace(/"/gi, '&quot;')
    value = value.replace(/ /gi, '&nbsp;')
    return value
  }
}
// 扩展数组方法，判断是否存在
Array.prototype.contains = function (obj, attr) {
	let i = this.length
	while (i--) {
		if (this[i] === obj) {
			return true
		}
		if (attr) {
			if (this[i][attr] === obj[attr]) {
				return true
			}
		}
	}
	return false
}

Array.prototype.remove = function (obj, attr) {
	if (this.contains(obj, attr)) {
		let i = this.length
		while (i--) {
			if (attr) {
				if (this[i][attr] === obj[attr]) {
					break
				}
			}
			if (this[i] === obj) {
				break
			}
		}
		this.splice(i, 1)
		return true
	} else {
		return 'no exist'
	}
}

Array.prototype.indexOf = function (obj, attr) {
	let i = this.length
	while (i--) {
		if (attr) {
			if (this[i][attr] === obj[attr]) {
				return i
			}
		}
		if (this[i] === obj) {
			return i
		}
	}
	return -1
}

Array.prototype.get = function (obj, attr) {
	let i = this.length
	while (i--) {
		if (attr) {
			if (this[i][attr] === obj[attr]) {
				return this[i]
			}
		}
		if (this[i] === obj) {
			return this[i]
		}
	}
	return null
}

Array.prototype.convert = function (attr) {
	const list = []
	this.forEach(item => {
		list.push(item[attr])
	})
	return list
}

String.prototype.toLongArray = function (split) {
	if (!split) { split = ',' }
	const str = this.replace(/\[|\]/gi, '')
	return str.split(split)
}


Vue.prototype.formatDate = function (inputTime, fmt) {
  if (inputTime) {
      const date = new Date(inputTime)
      if (!fmt) { fmt = 'yyyy-MM-dd' }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate() // 日
      }
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)) }
      }
      return fmt
    } else {
      return ''
    }
}



module.exports = {
	format_date: function (inputTime, fmt) {
		if (inputTime) {
			const date = new Date(inputTime)
			if (!fmt) { fmt = 'yyyy-MM-dd' }
			const o = {
				'M+': date.getMonth() + 1,
				'd+': date.getDate() // 日
			}
			if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
			for (const k in o) {
				if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)) }
			}
			return fmt
		} else {
			return ''
		}
	},
	format_time: function (inputTime, fmt) {
		if (inputTime) {
			const date = new Date(inputTime)
			if (!fmt) { 
				fmt = 'yyyy-MM-dd hh:mm:ss' 
			}
			const o = {
				'M+': date.getMonth() + 1, // 月份
				'd+': date.getDate(), // 日
				'h+': date.getHours(), // 小时
				'm+': date.getMinutes(), // 分
				's+': date.getSeconds(), // 秒
				'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
				'S': date.getMilliseconds() // 毫秒
			}
			if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
			for (const k in o) {
				if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)) }
			}
			return fmt
		} else {
			return ''
		}
	},
	build_sort: function (page, sort) {
		if (sort.order === 'ascending') {
			page.sortOrder = 'asc'
			page.sortName = sort.prop
		} else if (sort.order === 'descending') {
			page.sortOrder = 'desc'
			page.sortName = sort.prop
		} else {
			page.sortName = null
			page.sortOrder = null
		}
	},
	token: function (n) {
		if (!n) {
			n = 16
		}
		const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
		let t = ''
		for (let i = 0; i < n; i++) {
			t += hex[Math.floor(Math.random() * 36)]
		}
		return t
	},
	extend: function (source, target, target2, target3) {
		function getType(obj) { // tostring会返回对应不同的标签的构造函数
			const toString = Object.prototype.toString
			const map = {
				'[object Boolean]': 'boolean',
				'[object Number]': 'number',
				'[object String]': 'string',
				'[object Function]': 'function',
				'[object Array]': 'array',
				'[object Date]': 'date',
				'[object RegExp]': 'regExp',
				'[object Undefined]': 'undefined',
				'[object Null]': 'null',
				'[object Object]': 'object'
			}
			if (obj instanceof Element) {
				return 'element'
			}
			return map[toString.call(obj)]
		}

		function deepClone(data) {
			const type = getType(data)
			let obj
			if (type === 'array') {
				obj = []
			} else if (type === 'object') {
				obj = {}
			} else {
				// 不再具有下一层次
				return data
			}
			if (type === 'array') {
				for (let i = 0, len = data.length; i < len; i++) {
					obj.push(deepClone(data[i]))
				}
			} else if (type === 'object') {
				for (const key in data) {
					obj[key] = deepClone(data[key])
				}
			}
			return obj
		}

		let newObj = {}
		if (source) {
			newObj = deepClone(source)
		}
		if (target) {
			for (const p1 in target) {
				newObj[p1] = target[p1]
			}
		}
		if (target2) {
			for (const p2 in target2) {
				newObj[p2] = target2[p2]
			}
		}
		if (target3) {
			for (const p3 in target3) {
				newObj[p3] = target3[p3]
			}
		}
		return newObj
	},
	getPropertyList(list, property) {
		const values = []
		property = property || 'id'
		list.forEach(item => {
			values.push(item[property])
		})
	},
	getCurrentUser() {
		return JSON.parse(decodeURIComponent(decodeURIComponent(window.localStorage.getItem('user'))))
	},
	url: {
		query: function (val) {
			const uri = window.location.search
			const re = new RegExp('' + val + '=([^&?]*)', 'ig')
			return uri.match(re) ? uri.match(re)[0].substr(val.length + 1) : null
		}
	},
	onGlobalError: function () {

	}
}



