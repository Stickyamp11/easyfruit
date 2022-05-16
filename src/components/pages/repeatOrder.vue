<template>
    <div class="row mt-5 ml-5 mr-5">
       
        <div class="col-12 ">
            <h1>Pedidos que sueles hacer</h1>
            <hr class="titleSeparator mb-5">
            <div class="row" :key="toporder.id" v-for="toporder in topOrders">
                <div class="col-12" style="margin-left: 5%; margin-bottom: 10%; flex: 0 0 90%;" >
                    <div class="row">
                        <div class="col-6">
                            <span style="font-size: 200%; color: green; font-weight: 500;">{{toporder.storeName}}</span>
                        </div>

                        <div class="col-6 text-right d-flex justify-content-end align-items-center" style="">
                            <button class="btn btn-success" v-on:click="adjustOrderToRepeat(toporder)" style="font-size: 1rem;">
                                <span class="mr-2">Repetir pedido</span> <i class="fa-solid fa-repeat"></i>
                            </button>
                        </div>

                    </div>
                        <hr class="itemSeparatorOrders">

                        <div class="row">
                            <div class="col-12">
    
                            <div style="width: 100%; overflow-x: auto; ">
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
import * as orderService from "@/shared/services/orderService"
import * as productService from "@/shared/services/productService"
import * as storeService from "@/shared/services/storeService"
import RepeatOrder from "@/components/pages/repeatBuy.vue"

import {sharedData} from "../../shared/sharedData"
//import DialogNotification from "./DialogNotification/dialog-notification.vue"
export default {
  name: 'repeat-orders',
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
      
    }
  },
  computed: {

  },
  mounted () {
    this.refreshData()
    
  },
  methods: {
     
      adjustOrderToRepeat(order){
          console.log('adjust clicked', order);
          this.repeatBuyFstore = order.fStore;
          this.repeatBuyProducts = order.items;
          this.repeatBuyTimesordered = order.times_ordered;
          console.log('items', order.items)
          console.log('items', order.items)
          this.$refs['repeatOrder'].show(this.repeatBuyProducts, this.repeatBuyFstore, this.repeatBuyTimesordered, order.id);
      },
     
    async refreshData(){

    orderService.getMostFrequentedOrders().then( response => {
         console.log(' getOrders response', response )
         orderService.getFullOrdersOneCall().then ( res => {
           console.log(' getOrdersFull response', res )
         })
         this.topOrders = response.data;



                    this.topOrders.forEach(order => {
                                orderService.getItems(order).then( response => {
                                        console.log('getItems response', response )
                                        order['items'] = response.data;
                                        //Get store name for the order.
                                        this.getStoreInfo(order);

                                        order.items.forEach(item => {
                                        productService.getProductById(item.productId).then( response => {
                                                console.log('getProductById response', response )
                                                item['productData'] = response.data;
                                                 //Once we have the products we set the pagination:
                                            });
                                        });

                                    });
                        });

     })
   

   
    console.log('topOrders', this.topOrders)
    this.loading = false;
   
    },


    async getStoreInfo(order){
            console.log('AQYI', order.fStore)
            await storeService.getStoreData(order.fStore).then((response) => {
                console.log(response)
                order['storeName'] = response.data.name;
                console.log('storeInfo', this.storeInfo)


            }).catch((error) => {
                console.error(error);
            })
            },

  }
}



</script>

<style>
/* Large rounded green border */
hr.titleSeparator {
  border: 6px solid rgba(27,112,13,255);
  border-radius: 5px;
  width: 25rem;
  margin-left: 0;
}
.green-status{
    background-color: rgba(27,112,13,255);
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
    overflow-y: auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

}

#orders-history-table .btn-success{
  background-color: rgba(27,112,13,255);
  border-color: rgba(27,112,13,255);

}
.hidden_tr{
    visibility: hidden;
}

#page-item-orders-link{
color: rgba(27,112,13,255);

}
#page-item-orders-link.active > .page-link{
  border-color: none;
  background-color: rgba(27,112,13,255);
  color: white;
}

.itemSeparatorOrders{
   border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  width: 100%;
  margin-left: 0;
}
</style>