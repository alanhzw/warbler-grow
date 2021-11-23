import Vue from "vue"
import App from './App'
import router from './router/router'
import elNumber from './components/lib/el-number'
import elSearch from './components/lib/search'
import http from './util/http.js'
import util from './util/util.js'
import store from './store'

import filters from './filters'
import './element-variables.scss'
import './assets/css/all.scss'
import './assets/css/index.css'

import breadcrumb from '@/components/inc/breadcrumb'

// 将API方法绑定到全局
Vue.prototype.$http = http
Vue.prototype.$util = util
// Vue.prototype.appId = 6497
// Vue.prototype.appId = 6499
Vue.prototype.appId = process.env.APP_ID

Vue.component('breadcrumb', breadcrumb)
Vue.component('el-number', elNumber)
Vue.component('el-search', elSearch)

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.directive('auth', {
	bind: function (el, binding) {
		const value = binding.value
		const authority = localStorage.authority
		if (authority.indexOf(value) < 0) {
			el.style.display = 'none !important'
			el.remove()
		}
	},
	update: function (el, binding) {
		const value = binding.value
		const authority = localStorage.authority
		if (authority.indexOf(value) < 0) {
			el.style.display = 'none !important'
			el.remove()
		}
	}
},
// 'translate', {
//     bind: function (el, binding) {
//       console.log('customerForm.description', binding)
//       // val.replace('&', '&amp;')
//       // val.replace('<', '&lt;')
//       // val.replace('>', '&gt;')
//       // val.replace('"', '&quot;')
//       // val.replace(' ', '&nbsp;')
//       // val.replace(' ', '&nbsp;')
//     },
//     update: function (el, binding) {
//       const value = binding.value
//       const authority = localStorage.authority
//       if (authority.indexOf(value) < 0) {
//         el.style.display = 'none !important'
//         el.remove()
//       }
//     }
//   }



)

const vm = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {App}
})

window.vm = vm
