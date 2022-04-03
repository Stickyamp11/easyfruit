<template>
  <div class="form-group col-sm-12 ms-right text-right" id="add-button-wrapper">
    <router-link to="/createproduct" id="add-button" type="button" class="btn btn-success btn-circle">
      <i class="fa-solid fa-plus"></i>
    </router-link>
  </div>

  <table class="table" id="products-table">
  <thead>
    <tr>
      <th scope="col">Imagen</th>
      <th scope="col">Nombre</th>
      <th scope="col">Categoría</th>
      <th scope="col">Descripción</th>
      <th scope="col">Opciones</th>
    </tr>
  </thead>

  <tbody :key="product.id" v-for="product in products">
    <tr class="">
      <td>
        <img id="img-cart-item" class="card-img-top" src="../assets/product_1.png" alt="Card image cap">
      </td>
      <td>{{product.id}}</td>
      <td>{{product.name}}</td>
      <td>
        <div class="row-description">
          {{product.description}}
        </div>  
      </td>
      <!-- Opciones --> 
      <td>
        <router-link :to="{name:'editproduct', params:{id: product.id}}">
        <i class="fa-solid fa-pen-to-square"></i>
        </router-link>
        <button type="submit" class="btn btn-danger btn-circle" v-on:click="deleteProductFromStore(product)">
        <i class="fa-solid fa-xmark"></i>
        </button>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
import * as storeService from "@/shared/services/storeService"
import * as cartService from "@/shared/services/cartService"
import * as productService from "@/shared/services/productService"
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
         this.getStoreInfo();
     },
     props: [],
     methods: {
          async getStoreInfo(){
            await storeService.getStoreDataByManagerEmail(localStorage.getItem('userEmail')).then((response) => {
                console.log(response)
                console.log('aqui userEmail', localStorage.getItem('userEmail'))
                this.storeInfo = response.data
                console.log('storeInfo', this.storeInfo)

                //Once we have the store info, we get the products
                this.getProductsDataFromStore();

            }).catch((error) => {
                console.error(error);
            })
            },

            async getProductsDataFromStore(){
            await storeService.getStoreProducts(this.storeInfo.id).then((response) => {
            console.log('products', response)
            this.products = response.data
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

        deleteProductFromStore(product){

           productService.deleteProduct(product.id).then(response => {
              console.log(response);

              //Reload items
              this.getProductsDataFromStore();
            }).catch((error) => {
            console.error(error);
            })

         }





     }




}
</script>

<style>

#products-table{
    width: 80%;
    margin-left: 10%;
    margin-top: 0%;
}
i{
  margin-left: 10%;
  margin-right: 10%;
}
#add-button{
  margin-right: 10%;
  margin-top: 5%;
  border-radius: 100%;
}
.row-description{
  max-width: 100%;
  overflow:hidden;
}
tr{
 
}
</style>