<template>
  <div :class="{ EntriesList: true, 'EntriesList--DataLoaded': isLoaded, 'EntriesList--Blocks': isBlocks }">
    <h2 class="EntriesList__Title">{{ the_title }}</h2>

    <div class="EntriesList__Items" v-show="isLoaded" v-if="entries && entries.length">
      <EntriesListItem
        v-for="entry in entries"
        :entry="entry"
        :key="entry.id"
      />
    </div>

    <div v-if="entries && !entries.length" class="EntriesList__NoEntries">
      <p>No entries yet.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

import EntriesListItem from './EntriesListItem.vue'

export default {
  components: {
    EntriesListItem,
  },

  data() {
    return {
      isBlocks: false,
    }
  },

  computed: {
    isLoaded() {
      return this.entries && this.entries.length !== 0
    },

    ...mapState({
      the_title(state) {
        if ( typeof state.posts.categories[ state.posts.currentCategory ] === 'undefined' ) {
          return 'Ошибка'
        }

        return state.posts.categories[ state.posts.currentCategory ]
      },
    }),

    ...mapGetters({
      entries: 'posts/categoryPosts',
    })
  }
}
</script>
