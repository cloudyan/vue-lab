<template>
  <div class="page-routes">
    <div :key="item.path" v-for="item in routes" class="link">
      <a :href="item.path">
        {{ item.meta.title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    routes() {
      return this.$router.options.routes.filter(item => {
        return !['*', '/'].includes(item.path)
      })
    },
  },
  created() {

  },
}
</script>

<style scoped>
.link {
  padding: 10px 30px;
}
</style>
