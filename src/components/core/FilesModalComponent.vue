<template>
  <q-modal v-model="opened" :content-css="{minWidth: '50vw'}">
    <q-toolbar>
      <q-toolbar-title class="">{{model.picName}}</q-toolbar-title>
      <q-btn fab dense icon="close" @click="opened=false"></q-btn>
    </q-toolbar>
    <div class="row justify-between">
      <div class="col-7 relative-position content-middle">
        <q-card inline class="q-ma-sm">
          <q-card-media class="card-bg">
            <img :src="model.picId?Url+model.picId+'?w=400&h=400':defaultUrl">
          </q-card-media>
          <q-card-separator/>
          <q-card-actions
            v-show="modelStatus==='edit'">
            <q-uploader
              ref="imgs"
              class="col"
              :url="filesUrl"
              color="secondary"
              @uploaded="addImg($event.xhr)"
              stack-label="缩略图上传"/>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-5 q-px-md q-py-md" v-show="!payStatus">
        <q-field
          v-show="modelStatus==='edit'"
          label="模型名称："
          label-width="4"
          class="q-mt-6r q-ma-xl">
          <q-input v-model="model.picName"/>
        </q-field>
        <q-field
          label="模型名称："
          label-width="4"
          class="q-mt-6r q-ma-xl"
          v-show="modelStatus==='view'">{{model.picName}}
        </q-field>
        <q-field
          v-show="modelStatus==='edit'"
          label="模型上传："
          :count="1"
          helper="当前文件上传数量："
          label-width="4"
          class="q-ma-xl">
          <q-uploader  ref="files" :url="filesUrl" color="primary" @uploaded="addFiles($event.xhr)"/>
        </q-field>
        <!--        <form id="imgForm">-->
        <!--          <input type="file" :disabled="disabled" name="file" @change="getSignedUrl($event)"/>-->
        <!--        </form>-->
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
            v-model="model.fileFormat"/>
        </q-field>
        <q-field
          label="格式："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='view'">{{model.fileFormat}}
        </q-field>
        <q-field
          label="说明："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='edit'">
          <q-input
            v-model="model.picExplain"/>
        </q-field>
        <q-field
          label="说明："
          label-width="4"
          class="q-ma-xl"
          v-show="modelStatus==='view'">{{model.picExplain}}
        </q-field>
        <div class="text-center">
          <q-btn
            :loading="saveStatus"
            color="primary"
            v-show="modelStatus==='edit'"
            class="q-ma-sm"
            icon="save" label="保存"
            @click="saveModel()"></q-btn>
          <q-btn
            :loading="buyStatus"
            color="primary"
            v-show="modelStatus==='view'"
            class="q-ma-sm"
            icon="save" label="购买"
            @click="buyModel()"></q-btn>
        </div>
      </div>
      <div class="col-5 text-center" v-show="payStatus">
        <div class="q-mx-sm q-my-xl">
          <img src="../../statics/alipay.png">
          <img src="../../statics/wxpay.png">
        </div>
        <q-btn
          :loading="buyStatus"
          color="primary"
          v-show="modelStatus==='view'"
          class="q-ma-sm" label="完成"
          @click="buyModel()"></q-btn>
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
        //弹框开关
        opened: false,
        //页面数据
        model: {
          picId:'',
          picName: '',
          fileId:'',
          path: '',
          price:'',
          fileFormat: '',
          picExplain: ''
        },
        //保存及购买按钮状态
        saveStatus: false,
        buyStatus: false,
        payStatus: false,
        //上传按钮状态
        disabled: false,
        //文件上传
        Url:'http://127.0.0.1:10001/rest/storage/thumbnail/',
        defaultUrl: './statics/z.png',
        filesUrl: '/sketch/model/rest/upload',
      }

    },
    computed: {},
    components: {},
    methods: {
      saveModel () {
        let that = this
        this.saveStatus = true
        this.$axios({
          method: 'post',
          url: '/model/save',
          data: that.model
        }).then(function (res) {
          console.log(res)
          that.saveStatus = false
          that.opened = false
          that.$refs.imgs.reset()
          that.$files.imgs.reset()
          that.$emit('save-model')
        }).catch(function (err) {
          console.error(err)
        })

      },
      buyModel () {
         this.payStatus=!this.payStatus
      },
      addImg (e) {
        let res=JSON.parse(e.response)
        this.model.picId=res.id
      },
      addFiles (e) {
        let res=JSON.parse(e.response)
        // this.model.fileId.push(res.id)
      }
    },
    watch: {},
  }

</script>

<style scoped>
   .card-bg img{
     width: 545px;
     height: 545px;
   }
</style>
