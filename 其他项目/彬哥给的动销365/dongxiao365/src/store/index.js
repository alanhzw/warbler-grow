import Vue from 'vue'
import Vuex from 'vuex'
import visitRecord from './modules/visit_record'
import cusDetail from './modules/cus_detail'

Vue.use(Vuex)

// 暴露Store
export default new Vuex.Store({
	// 模块
	modules: {
		visitRecord,
    cusDetail
	},
	strict: process.env.NODE_ENV !== 'production'
})
