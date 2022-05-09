<template>
    
<section class="dialog-notification">
  <transition name="dialog-animation">
  <div v-show="dialogActive" class="dialog">
    <transition name="dialog-animation-inner">

    <div v-show="dialogActive" class="dialog-inner" id="dialogDelete">
      <!-- Dialog Content-->
      <slot />
      <div class="row">
      <div class="col-12 col-sm-6">
           <button class="btn btn-success" id="button-delete-dialog" @Click="deleteProduct">
             Sí
            </button>
      </div>
      <div class="col-12 col-sm-6">

            <button class="btn btn-danger" id="button-delete-dialog" @Click="noDeleteProduct">
                No
            </button>
      </div>
      </div>
     

    </div>
  </transition>
  </div>
</transition>
</section>
</template>

<script>
import * as productService from "../../shared/services/productService"

export default {
    
  name: 'dialog-delete-product',
  components: {},
  props: ['dialogShow','idProductToDelete'],
  data () {
    return {
      dialogActive: false,
      redirectLink: this.link
    }
  },
  computed: {

  },

  mounted () {
  
    console.log(this.dialogActive)
    console.log('hi dialog delete')
  },

  methods: {
    hidde(){
        this.dialogActive = false;
    },
    show(){
        this.dialogActive = true;
    },

    deleteProduct(){
        productService.deleteProduct(this.idProductToDelete).then ( res => {
            console.log(res)
            //this.dialogActive = false;
            //this.dialogShow = false;
            console.log('Deleted product successfully')
            this.hidde();
        })
    },
    noDeleteProduct(){
        this.hidde();
    }



  }
}



</script>

<style>
::slotted(){

}
.overlay {

    position: fixed;
    margin: 0%;

}

.dialog{
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(30, 31, 30, 0.6);
    
}


.dialog-inner{
    z-index: 1000;
    max-width: 640px;
    width: 40%;
    height: 15%;
    box-shadow: 0;
    border-radius: 0%;
    background-color: rgb(255, 255, 255);
    text-align:center;
}
@media (max-width: 767.98px) {
    .dialog-inner{
    height: 25%;
    width: 60%;

    }
}

#button-delete-dialog{
    font-size: 20px;
    cursor:pointer;  
    border: 0;
    margin-top: 1%;
    margin-left: 10%;
    margin-right: 10%;
}

.dialog-animation-enter-active,
.dialog-animation-leave-active{
    transition: opacity .3s cubic-bezier(.52, .02, .19, 1.02);
    
}
.dialog-animation-enter-from{
    opacity: 0;
}
.dialog-animation-leave-to{
    opacity: 0;
}
.dialog-animation-inner-enter-active{
    transition: all opacity .3s cubic-bezier(.52, .02, .19, 1.02) 0.15s;
}
.dialog-animation-inner-leave-active{
    transition: all opacity .3s cubic-bezier(.52, .02, .19, 1.02);
}
.dialog-animation-inner-enter-from{
    opacity: 0;
    transform: scale(0.8);
}
.dialog-animation-inner-leave-to{
    opacity: 0;
    transform: scale(0.8);
}

#dialogDelete .btn{
    padding-left: 12%;
    padding-right: 12%;
    padding-top: 6%;
    padding-bottom: 6%;
}


</style>


