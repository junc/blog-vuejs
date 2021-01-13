<template>
  <main class="Entry" role="main">
    <div class="Entry__Meta">
      <time :datetime="datetime">{{ date }}</time>
      &middot; In category <b>{{ category_name }}</b>
      &middot; {{ minutesToRead }} min read
    </div>
    <h1 class="Entry__Title">{{ entry.title }}</h1>
    <div class="Entry__Content" v-html="entry.content"></div>
    
    <div class="Entry__Tags" v-if="entry.tags && entry.tags.length">
      <ul class="Entry__Taglist">
        <li class="Entry__Taglist__Item" v-for="tag in entry.tags" :key="tag.id">
          <a class="Entry__Tag" :href="'/tag/' + tag.url">{{ tag.title }}</a>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

var dateformat = require('dateformat');

export default {
  name: 'Entry',
  props: {
    entry: Object
  },
  computed: {
    date() {
      let date = new Date(this.entry.created_date)
      return dateformat(date, 'd mmmm yyyy')
    },

    /**
     * ISO datetime for <time> tag.
     */
    datetime() {
      let date = new Date(this.entry.created_date)
      return date.toISOString()
    },

    /**
     * Count minutes to read the post.
     * 200 words per minute.
     */
    minutesToRead() {
      let content = this.entry.content

      // Remove tags and breaking lines
      content = content.replace(/<[^>]+>/g, '')
      content = content.replace(/ {2,}/g, ' ')
      content = content.replace(/(\r\n ?){2,}/g, '\r\n')

      let spaces  = content.split(/ +/).length
      let minutes = Math.ceil( spaces / 200 )
      return minutes;
    },

    ...mapState({
      /**
       * Get category title.
       */
      category_name(state) {
        let cat_url = this.entry.category_url

        if ( typeof state.posts.categories[ cat_url ] === 'undefined' ) {
          return 'Undefined'
        }

        return state.posts.categories[ cat_url ]
      }
    })
  },
}
</script>
