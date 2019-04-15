<template>
  <div id="q-app">
    <router-view />
    <q-ajax-bar color="deep-orange" v-if="!$q.platform.is.mobile"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  #q-app {
    height: 100%;
    width: 100%;
  }
  body {
    font-family: 'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑", Arial, sans-serif;
  }
</style>
