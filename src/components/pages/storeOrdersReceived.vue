<template>
    <div class="row mt-5 ml-5 mr-5">
       
        <div class="col-12">
            <h1>Pedidos recibidos</h1>
            <hr class="titleSeparator">
            <div class="mb-3" id="orders-history-table-wrapper">
            <table class="table" id="orders-history-table" style="">
                <thead>
                    <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cantidad de productos</th>
                    <th scope="col">Precio estimado</th>
                    <th scope="col">Anotaciones</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Ver</th>
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
                    <td class="align-middle"> <span class="badge p-2" :class="[{'green-status': order.status == 'created',
                     'yellow-status': order.status == 'delivering',
                    'red-status': order.status == 'closed',
                    'orange-status2': order.status == 'ready',
                    'orange-status': order.status == 'sent',
                    'blue-status': order.status == 'delivered' }]" style="color: white;">
                        
                        <select v-model="order.status" class="status-select" @change="orderStatusChanged($event, order)">
                            <option value="created">Creado por el usuario</option>
                            <option value="delivering">Preparando</option>
                            <option value="sent">Enviado</option>
                            <option value="ready">Listo para recogida</option>
                            <option value="delivered">Entregado</option>
                            <option value="closed">Cerrado</option>
                        </select>

                         </span>
                    </td>
                    <!-- Opciones --> 
                    <td class="align-middle">

                        <button class="btn btn-success mr-2" v-on:click="showHiddenTr('hiddenTr' + order.id)" :disabled="order.items.length <= 0" style="font-size: 1rem;">
                         +
                        </button>
                    </td>
                    </tr>

                    <tr :id="'hiddenTr' + order.id" style="display: none;">
                            <td style="width: 100%;" colspan="6">
                              <div class="col-12 mb-3">
                                <span class="hiddenInfoCustomer">Nombre:</span> {{order.customerName}}
                                <span class="hiddenInfoCustomer">Email:</span> {{order.customerEmail}} 
                                <span class="hiddenInfoCustomer">Teléfono:</span> {{order.customerPhone}}
                                <span class="hiddenInfoCustomer"> Tipo de pedido:</span> {{order.deliverOptions == 'takeHome' ? 'Enviar a casa' : 'Recogida en tienda'}}
                                <span v-if="order.deliverOptions == 'deliverHome'" class="hiddenInfoCustomer"> Dirección:</span> <span v-if="order.deliverOptions == 'deliverHome'">{{order.customerAddress}}</span>
                              </div>
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
import * as storeService from "@/shared/services/storeService"
import * as orderService from "@/shared/services/orderService"
//import * as productService from "@/shared/services/productService"
import RepeatOrder from "@/components/pages/repeatBuy.vue"

import {sharedData} from "../../shared/sharedData"
//import DialogNotification from "./DialogNotification/dialog-notification.vue"
export default {
  name: 'store-orders-received',
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
      pageElements: 10,
      paginatedOrders:[],
      pageSelected: 1,
      storeInfo: ''
    }
  },
  computed: {

  },
  mounted () {
    this.getStoreInfo();
    
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
      showHiddenTr(tr){
          console.log('Estoy en el showHidden')
          console.log(tr)
          let element = document.getElementById(tr);
          element.style.display = element.style.display === 'none' ? '' : 'none';
      },
 
    async refreshData(){
      orderService.getFullOrdersPendingOfStoreOneCall(this.storeInfo.id).then( response => {
        console.log('el id del store', this.storeInfo.id)
         console.log(' getOrders response', response )
         this.orders = response.data;
          this.orders.forEach( order => {
            //Add values to determinate which order is more important to attend
            if(order.status == 'created'){
              order['prio'] = 4;
            }
            if(order.status == 'delivering'){
              order['prio'] = 3;
            }
            if(order.status == 'sent'){
              order['prio'] = 2;
            }
            if(order.status == 'ready'){
              order['prio'] = 2;
            }
            if(order.status == 'delivered'){
              order['prio'] = 1;
            }
            if(order.status == 'closed'){
              order['prio'] = 0;
            }
           
          })
         this.orders = this.orders.sort( function(a,b) {

           if(a.prio > b.prio){
             return -1;
           }
           else if(a.prio < b.prio){
             return 1;
           }
           else{
             return 0;
           }
         })

          this.getDataPage(1);
     });


    this.loading = false;
   
    },

    async getStoreInfo(){
            await storeService.getStoreDataByManagerEmail(localStorage.getItem('userEmail')).then((response) => {
                console.log(response)
                console.log('aqui userEmail', localStorage.getItem('userEmail'))
                this.storeInfo = response.data
                console.log('storeInfo', this.storeInfo)

                //Then refresh data
                this.refreshData();

            }).catch((error) => {
                console.error(error);
            })
            },
      
    orderStatusChanged(event, order){
      console.log('cambiado en el changed', event.target.value)
      order.status = event.target.value;

      //Call API to save changes

      orderService.updateStatusOrder(order.id, order.status).then (res => {

        if(res.status == 201) {
          console.log('ih')
        }
        else
        {
          //Something went wrong
          console.log('hi')
        }
      });


    }


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
.orange-status{
    background-color: rgb(235, 183, 72);
    color: black;
    border-radius: 10%;
    padding: 0;
}
.orange-status2{
    background-color: rgb(235, 183, 72);
    color: black;
    border-radius: 10%;
    padding: 0;
}
.blue-status{
    background-color: rgb(92, 155, 192);
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


.status-select{
  background: none;
  border: none;
  font-weight: 500;
  color: white;
}
.status-select option{
  background: none;
  border: none;
  font-weight: 100;
  color: rgb(0, 0, 0);
}

.hiddenInfoCustomer{
  font-weight: 700;
  color: green;
  margin-right: 1rem;
  margin-left: 1rem;
}

</style>