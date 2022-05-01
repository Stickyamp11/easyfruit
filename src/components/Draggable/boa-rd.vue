<template>

<div 
class="drop-zone-board"
@drop="onDrop($event)"
@dragenter.prevent
@dragover.prevent
>
    <!-- In case there is no products yet here-->
    <div v-if="emptyProducts">
      <div> ¡Arrastra productos aquí!</div>
      <i class="fa-solid fa-share-from-square"></i>
    </div>

    <!-- Loop to display the list of products in cart -->
    <div v-for="item in products2" 
    :key="item.id" 
    class="drag-el-in-board"
    draggable="true"
    @dragstart="startDrag($event, item)">
            <div class="draggable-item-body">
            <div class="col-12">
                <div style="display: inline"><img id="img-cart-item" class="card-img-top" :src="item.product_img" alt="Card image cap" style="width: 60px; height: 60px"></div>
                <div style="display: inline; margin-left: 4%;">
                    <h7>{{item.name}}</h7>
                </div>
                <div style="display: inline; float:right;">
                     <button class="btn btn-danger" id="button-cart-delete-item" type="submit" v-on:click="deleteProductFromCart(item)">
                    <i class="fa-solid fa-x"></i>
                    </button>
                </div>
            </div>
            </div>

            <!--
            <div class="draggable-item-footer">
                <span>
                    <button class="button-cart-delete-item" type="submit" v-on:click="deleteProductFromCart(item)">
                    <i class="fa-solid fa-x"></i>
                    </button>
                </span>
            </div> -->
    </div>
 
</div> 
</template>

<script>
import * as cartService from "@/shared/services/cartService" 
 export default{
     data(){
         return{
            products2: [],
            emptyProducts: true,
         }
         
     },
     setup(){
     },

     mounted(){
         this.getCartProductsFromCustomer()
     },
     props: [],
     methods: {
         getCartProductsFromCustomer(){

             console.log('heyyyyyy')
              cartService.getCart().then((response) => {
              console.log('Productos carrito en la carga', response)
              console.log('hi')
              
              this.products2 = response.data

              if(this.products2.length){
                  this.emptyProducts = false;
              }
              //Refresh cart items
            this.onChangeProducts();
              }).catch((error) => {
              console.error(error);
              })

         },

         onDrop(event){
            const productId = event.dataTransfer.getData('productId')
            const productImg = event.dataTransfer.getData('productImg')
            const productName = event.dataTransfer.getData('productName')
            const productFStore = event.dataTransfer.getData('productFStore')


            console.log(productId)
            if(!this.products2.find((prd) => prd.id == productId ) && productId){
                
                //When there is at least one product in cart we need to add extra security
                if(this.products2.length > 0){
                    console.log('FIRST LOOP' )
                    //If the product comes from a different store we need to reject it.
                    console.log(productFStore)
                    console.log('RECENT HERE' )
                    console.log(this.products2)
                    console.log(this.products2[0])
                    if(this.products2[0].fStore == productFStore)
                    {
                        this.products2.push({id: productId, product_img: productImg, name: productName})
                        //Insert the dropped product into the user cart
                        cartService.insertProductIntoCart(productId)
                        this.emptyProducts = false;

                        //Refresh cart items
                        this.onChangeProducts();
                    }
                }
                //If there is not a product in cart we can add it right away
                else
                {
                    this.products2.push({id: productId, product_img: productImg, name: productName, fStore: productFStore})
                    //Insert the dropped product into the user cart
                    cartService.insertProductIntoCart(productId)
                    this.emptyProducts = false;
                    //Refresh cart items
                        this.onChangeProducts();
                }
               
                
                
                

            }

            console.log(this.products2)
            
        },

        startDrag(event, item){
            console.log(item)
            console.log('startDrag')
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('productId', item.id)
            event.dataTransfer.setData('productTitle', item.title)
            event.dataTransfer.setData('productList', item.list)


            console.log(event.dataTransfer.getData('productId'))
        },
        deleteProductFromCart(product){
            console.log('Borrando')
            console.log(product)
            console.log(product.id)
            console.log(this.products2)
            let position = this.products2.indexOf(product)
            console.log(position)
            if(position >= 0)
            {
            this.products2.splice(position, 1);

            cartService.deleteProductFromCart(product.id);
            }

            //If length is 0 , then products array is empty
            console.log('heyyy')
            console.log(this.products2.length)
            if(this.products2.length == 0){ 
                this.emptyProducts = true;
                }
            console.log(this.products2)
            //Refresh cart items
            this.onChangeProducts();
        },

        onChangeProducts(){
                this.$emit('changedProducts');
            },

        getLengthProducts(){
            return this.products2.length;
        }

        
         

      }
 }
 </script>

 <style>
 .drop-zone-board{
     margin: 50px auto;
     padding: 10px;
     min-height: 70%;
     max-height: 70%;
     overflow-y: auto;
     overflow-x: hidden; /* Hide horizontal scrollbar */
     min-width: 10%;
     background-color: rgb(255, 255, 255);
     opacity: 100%;
 }
 /* width */
.drop-zone-board::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.drop-zone-board::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.drop-zone-board::-webkit-scrollbar-thumb {
  background: rgb(37, 74, 26);
}

 .drag-el-in-board{
     color: rgb(0, 0, 0);
     padding: 5px;
     margin-bottom: 10px;
     text-align: left;
 }

 #button-cart-delete-item{
    border: 1;
    margin-top: 25%;
    margin-right: 0%;


 }
 #img-cart-item{
     max-width: 20%;
     max-height: 20%;
     display: inline;
 }

 .draggable-item-body{
     background-color: rgb(255, 255, 255);
 }
 .draggable-item-footer{
     text-align: center;
     border: 2px;
     background-color: rgb(218, 218, 218);
 }



 </style>