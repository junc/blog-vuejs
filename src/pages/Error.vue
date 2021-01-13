<template>
  <div class="ErrorPage">
    <h1 class="ErrorPage__Title">Не найдено</h1>
    <div class="ErrorPage__Message">
      Страница, которую вы ищите, не существует.
    </div>
  </div>
</template>

<script>
import MainLayout from '../layouts/Main.vue'

export default {
  components: {
    MainLayout,
  },

  metaInfo() {
    return {
      title: 'Ошибка 404',
    }
  },
}
</script>
