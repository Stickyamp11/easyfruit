<template>
  <div>
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <NavBar/>
  <Login/>
  <Footer/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar/nav-bar.vue'
import Login from './components/Login/log-in.vue'
import Footer from './components/Footer/foot-er.vue'
export default {
  name: 'App',
  components: {
   NavBar,Login,Footer
  }
}
</script>

<style>
#app {

}
</style>
