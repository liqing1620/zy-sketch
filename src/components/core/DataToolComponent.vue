<template>
  <q-toolbar class="q-opcity">
    <q-btn
      color="primary"
      size="sm"
      round dense
      icon="border_color"
      @click="editHosueType"/>
    <q-btn v-show="editType"
           v-for="(item,index) in toolData"
           :key="item"
           class="q-ml-md"
           outline
           color="grey-8"
           :label="item"
           @click="$emit('getToolType',item)"/>
    <q-btn v-show="!editType"
           v-for="(item,index) in toolData"
           :key="index"
           class="q-ml-md"
           outline
           icon="delete"
           color="red-5"
           :label="item"
           @click="toolData.splice(index,1)"/>
    <q-btn v-show="!editType"
           class="q-ml-md"
           size="sm"
           outline
           round dense
           icon="add"
           @click="$emit('addHosueType')"/>
  </q-toolbar>
</template>

<script>
  export default {
    name: 'DataToolComponent',
    props: {
      //工具部分数据
      toolData: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        editType: 'false'
      }
    },
    computed: {},
    components: {},
    methods: {
      editHosueType () {
        this.editType = !this.editType
      }
    },
    watch: {},
  }

</script>

<style>

</style>
