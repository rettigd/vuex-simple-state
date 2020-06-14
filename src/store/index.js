import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { yVuexSet } from './../plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '',
    user: {
      email: '',
      color: '',
      job: ''
    }
  },
  mutations: {
    yVuexSet,
    set (state, value) {
      _.set(state, value.attribute, value.value);
    }
  },
  actions: {
  },
  modules: {
  }
})
