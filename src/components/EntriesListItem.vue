<template>
  <div class="EntryItemWrapper">
  <div class="EntryItem">
    <div class="EntryItem__Picture" :style="entry.picture_url ? 'background-image: url(' + entry.picture_url + ')' : ''"></div>

    <div class="EntryItem__Inner">
      <div class="EntryItem__Meta">
        <time :datetime="datetime">{{ date_dmy }}</time> &middot;
        In category <b>{{ category_name }}</b>
      </div>
      <h3 class="EntryItem__Title" v-html="entry.title"></h3>
      <div class="EntryItem__Content" v-html="entry.excerpt"></div>
    </div>

    <a :href="'/post/' + entry.url" class="EntryItem__Link"></a>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

var dateformat = require('dateformat');

export default {
  props: {
    entry: Object
  },
  computed: {
    date_d() {
      let date = new Date(this.entry.created_date)
      return dateformat(date, 'dd')
    },
    date_m() {
      let date = new Date(this.entry.created_date)
      return dateformat(date, 'mmm')
    },
    date_dmy() {
      let date = new Date(this.entry.created_date)
      return dateformat(date, 'dd mmmm yyyy')
    },
    datetime() {
      let date = new Date(this.entry.created_date)
      return date.toISOString()
    },

    /**
     * Used to mark post title.
     * If title too long some words can
     * breaking to new lines.
    */
    // the_title() {
    //   let title = this.entry.title
    //   title = '<span>' + title.split(' ').join('</span><span> </span><span>') + '</span>';
    //   return title
    // },

    ...mapState({
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
