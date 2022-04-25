<template>
    <div class="row mt-5 ml-5 mr-5">
       
        <div class="col-12">
            <h1>Historial de pedidos</h1>
            <hr class="titleSeparator">
            <div id="orders-history-table-wrapper">
            <table class="table" id="orders-history-table" style="border: 1px solid">
                <thead>
                    <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cantidad de productos</th>
                    <th scope="col">Precio estimado</th>
                    <th scope="col">Anotaciones</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Ver más</th>
                    </tr>
                </thead>

                <tbody :key="order.id" v-for="order in paginatedOrders">
                    <tr class="">
                    <td class="align-middle">
                        {{order.order_date}}
                    </td>
                    <td class="align-middle">{{order.items?.length}}</td>
                    <td class="align-middle">{{parseFloat(order.estimated_total).toFixed(2)}}€</td>
                    <td class="align-middle">{{order.anotations}}</td>
                    <td class="align-middle" :class="{'green-status': order.status == 'created',
                     'yellow-status': order.status == 'delivering',
                    'red-status': order.status == 'closed' }" style="padding: 0;">
                        
                        {{order.status}}
                         
                    </td>
                    <!-- Opciones --> 
                    <td class="align-middle">

                        <button class="btn btn-primary" v-on:click="showHiddenTr('hiddenTr' + order.id)" style="font-size: 1rem;">
                         +
                        </button>
                        <button class="btn btn-primary" v-on:click="adjustOrderToRepeat(order)" style="font-size: 1rem;">
                        <i class="fa-solid fa-repeat"></i>
                        </button>
                    </td>
                    </tr>

                    <tr :id="'hiddenTr' + order.id" style="display: none;">
                            <td style="width: 100%;" colspan="6">
                            <table style="width: 100%; border: 2px solid; border-color: green;">
                                <thead>
                                    <tr>
                                    <th scope="col">Nombre Producto</th>
                                    <th scope="col">Unidades</th>
                                    <th scope="col">Método de medida</th>
                                    <th scope="col">Precio estimado</th>
                                    </tr>
                                </thead>
                                <tbody :key="item.productId" v-for="item in order.items">
                                    <tr>
                                        <td>{{item.productData?.name}}</td>
                                        <td>{{item.unitsToBuy}}</td>
                                        <td>{{item.methodSelected}}</td>
                                        <td>{{parseFloat(item.estimated_price).toFixed(2)}}€</td>
                                    </tr>
                                </tbody>
                            </table>
                            </td>

                        
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Easy navigation" style="margin-left: 80%">
                <ul class="pagination" id="customer-order-list-pagination">
                    <li class="page-item" v-on:click="getPreviousPage()"><a class="page-link" id="page-item-orders-link" >Previous</a></li>
                    <li id="page-item-orders-link" v-for="page in tableMaxPages()" :key="page" v-on:click="getDataPage(page)" class="page-item" v-bind:class="isActive(page)"><a class="page-link" id="page-item-orders-link">{{page}}</a></li>
                    <li class="page-item" v-on:click="getNextPage()"><a class="page-link" id="page-item-orders-link">Next</a></li>

                </ul>
                </nav>
            </div>

                

        </div>

        <div class="col-12 ">
            <h1>Pedidos que sueles hacer</h1>
            <hr class="titleSeparator">
            <div class="row" :key="toporder.id" v-for="toporder in topOrders">
                <div class="col-12" style="margin-left: 5%; margin-bottom: 10%; border: 1px solid; flex: 0 0 90%;" >
                    <div class="row">
                        <div class="col-6">
                            <span style="font-size: 200%; color: black;">Google</span>
                        </div>

                        <div class="col-6 text-right" style="">
                            <button class="btn btn-success" v-on:click="adjustOrderToRepeat(toporder)" style="font-size: 1rem;">
                                <i class="fa-solid fa-repeat"></i>
                            </button>
                        </div>
                    </div>
                        <div class="row">
                            <div class="col-12">
    
                            <div style="width: 100%; overflow-x: auto; background-color: green;">
                                <img v-for="item in toporder.items" :key="item.productId" :src="item.productData?.product_img" style="width: 128px; height: 128px; margin-right: 2%;">
                            </div>
                            </div>
                        </div>
                   
                </div>
            </div>
           
        </div>
    </div>

    <RepeatOrder ref="repeatOrder">
    </RepeatOrder>
</template>

<script>
import * as storeService from "@/shared/services/storeService"
import * as orderService from "@/shared/services/orderService"
import * as productService from "@/shared/services/productService"
import RepeatOrder from "@/components/repeatBuy.vue"

