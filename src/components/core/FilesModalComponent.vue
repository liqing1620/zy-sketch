<template>
  <q-modal v-model="opened" :content-css="{minWidth: '50vw'}">
    <q-toolbar>
      <q-toolbar-title class="">{{model.name}}</q-toolbar-title>
      <q-btn class="q-mr-md" icon="save" label="保存"></q-btn>
      <q-btn fab dense icon="close" @click="opened=false"></q-btn>
    </q-toolbar>
    <div class="row justify-between">
      <div class="col-6 relative-position">
        <img :src="model.src" width="100%">
        <q-btn class="absolute-bottom-right" icon="filter"></q-btn>
      </div>
      <div class="col-6 q-px-xl q-py-md">
        <q-field
          label="模型名称："
          label-width="3"
          class="q-pb-10r"
          icon="bookmarks">
          <q-input v-model="model.mName"/>
        </q-field>
        <div class="q-ma-md row justify-between">
          <q-input
            inverted-light
            color="white"
            v-model="model.path"/>
          <q-btn>上传</q-btn>
        </div>
        <q-input
          class="q-ma-md"
          inverted-light
          color="white"
          v-model="model.price"
          float-label="价格："/>
        <q-input
          class="q-ma-md"
          inverted-light
          color="white"
          v-model="model.type"
          float-label="格式："/>
        <q-input
          class="q-ma-md"
          inverted-light
          color="white"
          rows="5"
          v-model="model.info"
          type="textarea"
          float-label="说明："/>
      </div>
    </div>

  </q-modal>
</template>

<script>
  export default {
    name: 'FilesModalComponent',
    data () {
      return {
        opened: false,
        model:{
          name: '',
          mName: '',
          path: '',
          price: '',
          type: '',
          info: ''
        }
      }
    },
    computed: {},
    components: {},
    methods: {},
    watch: {},
  }

</script>

<style>

</style>
