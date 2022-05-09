<template>
<section class="repeat-order" v-if="dialogActive">
    <!-- This is a loop to show the products-->

<div class="repeat-order-inner">
    <div class="repeat-order-inner-header">
        <div class="row align-items-center justify-content-center">
            <div class="col-9">
                  <span id="repeat-order-title">Volver a pedir {{storeInfo.name}}</span>
            </div>
            <div class="col-3 text-right ">
                <button class="btn btn-circle"><i class="fa-solid fa-x" v-on:click="hidde()"></i></button>
            </div>
        </div>
        <hr style="margin: 0;">
    </div>
    <div class="repeat-order-inner-body">
    <div class="cart-products-show" 
    v-for="product in products" 
    :key="product.id">

    <!-- Content card for products -->
        <div class="card border-success" id="product-card">
            <div class="card-body" id="card-body-product">
                 <div class="row">
                    <div class="col-6 text-left">
                        <h5 class="card-title">{{product.name}}</h5>
                    </div>
                    <div class="col-6 text-right">
                    <button id="repeat-order-delete-button" class="btn btn-danger"><i class="fa-solid fa-x" v-on:click="discardProduct(product)"></i></button>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-4">
                    <img id="buy-item-card-img" class="card-img-top" :src="product.product_img" alt="Card image cap">
                    </div>
                    <div class="col-8">

                            <div class="row mb-5">
                                <div class="col-12">
                                <p class="card-text">{{product.description}}</p>
                                </div>
                        
                            </div>
                            <div class="row mt-5">
                                <div class="col-5" style="padding: 0;">
                                 <label for="methodSelect">Método de medida</label>
                                <select v-model="product.methodSelected" class="form-select" id="methodSelect">
                                    <option v-for="method in product.methodsAllowed?.split(';')" :key="method">{{method}}</option>
                                </select>
                                </div>
                                        <div v-if="product.methodSelected == 'kg'" class="col-7">
                                            
                                            <div id="info-kg">
                                                    <i class="fa-solid fa-circle-exclamation"></i> El peso puede no ser exacto
                                                </div>
                                             <div class="row align-items-center justify-content-center ">
        
                                                <div class="col-5" id="custom-col">
                                                 <input type="text" v-model="product.unitsToBuy" class="form-control" id="unitsToBuy" placeholder="1.5"> 
                                                </div>
                                                <div class="col-5">
                                                 <label for="unitsToBuy">Kgs</label>
                                                </div>
                                             </div>

                                        </div>
                                        <div v-if="product.methodSelected == 'pieces'" class="col-7" style="padding: 0;">
                                            
                                             <div id="warning-pack" style="visibility: hidden;">
                                                    <i class="fa-solid fa-circle-exclamation"></i> El pack de este producto contiene {{product.packQuantity}} unidades
                                                </div>
                                             <div class="row align-items-center justify-content-center ">
                                                 <div class="col-5" id="custom-col">
                                                 <input type="text" v-model="product.unitsToBuy" class="form-control" id="unitsToBuy" placeholder="6" > 
                                                </div>
                                                <div class="col-5">
                                                 <label for="unitsToBuy">uds</label>
                                                </div>
                                                
                                               
                                            </div>

                                        </div>
                                        <div v-if="product.methodSelected == 'pack'" class="col-7" style="padding: 0;">
                                            
                                                <div id="warning-pack">
                                                    <i class="fa-solid fa-circle-exclamation"></i> El pack de este producto contiene {{product.packQuantity}} unidades
                                                </div>
                                            <div class="row align-items-center justify-content-center">
                                                <div class="col-5" id="custom-col">
                                                 <input type="text" v-model="product.unitsToBuy" class="form-control" id="unitsToBuy" placeholder="1"> 
                                                </div>
                                                <div class="col-5">
                                                 <label for="unitsToBuy">packs</label>
                                                </div>
                                                
                                               
                                            </div>
                                        </div>
                                        <div v-if="product.methodSelected == ''" class="col-7" style="padding: 0;">
                                            
                                                <div id="info-about-methods">
                                                    <i class="fa-solid fa-circle-exclamation"></i> Seleccione un método de medida
                                                </div>
                                            <div class="row align-items-center justify-content-center ">
                                                <div class="col-5" id="custom-col">
                                                 <input type="text" v-model="product.unitsToBuy" class="form-control" id="unitsToBuy" placeholder="" disabled> 
                                                </div>
                                                <div class="col-5">
                                                 <label for="unitsToBuy">Cantidad</label>
                                                </div>
                                                
                                               
                                            </div>
                                        </div>

                            </div>
                            <div class="row mt-5" id="product-price-row">
                                <div class="col-12 text-right">
                                <span>Precio estimado: {{getEstimatedPriceForProduct(product).toFixed(2)}}€</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>


        <div class="card w-150 border-light" id="resume-repeat-order">
            <div class="row align-items-center justify-content-center ">
                <div class="col-6 col-sm-5">
                     <label for="anotations-order">Observaciones</label>
                    <textarea type="text" v-model="anotationsOrder" class="form-control" id="anotations-order" placeholder="¿Qué debemos tener en cuenta?"></textarea>     
                </div>
                <div class="col-6 col-sm-7 text-right">
                    <table class="" style="width: 100%">
                        <tr  class="text-right">
                        
                            <td><b>Resumen de pedido</b>
                                <hr style="margin: 0; width: 20%; margin-left: 80%;">
                            </td>
                            
                        </tr>
                        
                        <tr  class="text-right">
                           
                            <td>Precio: ....... {{(getEstimatedPriceForAllProducts() * 0.79).toFixed(2)}}€ </td>
                        </tr>
                        <tr  class="text-right">
                        
                            <td>IVA(21%): ....... {{(getEstimatedPriceForAllProducts() * 0.21).toFixed(2)}}€</td>
                        </tr>
                        <tr  class="text-right">
                        
                            <td style="color: red;"><del>Cupón descuento: ....... 0.00€</del> </td>
                            
                        </tr>
                        <hr style="margin: 0; width: 20%; margin-left: 80%;">
                        <tr  class="text-right">
                        
                            <td>Total: ....... {{getEstimatedPriceForAllProducts().toFixed(2)}}€ </td>
                        </tr>
                    </table>
                </div>
            </div>
           
                
                    <div class="text-right">
                    <button class="btn btn-success" @Click="confirmBuy" :disabled="this.products.length <= 0">Confirmar pedido</button>
                    </div>
         </div>

       



