import Vue from 'vue'
import Vuex from 'vuex'

import posts from './modules/posts.js'
import pages from './modules/pages.js'
import components from './modules/components.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    posts,
    pages,
    components,
  },
  strict: debug,
})
