<template>
  <div id="app">
    <router-view v-if="RouterState"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      RouterState: true
    }
  },
  methods: {
    reload () {
      this.RouterState = false
      this.$nextTick(() => (this.RouterState = true))
    }   
  }
}

</script>

<style>
  
</style>
