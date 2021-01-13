<template>
  <div class="Main">
    <div class="MainLayout">
      <slot></slot>

      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  components: {
    Footer,
  }
}
</script>
