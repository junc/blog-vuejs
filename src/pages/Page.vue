<template>
  <MainLayout>
    <Page
      v-show="page"
      :page="page"
      :class="pageClasses"
    />
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Page from '../components/Page.vue'

export default {
  components: {
    MainLayout,
    Page,
  },

  metaInfo() {
    return {
      title: this.page.title,
    }
  },

  data() {
    return {
      pageClasses: '',
    };
  },

  activated() {
    this.pageClasses = 'Page--Loaded'
  },

  computed: {
    page() {
      return this.$store.state.pages.currentPage;
    }
  },
}
</script>