</div>


</section>
</template>

<script>
import * as storeService from "@/shared/services/storeService"
import * as orderService from "@/shared/services/orderService"
import * as productService from "@/shared/services/productService"

export default {
     props: {
     
     
     },
     data(){
         return{
            products: [{'id': 1}, {'id': 2}],
            storeInfo: '',
            anotationsOrder: '',
            dialogActive: false,
            productsReceived: [],
            fStoreReceived: 0, 
            timesOrdered: 0,
            updatedProducts: []

         }
         
     },
     setup(){
     },

     mounted(){
         //this.products = this.productsReceived;
         //this.getUpdatedInfoProducts()
         //this.getCartProductsFromCustomer();
        // this.getStoreInfo();
     },
     methods: {
          hidde(){
        this.dialogActive = false;

             },
            show(productsR, storeR, timesorderedR){
                this.products = productsR;
                this.fStoreReceived = storeR;
                this.timesOrdered = timesorderedR;

                this.getUpdatedInfoProducts();
                this.getStoreInfo();
                this.dialogActive = true;
             },
         getEstimatedPriceForAllProducts(){
             let total = 0;
             this.products.forEach( product => {
                total += this.getEstimatedPriceForProduct(product)
             })
             return total;
         },
         getEstimatedPriceForProduct(product){

             if(product.methodSelected == 'kg')
             {
                 return product.unitsToBuy * product.price_per_kg 
             }
             else if(product.methodSelected == 'pieces'){
                 return product.unitsToBuy * product.price_per_unit
             }
             else if(product.methodSelected == 'pack'){
                 return product.unitsToBuy * product.packQuantity * product.price_per_unit
             }
             else{
                 return 0;
             }
         },
          getStoreInfo(){
            storeService.getStoreData(this.fStoreReceived).then((response) => {
                console.log(response)
                this.storeInfo = response.data
                console.log('storeInfo', this.storeInfo)
            }).catch((error) => {
                console.error(error);
            })
            },

         confirmBuy(){
             //Before buying, we set the price for the products
             this.products.forEach( product => {
                 product['estimated_price'] = this.getEstimatedPriceForProduct(product);
             })
             //All the prices sum 
             let totalPrice = this.getEstimatedPriceForAllProducts();

             orderService.createOrderRepeated(this.storeInfo.id, localStorage.getItem('userId'), totalPrice, this.timesOrdered, this.anotationsOrder).then((response) => {
                console.log(response)
                if(response.status == '201'){
                    //Order created correctly, now insert items

                    orderService.createOrderItems(response.data.id, this.products).then((response) => {
                     console.log(response)
                     if(response.status == 201){
                         console.log('Pedido correcto')
                     }
                    }).catch((error) => {
                        console.error(error);
                    })

                }
            }).catch((error) => {
                console.error(error);
            })

         },

         discardProduct(product){
             console.log('product received to delete', product);
             console.log('products', this.products)
             console.log(this.products[1].id)
             console.log(product.id)
             let index = this.products.findIndex(function(item) {
                 console.log('dentro del findindex', product);
                 console.log('dentro del findindex item', item);
                 return item == product;
             })
             console.log('Voy a borrar', index)
             if(index != -1)
             {
               this.products.splice(index,1);
               

             }
             
         },


         async getUpdatedInfoProducts(){
             console.log('productos repeatOrder', this.products);
             console.log('fStore', this.fStoreReceived)
             this.updatedProducts = [];
            await this.products?.forEach( product => {
                productService.getProductById(product.productId).then( resp => {
                    let updatedproduct = resp.data;
                    if(updatedproduct.methodsAllowed.split(';').includes(product.methodSelected))
                    {
                        updatedproduct['methodSelected'] = product.methodSelected;
                    }
                    else
                    {
                        updatedproduct['methodSelected'] = '';
                    }
                    
                    updatedproduct['unitsToBuy'] = product.unitsToBuy;
                    console.log('Aqui un producto', updatedproduct)
                    this.updatedProducts.push(updatedproduct);
                })
            })

            console.log('updatedPRODUCTS', this.updatedProducts)
            this.products = this.updatedProducts;

          

         },

          //Dynamically show dialog error/success 
    showDialogProcessResult(){
      if(this.processStatus == 'success'){
        this.$refs['loginDialogStatusSuccess'].show();

      }
      else if(this.processStatus == 'error'){
        this.$refs['loginDialogStatusError'].show();
      }

    },




     }




}
</script>

