<template>
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <MenuBar/>
  

</template>

<script>
import MenuBar from './components/MainMenuBar.vue'
export default {
  name: 'App',
  components: {
     MenuBar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
