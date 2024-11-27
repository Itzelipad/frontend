<template>
  <div id="app">
    <NavComp  v-if="!$route.meta.hideNav"/> 
    <router-view></router-view>
  </div>
</template>

<script>
import NavComp from './components/NavComp.vue';

export default {
  name: 'App',
  components: {
    NavComp 
  },
  mounted(){
    this.$router.push("/");
  }
}
</script>

<style>
body {
  background-color: #F2F5FF;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
