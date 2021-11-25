export default {
  state: {
    statusList: [],
    actionsList: [],
    whenList: []
  },

  getters: {
    statusList: (state) => state.statusList,

    actionsList: (state) => state.actionsList,

    whenList: (state) => state.whenList
  },

  mutations: {
    SET_STATUS_LIST (state, status) {
      localStorage.setItem('statusList', JSON.stringify(status))
      state.statusList = status
    },

    SET_ACTIONS_LIST (state, actions) {
      localStorage.setItem('actionsList', JSON.stringify(actions))
      state.actionsList = actions
    },

    SET_WHEN_LIST (state, when) {
      state.showSpinner = when
    },
  },

  actions: {
    async getStatusList ({ commit }) {
      try {
        const response = await fetch('data/status.json')
        const data = await response.json()

        commit('SET_STATUS_LIST', data)
      } catch (error) {
        console.log('catch', error)
      }
    },

    async getActionsList ({ commit }) {
      try {
        const response = await fetch('data/actions.json')
        const data = await response.json()

        commit('SET_ACTIONS_LIST', data)
      } catch (error) {
        console.log('catch', error)
      }
    },

    async getWhenList ({ commit }) {
      try {
        const response = await fetch('data/when.json')
        const data = await response.json()

        commit('SET_WHEN_LIST', data)
      } catch (error) {
        console.log('catch', error)
      }
    }
  }
}
