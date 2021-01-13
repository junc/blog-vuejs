<template>
  <a
    :href="href"
    :class="{ Header__LinkActive: isActive }"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: String,
    required: true,
  },
  computed: {
    isActive() {
      let pathname = this.$store.state.components.pathname;

      if ( this.href === '/' ) {
        return pathname === this.href
      }

      // Mark the category of post
      if ( pathname.indexOf('/post/') === 0 ) {
        let post = this.$store.state.posts.currentPost
        let cat_url = '/category/' + post.category_url

        return cat_url === this.href
      }

      return this.href === pathname
    },

  },
}
</script>
