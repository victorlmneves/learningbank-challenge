import Vue from 'vue'
import Vuex from 'vuex'

import rules from './modules/rules'
import options from './modules/options'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    rules,
    options
  }
})

export default store
