export default {
  state: {
    rulesList: [],
    rulesListAux: []
  },

  getters: {
    rulesList: (state) => state.rulesList,

    rulesListAux: (state) => state.rulesListAux
  },

  mutations: {
    SET_RULES_LIST (state, rules) {
      localStorage.setItem('rulesList', JSON.stringify(rules))
      state.rulesList = rules
    },

    SET_AUX_RULES_LIST (state, rules) {
      localStorage.setItem('rulesListAux', JSON.stringify(rules))
      state.rulesListAux = rules
    },

    SET_RULES_SORT (state, rules) {
      localStorage.setItem('rulesListAux', JSON.stringify(rules))
      state.rulesListAux = rules
    },

    SET_RULE_STATUS (state, rules) {
      localStorage.setItem('rulesListAux', JSON.stringify(rules))
      state.rulesListAux = rules
    }
  },

  actions: {
    async getAll ({ commit }) {
      const rules = JSON.parse(localStorage.getItem('rulesList'))

      if (!rules) {
        throw new Error('No rules found')
      }

      if (rules && rules.length !== 0) {
        commit('SET_RULES_LIST', rules)
        commit('SET_AUX_RULES_LIST', rules)
      }
    },

    async createRule ({commit}, formData) {
      const rules = JSON.parse(localStorage.getItem('rulesList')) || []
      formData.id = rules ? rules.length + 1 : 1
      formData.status = 1
      rules.push(formData)
      commit('SET_RULES_LIST', rules)
      commit('SET_AUX_RULES_LIST', rules)
    },

    sortRules ({commit}, order) {
      const rules = JSON.parse(localStorage.getItem('rulesList'))
      const type = order.type
      const field = order.field

      const sortedSounds = rules.sort((a, b) => {
        return (type === 'asc') ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field])
      })

      commit('SET_RULES_SORT', sortedSounds)
    },

    updateStatus ({commit}, rule) {
      const rulesAux = JSON.parse(localStorage.getItem('rulesListAux'))

      const index = rulesAux.findIndex(r => r.id === Number(rule.id))
      rulesAux[index].status = rule.status

      commit('SET_RULES_LIST', rulesAux)
      commit('SET_AUX_RULES_LIST', rulesAux)
    }
  }
}
