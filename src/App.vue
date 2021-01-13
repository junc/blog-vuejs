<template>
  <div id="app">
    <Header />
    
    <keep-alive>
      <component :is="component"></component>
    </keep-alive>

    <keep-alive>
      <HomeLoaderComponent v-if="isLoading" />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Header from './components/Header.vue'

import HomeComponent from './pages/Home.vue'
import EntryComponent from './pages/Entry.vue'
import PageComponent from './pages/Page.vue'
import ErrorComponent from './pages/Error.vue'
import HomeLoaderComponent from './pages/HomeLoader.vue'

export default {
  name: 'App',

  components: {
    Header,
    HomeComponent,
    EntryComponent,
    PageComponent,
    ErrorComponent,
    HomeLoaderComponent,
  },

  metaInfo: {
    title: 'Codemeo',
    meta: [{
      vmid: 'description',
      name: 'description',
      content: 'Статьи и рассуждения о путешествиях, жизни и саморазвитии'
    }],
  },

  computed: mapState({
    component: state => state.components.current,
    isLoading: state => {
      // Scroll to top when page is loaded
      // if ( state.components.isLoading === false ) {
      //   let app = window.document.getElementById('app')
      //   if (app && typeof app.scrollTo === 'function') {
      //     app.scrollTo(0, 0)
      //   }
      // }
      
      return state.components.isLoading
    },
  }),
}
</script>
