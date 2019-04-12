<template>
  <q-page class="q-pt-lg q-pr-xl q-pl-xl">
    <div class="data-header q-ma-md">
      <!--工具-->
      <data-tool
        :toolData="hData"
        @addHosueType="addHosueType('house')"
        @getToolType="getToolType"></data-tool>
      <data-tool
        :toolData="sData"
        @addHosueType="addHosueType('scene')"
        @getToolType="getToolType"></data-tool>
    </div>
    <!--    数据部分-->
    <div class="data-container">
      <template v-for="item in 16">
        <q-card inline class="q-ma-sm">
          <q-card-media>
            <img src="../../statics/Halloween1.png">
          </q-card-media>
          <q-card-separator/>
          <q-card-actions class="row items-center justify-between">
        <span>
          <q-icon class="text-red" name="bookmark_border"></q-icon>模型名称
        </span>
            <div style="font-size:25px">
              <q-icon color="primary" name="edit"/>
              <q-icon color="red" name="delete"/>
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
              this.hData.push( data )
              break
            case 'scene':
              this.sData.push( data)
              break
          }
          this.$q.notify(`You typed: "${data}"`)
        }).catch(() => {
          console.log('用户没有执行任何操作。')
        })
        console.log('触发了增加事件类型：', type)
      },
      getToolType (e) {
        console.log('当前选择的类型为:', e)
      }
    },
    watch: {}
  }

</script>

<style scoped>
  .data-page {

  }

</style>
