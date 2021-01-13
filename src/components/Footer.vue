<template>
  <footer class="Footer">
    &copy; {{ years }} Codemeo
  </footer>
</template>

<script>
export default {
  computed: {

    // Dymanic years
    // 2019 - {current year}
    years() {
      const site_year = 2019

      let current_year = new Date().getFullYear()

      if (site_year === current_year) {
        return current_year
      } else {
        return site_year + ' - ' + current_year
      }
    }
  }
}
</script>