<style>
#repeat-order-title{
    text-align: left;
}
#total-price-buy{
    font-size: 160%;
    color: green;
}
#anotations-order{
    width: 80%;
    height: 10rem;
}
#resume-repeat-order{
    width: 72%;
    margin-left: 14%;
    margin-right: 10%;
}
#card-body-product{
    padding: 1rem;
}
#product-price-row{
    font-size: 150%;
}

#methodSelect{
    min-width: 70%;
}
#custom-col{
    padding: 0;
}
#info-about-methods{
 background-color: rgb(164, 157, 246);
    margin-bottom: 3%;   
}
#warning-pack{
    background-color: rgb(247, 247, 104);
    margin-bottom: 3%;
}
#info-kg{
    background-color: rgb(195, 195, 195);
    margin-bottom: 3%;
}
#product-card{
    margin: 5%;
}

.cart-products-show{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
}

.repeat-order{
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(30, 31, 30, 0.6);
}
.repeat-order-inner{
    margin-top: 5%;
    margin-left: 20%;
    overflow-y: auto;
    overflow-x: hidden ;
    z-index: 9999;
    width: 60%;
    height: 80%;
    box-shadow: 0;
    border-radius: 0%;
    background-color: rgb(255, 255, 255);

}
.repeat-order-inner-body{
    margin-top: 8%;

}
.repeat-order-inner-header{
    position: fixed;
    z-index: 10001;
    background-color: rgb(255, 255, 255);
    width: 60%;
}
#buy-item-card-img{
    width: 100%;
    height: 90%;
}
#repeat-order-delete-button{
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 6px;
    padding-right: 6px;
}
#unitsToBuy{
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 6px;
    padding-right: 6px;
}
@media (max-width: 767.98px) { 
   #buy-item-card-img{
    width: 100%;
    height: 50%;
    } 
    #product-price-row{
    font-size: 70%;
}
.repeat-order-inner{
    margin-top: 5%;
    margin-left: 5%;
    overflow-y: auto;
    overflow-x: hidden ;
    z-index: 9999;
    width: 90%;
    height: 80%;
    box-shadow: 0;
    border-radius: 0%;
    background-color: rgb(255, 255, 255);

}
.repeat-order-inner-header{

    width: 90%;
}

.cart-products-show{
    margin-left: 0%;
    margin-right: 0%;
    width: 100%;
    font-size: 70% !important;
}
#resume-repeat-order{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    font-size: 70% !important;
}
#anotations-order{
font-size: 90%;
}
.repeat-order-inner-body{
    margin-top: 12%;

}
 }
 
</style>
