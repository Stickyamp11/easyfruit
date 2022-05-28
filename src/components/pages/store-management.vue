<template>
  <div class="row" style="margin-left: 5%; width: 90%">
    <div class="form-group col-6 col-sm-6 " id="edit-store-wrapper">
      <router-link to="/editstore" id="edit-store" type="button" class="btn btn-primary">
        <i class="fa-solid fa-pen" id="store-name-img"></i> Editar {{storeInfo.name}}
      </router-link>
    </div>
  
    <div class="form-group col-6 col-sm-6 ms-right text-right" id="add-button-wrapper">
      <router-link to="/createproduct" id="add-button" type="button" class="btn btn-success btn-circle">
        <i class="fa-solid fa-plus"></i>
      </router-link>
    </div>
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

  <tbody :key="product.id" v-for="product in paginatedProducts">
    <tr class="">
      <td class="align-middle">
        <img class="storemanagement-product-img" :src="product.product_img" alt="Card image cap">
      </td>
      <td class="align-middle">{{product.name}}</td>
      <td class="align-middle">{{product.category}}</td>
      <td class="align-middle">
        <div class="row-description">
          {{product.description}}
        </div>  
      </td>
      <!-- Opciones --> 
      <td class="align-middle">
        <router-link id="edit-product-button" :to="{name:'editproduct', params:{id: product.id}}">
        <i class="fa-solid fa-pen-to-square" id="edit-product-button-img"></i>
        </router-link>
        <button type="submit" class="btn btn-danger btn-circle" v-on:click="deleteProduct(product)">
        <i class="fa-solid fa-xmark"></i>
        </button>
      </td>
    </tr>
  </tbody>
</table>
<div class="row">
<div class="col-12">
<nav aria-label="Easy navigation" >
  <ul class="pagination justify-content-center" id="storemanagement-list-products">
    <li class="page-item" v-on:click="getPreviousPage()"><a class="page-link" id="page-item-storemanagement-link" >Previous</a></li>
    <li id="page-item-storemanagement-link" v-for="page in tableMaxPages()" :key="page" v-on:click="getDataPage(page)" class="page-item" v-bind:class="isActive(page)"><a class="page-link" id="page-item-storemanagement-link">{{page}}</a></li>
    <li class="page-item" v-on:click="getNextPage()"><a class="page-link" id="page-item-storemanagement-link">Next</a></li>

  </ul>
</nav>
</div>
</div>


<!-- Dialog to show when deleting products -->
<DialogDeleteProduct :dialogShow="dialogDeleteProduct" :idProductToDelete='idProductDelete' ref="deleteDialogStoreManagement" @finished="getProductsDataFromStore()">
<div class="modal-content-delete-product-store-management">
  <p>
    ¿Seguro que quieres eliminar el producto {{nameProductDelete}}?
  </p>
<hr/>
</div>
</DialogDeleteProduct>
</template>

<script>
import * as storeService from "@/shared/services/storeService"
import * as cartService from "@/shared/services/cartService"
import * as productService from "@/shared/services/productService"
import * as categoryService from "@/shared/services/categoryService"
import DialogDeleteProduct from "../Dialogs/DialogDeleteProduct.vue"

export default {
     components: {DialogDeleteProduct},
     data(){
         return{
            products: [
            ],
            storeInfo: '',
            dialogDeleteProduct: false,
            idProductDelete: 0,
            nameProductDelete: '',
            pageElements: 10,
            paginatedProducts:[],
            pageSelected: 1,
            processStatus: 'success',
            categories: [],

         }
         
     },
     setup(){
     },

     mounted(){
         this.getProductCategories();
         this.getStoreInfo();
         //Gets the info of first page when mounted
         
     },
     props: [],
     methods: {
       getDataPage(pageNumber){
         this.pageSelected = pageNumber;
         this.paginatedProducts = [];
         let ini = (pageNumber * this.pageElements) - this.pageElements;
         let fin = (pageNumber * this.pageElements);

         /*for(let index = ini; index < fin ; index++){
           this.paginatedProducts.push(this.products[index]);
         }*/
         this.paginatedProducts = this.products.slice(ini, fin);
         console.log('Estoy en el getDataPage', this.paginatedProducts)
       },
          tableMaxPages(){
            return Math.ceil(this.products.length / this.pageElements);
          },
          getPreviousPage(){
            if(this.pageSelected > 1){
              this.pageSelected--;
              this.getDataPage(this.pageSelected);
            }
           
          },
          getNextPage(){
            if(this.pageSelected < this.tableMaxPages()){
              this.pageSelected++;
              this.getDataPage(this.pageSelected);
            }
          },
          deleteProduct(product){
            //Refresh
            console.log('Deleting', product);
            this.idProductDelete = product.id;
            this.nameProductDelete = product.name;
            this.$refs.deleteDialogStoreManagement.show();
           
          },

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
            this.products = response.data;

            //Little fix to have the category name in the product:
            this.products.forEach( product => {
              product['category'] = this.categories.find( category => category.id == product.fCategory).name;
            })
            //Once we have the products we set the pagination:
            this.getDataPage(1);
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

         },

         isActive(page){
           if(page == this.pageSelected){
             return 'active';
           }
           else{
             return '';
           }
         },

         async getProductCategories(){
            await categoryService.getCategories().then((response) => {
            console.log('categories', response)
            this.categories = response.data;
            console.log(this.categories)

            

            }).catch((error) => {
            console.error(error);
            this.processStatus = 'error';
            this.showDialogProcessResult();
            })
            },





     }




}
</script>

<style>

#products-table{
    width: 80%;
    margin-left: 10%;
    margin-top: 0%;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

}
.storemanagement-product-img{
  width: 60%;
}
@media (max-width: 1050px) { 
   .storemanagement-product-img{
    width: 128px;
}

}
@media (max-width: 550px) { 
   .storemanagement-product-img{
    width: 64px;
}

}

#add-button{
  margin-right: 10%;
  margin-top: 5%;
  border-radius: 100%;
}
#edit-store{
  margin-top: 5%;
  margin-left: 10%;
  max-width: 50%;
  width: 40%;
  text-align: left;

}

.row-description{
  max-width: 200px;
  max-height: 50px ;
  overflow:hidden;
}
g-cart-item-table{
    width: 128px;
    height: 128px;
}

#store-name-img{
  margin-left: 0;
}

#edit-product-button{

  padding-top: 6px;
  padding-bottom: 11px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: rgb(65, 65, 246);
  border-radius: 10%;
}
#edit-product-button:hover{
  background-color: rgb(49, 49, 187);
}
#edit-product-button-img{
  margin: 0;
  margin-top: 2px;
  color: white;

}

.modal-content-delete-product-store-management{
  color:black;
  font-size: 20;
}

#page-item-storemanagement-link{
color: green;

}
#page-item-storemanagement-link.active > .page-link{
  background-color: green;
  color: white;
}

</style>