import Vue from 'vue'
import Vuex from 'vuex'
import channels from './modules/channels'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    channels
  }
})
export default store
