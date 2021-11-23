
export default {
  namespaced: true,
  state: () => ({
    current: {
    },
  }),
  mutations: {
    setCurrentOrder (state, order) {
      state.current = order
    }
  },
}
