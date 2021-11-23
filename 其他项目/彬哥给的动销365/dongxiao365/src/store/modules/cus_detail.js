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
  all: {
    loading: false,
    data: {}
  },
  underling: {
    loading: false,
    data: {}
  }
}

const mutations = {
  [TYPES.GET_CUS_DETAIL](state, action) {
    state.mine.loading = true
  },

  [TYPES.GET_CUS_DETAIL_SUCCESS](state, action) {
    if (action.type === 1) {
      state.mine.data = action.data
    } else if (action.type === 0) {
      state.all.data = action.data
    } else if (action.type === 3) {
      state.underling.data = action.data
    }
  },

  [TYPES.GET_CUS_DETAIL_FAILURE](state, action) {
    state.mine.loading = false
  }
}

const actions = {
  // 我的任务记录
  [TYPES.GET_CUS_DETAIL]({commit, dispatch}, params = {}) {
    commit(TYPES.GET_CUS_DETAIL)
    return Service.get('/crm/customer/list', params, r => {
      if (r.code === 0) {
        commit(TYPES.GET_CUS_DETAIL_SUCCESS, {data: r.data, type: params.searchFlg})
      } else {
        commit(TYPES.GET_CUS_DETAIL_FAILURE)
      }
    })
  }


}


export default {
  state,
  actions,
  mutations
}
