<template>
  <q-page class="q-ma-lg" style="width: 100%">
    <div class="data-header q-mx-lg q-pt-md q-mb-md">
      <!--工具-->
      <data-tool
        :toolData="hData"
        @addHosueType="addHosueType('house')"
        @getToolType="getToolType"></data-tool>
      <div class="row justify-between">
        <data-tool
          class="col-6"
          :toolData="sData"
          @addHosueType="addHosueType('scene')"
          @getToolType="getToolType">

        </data-tool>
        <div class="row col-6 justify-end">
          <q-search
            class="q-ma-md"
            dark
            inverted-light color="white"
            icon="search"
            v-model="search"/>
          <q-btn
            class="q-ma-md"
            color="primary"
            @click="openModal">上传
          </q-btn>
        </div>
      </div>
    </div>
    <!--    弹框部分-->
    <files-modal ref="files"></files-modal>
    <!--    数据部分-->
    <div class="data-container q-mx-lg justify-between">
      <template v-for="item in items">
        <q-card inline class="q-ma-sm">
          <q-card-media>
            <img :src="item.src">
            <div slot="loading">Loading...</div>
            <q-card-title
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
          <q-icon class="text-red" name="bookmark_border"></q-icon>模型名称
        </span>
            <div style="font-size:25px">
              <q-btn flat color="primary" class="q-mr-sm" icon="edit" @click="goEdit(item)"/>
              <q-btn flat color="negative" icon="delete" @click="goDelete(item)"/>
            </div>
          </q-card-actions>
        </q-card>
      </template>
    </div>
    <!--分页-->
    <div class="data-footer q-pr-xl q-ma-md">
      <q-pagination
        class="float-right"
        v-model="page"
        :min="minPages"
        :max="maxPages"
        :max-pages="6"
        boundary-links
        direction-links/>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: 'DataFormComponent',
    data () {
      return {
        //数据
        items: [
          { name: '监控数据_1', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_2', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_3', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_4', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_5', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_6', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_7', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_8', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_9', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_10', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_11', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_12', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_13', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_14', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_15', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' },
          { name: '监控数据_16', mName: '监控模型', src: '/statics/Halloween1.png', path: 'G:\\zy-sketch\\src\\statics', price: '', type: '', info: '' }],
        modelData:'',
        //搜索
        search: '',
        //工具部分数据
        hData: [
          '模型库',
          '场景库'],
        sData: [
          '室内',
          '室外',
          '其它'],
        //分页
        page: 1,
        minPages: 1,
        maxPages: 10
      }
    },
    props: {},
    computed: {},
    components: {},
    methods: {
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
      //场景类型选择
      getToolType (e) {
        console.log('当前选择的类型为:', e)
      },
      //上传窗口打开
      openModal () {
        this.$refs.files.opened = true;
          this.$refs.files.model= { name: '', mName: '', src: '', path: '', price: '', type: '', info: '' }
      },
      //预览
      goView (data) {
        this.$refs.files.opened = true;
        this.$refs.files.model = data
      },
      //编辑
      goEdit(data){
        this.$refs.files.opened = true;
        this.$refs.files.model = data
      },
      //删除
      goDelete(data){
        this.$q.dialog({
          title: '重要提示',
          message: '是否删除'+data.name+','+'一旦删除，该数据将无法恢复。',
          ok: '确定',
          cancel: '取消'
        }).then(() => {
          this.$q.notify({
           message:'模型删除成功',
           position: 'top',
           timeout: 100
          })
        }).catch(() => {
          console.log("用户取消了该操作")
        })
      }
    },
    watch: {}
  }

</script>

<style scoped>

  .data-header {
    background: rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  }

</style>
