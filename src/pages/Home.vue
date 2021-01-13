<template>
  <MainLayout>
    <EntriesList
      :offset="offset"
      :class="entriesListClasses"
    />
  </MainLayout>
</template>

<script>
import { mapState } from 'vuex'

import MainLayout from '../layouts/Main.vue'
import EntriesList from '../components/EntriesList.vue'

export default {
  components: {
    MainLayout,
    EntriesList,
  },

  metaInfo() {
    return {
      title: this.the_title === 'Все записи' ? 'Codemeo' : this.the_title,
    }
  },

  data() {
    return {
      component: 'EntriesList',
      offset: 0,
      entriesListClasses: '',
    };
  },

  computed: {
    ...mapState({
      the_title(state) {
        if ( typeof state.posts.categories[ state.posts.currentCategory ] === 'undefined' ) {
          return 'Ошибка'
        }

        return state.posts.categories[ state.posts.currentCategory ]
      },
    }),
  }
}
</script>
