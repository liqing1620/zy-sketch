<template>
  <q-modal v-model="opened" :content-css="{minWidth: '50vw'}">
    <q-toolbar>
      <q-toolbar-title class="">{{model.name}}</q-toolbar-title>
      <q-btn class="q-mr-md" icon="save" label="保存"></q-btn>
      <q-btn fab dense icon="close" @click="opened=false"></q-btn>
    </q-toolbar>
    <div class="row justify-between">
      <div class="col-6 relative-position content-middle">
        <img :src="model.src" width="100%">
        <q-field
        class="absolute-bottom q-ma-lg"
        icon="filter">
        <q-uploader
          :url="imgUrl"
          color="secondary"
          @start="addImg()"
          stack-label="缩略图上传"/>
        </q-field>
      </div>
      <div class="col-6 q-px-md q-py-md">
        <q-field
          label="模型名称："
          label-width="3"
          class="q-pb-10r"
          icon="bookmarks">
          <q-input v-model="model.mName"/>
        </q-field>
        <q-field
          icon="unarchive"
          class="q-ma-md">
          <q-uploader :url="filesUrl" multiple color="primary" @finish="addFiles()" float-label="模型文件上传" />
        </q-field>
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
        model: {
          name: '',
          mName: '',
          path: '',
          price: '',
          type: '',
          info: ''
        },
        imgUrl:'',
        filesUrl:'',
        error: false,
        warning: false,
      }

    },
    computed: {},
    components: {},
    methods: {
      addImg(e){
        console.log("缩略图上传："+e)
      },
      addFiles(e){
        console.log("模型文件上传："+e)
      }
    },
    watch: {},
  }

</script>

<style>

</style>
