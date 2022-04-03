<template>
<section class="buy-order">
    <!-- This is a loop to show the products-->
    <span><h1>{{storeInfo.name}}</h1></span>
    <span></span>
    <div class="cart-products-show" 
    v-for="product in products" 
    :key="product.id">

    <!-- Content card for products -->
        <div class="card w-75 border-success" id="product-card">
            <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <img id="img-cart-item" class="card-img-top" src="../assets/product_1.png" alt="Card image cap">
                <p class="card-text">{{product.description}}</p>
                 <i class="fa-solid fa-x" v-on:click="discardProduct(product)"></i>

            </div>
        </div>
    </div>

<a href="#" class="btn btn-primary">Confirmar pedido</a>


</section>
</template>

<script>
import * as storeService from "@/shared/services/storeService"
import * as cartService from "@/shared/services/cartService"
export default {
     data(){
         return{
            products: [
             {id:0, name: 'item a', description: "Este es un producto de ejemplo", store:"1"},
             {id:1, name: 'item b', description: "Este es un producto de ejemplo", store:"1"},
             {id:2, name: 'item c', description: "Este es un producto de ejemplo", store:"2"},
            ],
            storeInfo: '',

         }
         
     },
     setup(){
     },

     mounted(){
         this.getCartProductsFromCustomer();
         this.getStoreInfo();
     },
     props: [],
     methods: {
          getStoreInfo(){
            storeService.getStoreData(this.products[0].store).then((response) => {
                console.log(response)
                this.storeInfo = response.data
                console.log('storeInfo', this.storeInfo)
            }).catch((error) => {
                console.error(error);
            })
            },

         confirmBuy(){

         },

         discardProduct(product){
             let index = this.products.findIndex((item) => {
                 item.id = product.id;
             })
             if(index)
             {
               this.products.splice(index,1);

              //Delete product from cart
               cartService.deleteProductFromCart(product.id);
             }
             
         },


         getCartProductsFromCustomer(){

              cartService.getCart().then((response) => {
              console.log(response)
              console.log('hi')
              this.products = response.data
              }).catch((error) => {
              console.error(error);
              })

         }




     }




}
</script>

<style>
#product-card{
    margin: 5%;
}

.cart-products-show{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
}

.buy-order{
    margin: 10%;
}
</style>
