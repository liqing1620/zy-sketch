<template>
  <q-page class="q-ma-lg" style="width: 100%">
    <div class="data-header q-mx-lg q-pt-md q-mb-md">
      <!--工具-->
      <data-tool
        :btnStatus="useStatus"
        :toolData="hData"
        @addHosueType="addHosueType('house')"
        @resetType="resetType"
        @getToolType="getToolType"></data-tool>
      <div class="row">
        <data-tool
          :btnStatus="useStatus"
          :toolData="sData"
          @addHosueType="addHosueType('scene')"
          @resetType="resetType"
          @getToolType="getToolType">
        </data-tool>
<!--        <div class="row justify-end">-->
          <q-search
            class="q-ma-md"
            dark
            inverted-light color="white"
            icon="search"
            @input="goSearch"
            v-model="search"/>
          <q-btn
            v-show="hideStatus"
            class="q-ma-md"
            color="primary"
            @click="openModal">上传
          </q-btn>
<!--        </div>-->
      </div>
    </div>
    <!--    弹框部分-->
    <files-modal ref="files"
                 :modelStatus="modelStatus"
                 @save-model="saveModel"></files-modal>
    <!--    数据部分-->
    <div class="q-mx-lg row">
      <q-resize-observable @resize="onResize" />
      <template v-for="(item,index) in items">
        <div @mouseover="overlayId=index" @mouseout="overlayId=''">
          <q-card inline class="q-ma-sm">
            <q-card-media class="card-bg">
              <img :src="item.picId?imgUrl+item.picId+'?w=300&h=300':defaultUrl" :style="{'width':imgwidth+'px'}">
              <div slot="loading">Loading...</div>
              <q-card-title
                v-show="overlayId===index"
                slot="overlay"
                class="q-pa-sm">
                {{items.name}}
                <q-btn slot="right"
                       fab dense
                       text-color="white"
                       icon="search"
                       @click="goView(item)"></q-btn>
              </q-card-title>
            </q-card-media>
            <q-card-separator/>
            <q-card-actions class="row items-center justify-between">
            <span>
              <q-icon class="text-red" name="bookmark_border"></q-icon>{{item.picName}}
            </span>
              <div style="font-size:25px">
                <q-btn flat color="primary" class="q-mr-sm"  v-show="hideStatus" icon="edit" @click="goEdit(item)"/>
                <q-btn flat color="negative" icon="delete"  v-show="hideStatus" @click="goDelete(item)"/>
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </template>
      <div class="data-info" v-show="items.length<=0">暂无数据！</div>
    </div>
    <!--分页-->
    <div class="q-pr-xl q-ma-md">
      <q-pagination
        class="float-right"
        v-model="page"
        :min="minPages"
        :max="maxPages"
        :max-pages="6"
        @input="pageChange($event)"
        boundary-links
        direction-links/>
    </div>
    <q-inner-loading :visible="visible">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
  </q-page>
</template>

<script>
  export default {
    name: 'DataFormComponent',
    props: {
      hideStatus:{
        type: Boolean,
        default(){
          return false
        }
      }
    },
    data () {
      return {
        //加载
        visible:false,
        //数据
        items: [],
        defaultUrl: './statics/z.png',
        imgUrl: 'http://127.0.0.1:10001/rest/storage/thumbnail/',
        overlayId: '',
        modelData: '',
        modelStatus: 'edit',
        //搜索
        category:'',
        search: '',
        //工具部分数据
        useStatus:this.hideStatus,
        hData: [
          '模型库',
          '场景库'],
        sData: [
          '室内',
          '室外',
          '其它'],
        //分页
        page: 1,
        size:12,
        minPages: 1,
        maxPages: 12,
        //图片尺寸
        imgwidth:''
      }
    },
    created () {
      this.getAxios()
    },
    computed: {},
    components: {},
    methods: {
      //查询数据
      getAxios () {
        let that = this
        this.visible=true
        this.$axios({
          methods: 'get',
          url: '/model/findAll',
          params: {
            category:that.category,
            picName:that.search,
            size: that.size,
            page: that.page - 1 }
        }).then(function (res) {
          that.items = res.data[0].content
          that.maxPages=res.data[0].totalPages
          that.visible=false
        }).catch(function (err) {
          console.log(err)
        })
      },
      pageChange () {
        this.getAxios();
      },
      //场景类型添加
      addHosueType (type) {
        let info = '请输入要添加的类型：比如（场景库）'
        type === 'house' ? info : info = '请输入要添加的类型：比如（室内)'
        this.$q.dialog({
          title: '提示',
          message: info,
          prompt: {
            model: '',
            type: 'text' // 可选的
          },
          cancel: true,
          color: 'secondary'
        }).then(data => {
          switch (type) {
            case 'house':
              this.hData.push(data)
              break
            case 'scene':
              this.sData.push(data)
              break
          }
        }).catch(() => {
          console.log('用户没有执行任何操作。')
        })
      },
      //搜索
      goSearch(){
         this.getAxios();
      },
      //场景类型选择
      getToolType (e) {
        this.category=e
        this.getAxios()
      },
      //重置查询
      resetType(){
        this.category=""
        this.getAxios();
      },
      //上传窗口打开
      openModal () {
        this.$refs.files.opened = true
        this.$refs.files.payStatus = false
        this.$refs.files.model = {}
        this.modelStatus = 'edit'
      },
      //预览
      goView (data) {
        this.$refs.files.opened = true
        this.$refs.files.model = data
        this.modelStatus = 'view'
      },
      //编辑
      goEdit (data) {
        this.$refs.files.opened = true
        this.$refs.files.model = data
        this.modelStatus = 'edit'
      },
      saveModel (data) {
        this.getAxios()
      },
      //删除
      goDelete (data) {
        let that = this
        let ids = data.id
        this.$q.dialog({
          title: '重要提示',
          message: '是否删除' + data.name + ',' + '一旦删除，该数据将无法恢复。',
          ok: '确定',
          cancel: '取消'
        }).then(() => {
          this.$axios.delete(`/model/delete/${ids}`).then(() => {
            this.getAxios()
            this.$q.notify({
              message: '模型删除成功',
              position: 'top',
              timeout: 100
            })
          }).catch((err) => {
            console.error(err)
          })

        }).catch(() => {
          console.log('用户取消了该操作')
        })
      },
      //数据展示区域尺寸监听
      onResize(size){
        console.log(size.width)
        this.imgwidth=size.width/6.3
      }
    },
    watch: {}
  }

</script>

<style scoped>

  .data-header {
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  }

  .card-bg {
    background: rgba(128, 128, 128, 0.2);
    cursor: pointer;
  }
  .card-bg img{
    height: 200px;
  }
  .data-info {
    width: 100%;
    text-align: center;
    font-size: larger;
  }
</style>
