<template>
    <div class="row mt-5 ml-5 mr-5">
       
        <div class="col-12">
            <h1>Historial de pedidos</h1>
            <hr class="titleSeparator">
            <div class="mb-3" id="orders-history-table-wrapper">
            <table class="table" id="orders-history-table" style="">
                <thead>
                    <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cantidad de productos</th>
                    <th scope="col">Precio estimado</th>
                    <th scope="col">Anotaciones</th>
                    <th scope="col">Tipo de envío</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Ver más</th>
                    </tr>
                </thead>

                <tbody :key="order.id" v-for="order in paginatedOrders">
                    <tr class="">
                    <td class="align-middle">
                        {{order.order_date.split("00:00:00 GMT")[0]}}
                    </td>
                    <td class="align-middle">{{order.items?.length}}</td>
                    <td class="align-middle">{{parseFloat(order.estimated_total).toFixed(2)}}€</td>
                    <td class="align-middle">{{order.anotations}}</td>
                    <td class="align-middle">{{order.deliverOptions == 'takeStore' ? 'Recogida en tienda' : 'Envío a casa'}}</td>
                    <td class="align-middle"> <span class="badge p-2" :class="[{'green-status': order.status == 'created',
                     'yellow-status': order.status == 'delivering',
                    'red-status': order.status == 'closed' }]" style="color: white;">
                        
                        {{order.status}}
                         </span>
                    </td>
                    <!-- Opciones --> 
                    <td class="align-middle">

                        <button class="btn btn-success mr-2" v-on:click="showHiddenTr('hiddenTr' + order.id)" :disabled="order.items.length <= 0" style="font-size: 1rem;">
                         +
                        </button>
                        <button class="btn btn-success" v-on:click="adjustOrderToRepeat(order)" style="font-size: 1rem;">
                        <i class="fa-solid fa-repeat"></i>
                        </button>
                    </td>
                    </tr>

                    <tr :id="'hiddenTr' + order.id" style="display: none;">
                            <td style="width: 100%;" colspan="7">
                             <div class="hidden-table-wrapper" style="border: 2px solid; border-color: rgba(27,112,13,255);"> 
                                <table style="width: 100%;">
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
                             </div>
                            </td>

                        
                    </tr>
                </tbody>
            </table>
          
            </div>

                
               <nav aria-label="Easy navigation" >
                <ul class="pagination justify-content-center" id="customer-order-list-pagination" >
                    <li class="page-item" v-on:click="getPreviousPage()"><a class="page-link" id="page-item-orders-link" >Previous</a></li>
                    <li id="page-item-orders-link" v-for="page in tableMaxPages()" :key="page" v-on:click="getDataPage(page)" class="page-item" v-bind:class="isActive(page)"><a class="page-link" id="page-item-orders-link">{{page}}</a></li>
                    <li class="page-item" v-on:click="getNextPage()"><a class="page-link" id="page-item-orders-link">Next</a></li>

                </ul>
                </nav>
        </div>

       
    </div>

    <RepeatOrder ref="repeatOrder">
    </RepeatOrder>
</template>

<script>
import * as orderService from "@/shared/services/orderService"
//import * as productService from "@/shared/services/productService"
import RepeatOrder from "@/components/pages/repeatBuy.vue"

import {sharedData} from "../../shared/sharedData"
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
      pageElements: 10,
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
          this.$refs.repeatOrder.show(this.repeatBuyProducts, this.repeatBuyFstore, this.repeatBuyTimesordered, order.id, order.deliverOptions);
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
      orderService.getFullOrdersOneCall().then( response => {
         console.log(' getOrders response', response )
         this.orders = response.data.reverse();
          this.getDataPage(1);
     });
   
    console.log('topOrders', this.topOrders)
    this.loading = false;
   
    },

    refreshData2(){
         orderService.getFullOrdersAndItems().then((response) => {
            this.orders = response;
            this.loading = false;
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