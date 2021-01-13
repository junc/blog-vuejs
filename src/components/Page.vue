<template>
  <main class="Page" role="main">
    <h1 class="Page__Title">{{ page.title }}</h1>
    <div class="Page__Content" v-html="page.content"></div>
  </main>
</template>

<script>
export default {
  name: 'Page',
  props: {
    page: Object
  },
  methods: {
    
  }
}
</script>
