<template>
  <div class="zy_login">
    <div class="zy_form">
      <q-filed>
        <q-input type="text"></q-input>
      </q-filed>
      <q-filed>
        <q-input type="text"></q-input>
      </q-filed>
      <q-field
        icon="cloud"
        label="Your Gmail"
        helper="Helper"
        :error="mailHasError"
        error-label="We need a valid email"
        :count="10">
        <q-input suffix="@gmail.com" v-model="model"/>
      </q-field>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {},
    computed: {},
    components: {},
    methods: {},
    watch: {},
  }

</script>

<style scoped>
  .zy_login {
    width: 100%;
    height: 100%;
    /*background: #000;*/
  }
  .zy_form{
    float: right;
    width: 300px;
  }
</style>
