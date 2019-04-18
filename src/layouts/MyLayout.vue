<template>
  <q-layout view="lhr LpR LFf">
    <q-layout-header class="bg-transparent no-shadow q-pb-12r bg-gradient-primary">
      <q-toolbar class="justify-between bg-transparent">
        <q-chip class="q-opcity" square avatar="./statics/Halloween1.png">
          xxx数据管理
        </q-chip>

        <!--全屏按钮-->
        <q-btn flat  dense
               :icon="this.$q.fullscreen.isActive?'fullscreen_exit':'fullscreen'"
               class="q-mr-xs"
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

    <q-page-container>
      <router-view/>
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
