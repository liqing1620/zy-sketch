<template>
  <q-layout view="lhr LpR LFf">
    <q-layout-header class="bg-transparent no-shadow q-pb-12r bg-gradient-primary">
      <q-toolbar class="justify-between">
        <q-chip class="q-opcity" square avatar="./statics/Halloween1.png">
        </q-chip>
        <q-toolbar-title>
          众越科技数据模型管理中心
          <span slot="subtitle">
      The model management center for ZYKJ
    </span>
        </q-toolbar-title>
        <!--全屏按钮-->
        <q-btn dense
               :icon="this.$q.fullscreen.isActive?'fullscreen_exit':'fullscreen'"
               class="q-mr-md"
               v-if="this.$q.fullscreen.isCapable"
               @click="toggleFullScreen">
        </q-btn>
      </q-toolbar>

    </q-layout-header>

    <!--    <q-layout-drawer-->
    <!--      v-model="leftDrawerOpen"-->
    <!--      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"-->
    <!--    >-->
    <!--    </q-layout-drawer>-->

    <q-page-container class="q-mt--10r">
      <router-view/>
      <div class="text-sm text-center">
        <span class="text-grey"> 版权所有&copy;2017
          <a class="text-brand text-weight-bold"
             target="_blank" href="http://www.njzycn.com">&nbsp;&nbsp;南京众越信息科技有限公司
          </a> &nbsp;&nbsp;苏ICP备17062438号 &nbsp;&nbsp;苏公网安备32010602010324号
        </span>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { openURL } from 'quasar'

  export default {
    name: 'MyLayout',
    data () {
      return {
        search: '',
        leftDrawerOpen: this.$q.platform.is.desktop
      }
    },
    methods: {
      openURL,
      //全屏显示
      toggleFullScreen () {
        this.$q.fullscreen.toggle()
      }
    }
  }
</script>

<style scoped>
  .q-layout-page-container main {
    z-index: 2500;
  }

</style>
