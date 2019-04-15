import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './auth'
import * as scenario from './scenario'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: {
      namespaced: true,
      ...auth
    },
    scenario: {
      namespaced: true,
      ...scenario
    }
  }
})
