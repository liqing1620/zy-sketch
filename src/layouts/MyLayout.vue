<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <!--      <q-toolbar-->
      <!--        color="primary"-->
      <!--        :glossy="$q.theme === 'mat'"-->
      <!--        :inverted="$q.theme === 'ios'"-->
      <!--      >-->
      <!--        <q-btn-->
      <!--          flat-->
      <!--          dense-->
      <!--          round-->
      <!--          @click="leftDrawerOpen = !leftDrawerOpen"-->
      <!--          aria-label="Menu"-->
      <!--        >-->
      <!--          <q-icon name="menu" />-->
      <!--        </q-btn>-->

      <!--        <q-toolbar-title>-->
      <!--          众越科技数据管理-->
      <!--          <div slot="subtitle"></div>-->
      <!--        </q-toolbar-title>-->
      <!--      </q-toolbar>-->
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        众越科技数据管理
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
        leftDrawerOpen: this.$q.platform.is.desktop
      }
    },
    methods: {
      openURL
    }
  }
</script>

<style>
</style>
