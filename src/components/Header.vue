<template>
  <header class="Header">
    <div class="Header__Main">
      <div class="Header__Logo">
        <HeaderLink href="/">Codemeo</HeaderLink>
      </div>

      <ul class="Header__List">
        <li><HeaderLink href="/about">About</HeaderLink></li>
        <li><HeaderLink href="/contact">Contact</HeaderLink></li>
      </ul>
    </div>

    <div class="Header__Navigation">
      <ul class="Header__List">
        <li><HeaderLink href="/">All entries</HeaderLink></li>
        <li><HeaderLink href="/category/travel">Travel</HeaderLink></li>
        <li><HeaderLink href="/category/thoughts">Thoughts</HeaderLink></li>
        <li><HeaderLink href="/category/other">Other</HeaderLink></li>
      </ul>
    </div>
  </header>
</template>

<script>
import HeaderLink from './HeaderLink.vue'

export default {
  components: {
    HeaderLink,
  },
}
</script>