import {sharedData} from "./../shared/sharedData"
//import DialogNotification from "./DialogNotification/dialog-notification.vue"
export default {
  name: 'my-orders',
  components: {RepeatOrder},
  props: [],
  data () {
    return {
      orders: [],
      sharedData,
      dialogSuccess: false,
      customerId: 0,
      successLink: '/',
      loading:true,
      topOrders: [],
      repeatBuyFstore: '',
      repeatBuyProducts: '',
      repeatBuyTimesordered: '',
      pageElements: 5,
      paginatedOrders:[],
      pageSelected: 1
    }
  },
  computed: {

  },
  mounted () {
    this.refreshData()
  },
  methods: {
      isActive(page){
           if(page == this.pageSelected){
             return 'active';
           }
           else{
             return '';
           }
         },
      getDataPage(pageNumber){
         this.pageSelected = pageNumber;
         this.paginatedOrders = [];
         let ini = (pageNumber * this.pageElements) - this.pageElements;
         let fin = (pageNumber * this.pageElements);

         /*for(let index = ini; index < fin ; index++){
           this.paginatedProducts.push(this.products[index]);
         }*/
         this.paginatedOrders = this.orders.slice(ini, fin);
         console.log('Estoy en el getDataPage', this.paginatedOrders)
       },
          tableMaxPages(){
            return Math.ceil(this.orders.length / this.pageElements);
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
      adjustOrderToRepeat(order){
          console.log('adjust clicked', order);
          this.repeatBuyFstore = order.fStore;
          this.repeatBuyProducts = order.items;
          this.repeatBuyTimesordered = order.times_ordered;
          console.log('items', order.items)
          console.log('items', order.items)
          this.$refs.repeatOrder.show(this.repeatBuyProducts, this.repeatBuyFstore, this.repeatBuyTimesordered);
      },
      showHiddenTr(tr){
          console.log('Estoy en el showHidden')
          console.log(tr)
          let element = document.getElementById(tr);
          element.style.display = element.style.display === 'none' ? '' : 'none';
      },
    preview() {
                this.$refs["frame-ref"].src = URL.createObjectURL(event.target.files[0]);
            },
    clearImage() {
                this.$refs["frame-ref"].src = "";
            },

    async refreshData(){
      orderService.getOrders().then( response => {
         console.log(' getOrders response', response )
         this.orders = response.data;



                    this.orders.forEach(order => {
                                orderService.getItems(order).then( response => {
                                        console.log('getItems response', response )
                                        order['items'] = response.data;


                                        order.items.forEach(item => {
                                        productService.getProductById(item.productId).then( response => {
                                                console.log('getProductById response', response )
                                                item['productData'] = response.data;
                                            });
                                        });

                                    });
                        });

     });

     orderService.getMostFrequentedOrders().then( response => {
         console.log(' getOrders response', response )
         this.topOrders = response.data;



                    this.topOrders.forEach(order => {
                                orderService.getItems(order).then( response => {
                                        console.log('getItems response', response )
                                        order['items'] = response.data;


                                        order.items.forEach(item => {
                                        productService.getProductById(item.productId).then( response => {
                                                console.log('getProductById response', response )
                                                item['productData'] = response.data;
                                                 //Once we have the products we set the pagination:
                                                 this.getDataPage(1);
                                            });
                                        });

                                    });
                        });

     })
   

   
    console.log('topOrders', this.topOrders)
    this.loading = false;
   
    },

    refreshData2(){
         orderService.getFullOrdersAndItems().then((response) => {
            this.orders = response;
            this.loading = false;
        })
    },

    async handleSubmit(){

      console.log('submitted')

      let storeUpdated = {
        "name": this.name ? this.name : "",
        "address": this.address ? this.address : "",
        "phone": this.phone ? this.phone : "",
        "id": this.store.id
      }
      await storeService.updateStore(storeUpdated).then(
        res => {
          console.log(res)
          console.log('He entrado dentro del success del updateStore y ejecutaré el uploadImg')


         let formData = new FormData();

          let myFile = document.querySelector('input[type=file]').files[0];
          myFile.fileId = this.store.id;
          formData.append("file", myFile);
          formData.append("id",this.store.id);
          console.log('aquiiii', myFile);
          storeService.uploadImg(formData).then(
              res => {
                  console.log(res)
                 this.dialogSuccess = true;

               }).catch(
          err => {
            console.log(err)
          }
          )


        }).catch(
          err => {
            console.log(err)
          }
        
      )

    },

  }
}



</script>

<style>
/* Large rounded green border */
hr.titleSeparator {
  border: 6px solid green;
  border-radius: 5px;
  width: 30%;
  margin-left: 0;
}
.green-status{
    background-color: rgb(85, 247, 102);
    color: black;
    border-radius: 10%;
    padding: 0;
}
.yellow-status{
    background-color: rgb(209, 247, 85);
    color: black;
    border-radius: 10%;
    padding: 0;

}
.red-status{
    background-color: rgb(247, 126, 85);
    color: black;
    border-radius: 10%;
    padding: 0;

}

#orders-history-table-wrapper{
    max-height: 100%;
    min-height: 100%;
    overflow-y: auto;
}
.hidden_tr{
    visibility: hidden;
}

#page-item-orders-link{
color: green;

}
#page-item-orders-link.active > .page-link{
  background-color: green;
  color: white;
}

</style>