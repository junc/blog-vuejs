<template>
  <MainLayout>
    <Entry
      v-show="entry"
      :entry="entry"
      :class="entryClasses"
    />
    <div class="CommentsTitleWrapper" v-show="entry && ! readyToComments" @click="toggleComments">
      <div class="CommentsTitle">Comments</div>
    </div>
    <div class="Comments" v-if="entry && readyToComments">
      <vue-disqus shortname="codemeo-com" :identifier="page_id" :url="absolute_page_url"></vue-disqus>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Entry from '../components/Entry.vue'

export default {
  components: {
    MainLayout,
    Entry,
  },

  /**
   * Metas of article.
   */
  metaInfo() {
    return {
      title: this.entry.title,
      // titleTemplate: '%s | Codemeo',

      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.entry.excerpt
        },
        {
          property: 'og:title',
          content: this.entry.title,
          template: '%s'
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          property: 'og:url',
          content: this.absolute_page_url
        },
        {
          property: 'og:image',
          content: this.entry.picture_url
        },
        {
          property: 'og:site_name',
          content: 'Codemeo'
        },
        {
          property: 'og:description',
          content: this.entry.excerpt
        },
      ]
    }
  },

  data() {
    return {
      entryClasses: '',

      readyToComments: false,
    };
  },

  activated() {
    this.entryClasses = 'Entry--Loaded'

    // setTimeout(() => {
    //   this.readyToComments = true
    // }, 300);
  },

  deactivated() {
    this.readyToComments = false
  },

  methods: {
    toggleComments() {
      this.readyToComments = !this.readyToComments;
    },
  },

  computed: {
    entry() {
      return this.$store.state.posts.currentPost;
    },

    page_id() {
      return this.entry.url
    },

    absolute_page_url() {
      return 'https://codemeo.com/post/' + this.entry.url
    },
  },
}
</script>
