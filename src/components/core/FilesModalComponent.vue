<template>
  <q-modal v-model="open">
    <h4>Basic Modal</h4>
    <q-btn
      color="primary"
      @click="open = false"
      label="Close"
    />
  </q-modal>
</template>

<script>
  export default {
    name: 'FilesModalComponent',
    props: {
      open: {
        type: Boolean,
        defaults: true
      }
    },
    data () {
      return {}
    },
    props: {},
    computed: {},
    components: {},
    methods: {},
    watch: {},
  }

</script>

<style>

</style>
