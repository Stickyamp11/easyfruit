<template>
  <div>
    <NavBar :userLogged="userLogged"/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from './components/common/NavBar/nav-bar.vue'
import Footer from './components/common/Footer/foot-er.vue'

export default {
  name: 'App',
  data(){
    return{
      userLogged: Boolean,
    }
  },
  components: {
    NavBar,Footer
  },
    mounted(){
  }

}
</script>

<style>
html{
  overflow-x: hidden;
}
input:focus{
      box-shadow: rgba(36, 104, 19, 0.795) 1px 5px 15px !important;
}
textarea:focus{
      box-shadow: rgba(36, 104, 19, 0.795) 1px 5px 15px !important;
}
.btn-success:focus{
  outline: 2px solid rgba(36, 104, 19, 0.795)  !important;
}
.btn-success:hover{
  background-color: rgba(16, 64, 2, 1);
  transition: 0.5s;
}
.btn-success{
  background-color: rgba(27,112,13,255);
  border-color: rgba(27,112,13,255);

}

</style>
