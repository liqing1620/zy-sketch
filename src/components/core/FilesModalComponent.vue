<template>
  <q-modal v-model="opened" :content-css="{minWidth: '50vw'}">
    <q-toolbar>
      <q-toolbar-title class="">{{model.name}}</q-toolbar-title>
      <q-btn fab dense icon="close" @click="opened=false"></q-btn>
    </q-toolbar>
    <div class="row justify-between">
      <div class="col-7 relative-position content-middle">
        <q-card inline class="q-ma-sm" style="width: 100%">
          <q-card-media class="card-bg">
            <img :src="model.src?model.src:defaultUrl" width="100%">
          </q-card-media>
          <q-card-separator/>
          <q-card-actions
            v-show="modelStatus==='edit'">
            <q-uploader
              :url="imgUrl"
              color="secondary"
              @start="addImg()"
              stack-label="缩略图上传"/>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-5 q-px-md q-py-md">
        <q-field
          v-show="modelStatus==='edit'"
          label="模型名称："
          label-width="4"
          class="q-mt-6r q-ma-xl">
          <q-input v-model="model.mName"/>
        </q-field>
        <q-field
          label="模型名称："
          label-width="4"
          class="q-mt-6r q-ma-xl"
          v-show="modelStatus==='view'">{{model.mName}}
        </q-field>
        <q-field
          v-show="modelStatus==='edit'"
          label="模型上传："
          :count="7"
          helper="当前文件上传数量："
          label-width="4"
          class="q-ma-xl">
          <q-uploader :url="filesUrl" multiple color="primary" @finish="addFiles()"/>
        </q-field>
        <q-field
          label="价格："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='edit'">
          <q-input
            v-model="model.price"/>
        </q-field>
        <q-field
          label="价格："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='view'">{{model.price}}
        </q-field>
        <q-field
          label="格式："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='edit'">
          <q-input
            v-model="model.type"/>
        </q-field>
        <q-field
          label="格式："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='view'">{{model.type}}
        </q-field>
        <q-field
          label="说明："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='edit'">
          <q-input
            v-model="model.info"/>
        </q-field>
        <q-field
          label="说明："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='view'">{{model.info}}
        </q-field>
        <div class="text-center">
          <q-btn
            color="primary"
            v-show="modelStatus==='edit'"
            class="q-ma-sm"
            icon="save" label="保存"></q-btn>
          <q-btn
            color="primary"
            v-show="modelStatus==='view'"
            class="q-ma-sm"
            icon="save" label="购买"></q-btn>
        </div>
      </div>
    </div>

  </q-modal>
</template>

<script>
  const VIEW_STATUS = {
    'view': 'view',
    'edit': 'edit'
  }
  export default {
    name: 'FilesModalComponent',
    props: {
      modelStatus: {
        type: String,
        default () {
          return VIEW_STATUS.view
        }
      }
    },
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
        defaultUrl:'./statics/z.png',
        imgUrl: '',
        filesUrl: '',
        error: false,
        warning: false,
      }

    },
    computed: {},
    components: {},
    methods: {
      addImg (e) {
        console.log('缩略图上传：' + e)
      },
      addFiles (e) {
        console.log('模型文件上传：' + e)
      }
    },
    watch: {},
  }

</script>

<style>

</style>
