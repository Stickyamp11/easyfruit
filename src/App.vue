<template>
  <div>
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <NavBar :userLogged="userLogged"/>
  <!--
  <Login/>
  
  <SingleProductCard product_name="Test" product_img_src="https://i.pinimg.com/originals/b5/c6/d2/b5c6d29fc8dcc50d3f88b50b69aff86f.jpg"/>
  <StoreProductCatalog/>
  <SignUp/>-->
  <router-view/>
  <Footer/>

  </div>
</template>

<script>
//import * as sharedData from "./shared/sharedData"
import NavBar from './components/NavBar/nav-bar.vue'
import Footer from './components/Footer/foot-er.vue'

/*
import Login from './components/Login/log-in.vue'
import SingleProductCard from './components/SingleProductCard/single-product-card.vue'
import StoreProductCatalog from './components/StoreProductCatalog/store-product-catalog.vue'
import SignUp from './components/SignUp/sign-up.vue'*/
export default {
  name: 'App',
  data(){
    return{
      userLogged: Boolean,
    }
  },
  components: {
    NavBar,Footer
   //NavBar,Login,Footer,SingleProductCard, StoreProductCatalog, SignUp
  },
    mounted(){
    //this.userLogged = sharedData.sharedData.userLogged
  }

}
</script>

<style>

input:focus{
      box-shadow: rgba(36, 104, 19, 0.795) 1px 5px 15px !important;


}
</style>
