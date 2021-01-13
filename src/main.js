import Vue from 'vue'
import store from './store'

import App from './App.vue'
import VueAnalytics from 'vue-analytics'
import VueDisqus from 'vue-disqus'
import Meta from 'vue-meta'

Vue.use(VueAnalytics, {
  id: 'UA-136406777-1'
})

Vue.use(Meta)
Vue.use(VueDisqus)

import routers from './routers'
import './events'

import './assets/sass/main.scss'

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})

routers.init({ app })
