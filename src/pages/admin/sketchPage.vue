<template>
  <q-page class="flex flex-center index-page">
    <data-form :hideStatus="status"></data-form>
  </q-page>
</template>
<script>
  export default {
    name: 'sketchPage',
    data(){
      return{
        status:true
      }
    }
  }
</script>
<style scoped>
  .index-page {
    width: 100%;
  }

</style>
