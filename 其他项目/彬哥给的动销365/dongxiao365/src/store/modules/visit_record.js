// import Service from 'service'


import * as TYPES from '../types'
import Service from '../../util/http'
// Vue.prototype.$http = service
// import message from 'element-ui/lib/message'

const state = {
	mine: {
		loading: false,
		data: {}
	},
	staff: {
		loading: false,
		data: {}
	},
	underling: {
		loading: false,
		data: {}
	}
}

const mutations = {
	[TYPES.GET_MINE_LIST](state, action) {
		state.mine.loading = true
	},

	[TYPES.GET_MINE_LIST_SUCCESS](state, action) {
		state.mine.loading = false
		console.log('action', action)
		state.mine.data = action
	},

	[TYPES.GET_MINE_LIST_FAILURE](state, action) {
		state.mine.loading = false
	},

	[TYPES.GET_STAFF_LIST](state, action) {
		state.staff.loading = true
	},

	[TYPES.GET_STAFF_LIST_SUCCESS](state, action) {
		state.staff.loading = false
		state.staff.data = action
	},

	[TYPES.GET_STAFF_LIST_FAILURE](state, action) {
		state.staff.loading = false
	},

	[TYPES.GET_UNDERLING_LIST](state, action) {
		state.underling.loading = true
	},

	[TYPES.GET_UNDERLING_LIST_SUCCESS](state, action) {
		state.underling.loading = false
		state.underling.data = action
	},

	[TYPES.GET_UNDERLING_LIST_FAILURE](state, action) {
		state.underling.loading = false
	}
}

const actions = {
	// 我的任务记录
	[TYPES.GET_MINE_LIST]({commit, dispatch}, params = {}) {
		commit(TYPES.GET_MINE_LIST)
		return Service.get('crm/visit/execute/mine', params, r => {
			if (r.code === 0) {
				commit(TYPES.GET_MINE_LIST_SUCCESS, r.data)
			} else {
				commit(TYPES.GET_MINE_LIST_FAILURE)
			}
		})
	},

	// 员工的任务记录
	[TYPES.GET_STAFF_LIST]({commit, dispatch}, params = {}) {
		commit(TYPES.GET_STAFF_LIST)
		return Service.get('crm/visit/execute/all', params, r => {
			if (r.code === 0) {
				commit(TYPES.GET_STAFF_LIST_SUCCESS, r.data)
			} else {
				commit(TYPES.GET_STAFF_LIST_FAILURE)
			}
		})

	},

	// 我下属的任务记录
	[TYPES.GET_UNDERLING_LIST]({commit, dispatch}, params = {}) {
		commit(TYPES.GET_UNDERLING_LIST)
		return Service.get('crm/visit/execute/sub', params, r => {
			if (r.code === 0) {
				commit(TYPES.GET_UNDERLING_LIST_SUCCESS, r.data)
			} else {
				commit(TYPES.GET_UNDERLING_LIST_FAILURE)
			}
		})
	}
}


export default {
	state,
	actions,
	mutations
}
