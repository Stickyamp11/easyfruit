import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

 export async function createOrder(storeId, customerId, totalPrice,anotations,) {
        return await axios.post('/order', {
            
                'fStore': storeId,
                'fCustomer': customerId,
                'estimated_total': totalPrice,
                'anotations': anotations,
                'times_ordered': 0,

            
            
        },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }

    export async function createOrderRepeated(storeId, customerId, totalPrice, timesOrdered, anotations) {
        return await axios.post('/order', {
            
                'fStore': storeId,
                'fCustomer': customerId,
                'estimated_total': totalPrice,
                'times_ordered': timesOrdered,
                'anotations': anotations,

            
            
        },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }

    export async function createOrderItems(orderId, itemsFromOrder) {
        return await axios.post('/orderitem', {
            
                'itemsFromOrder': itemsFromOrder,
                'ordenId': orderId
            
            
        },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }
    
export async function getFullOrdersAndItems() {
    let orders =  axios.get('/order',
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: { idCustomer: localStorage.getItem('userId')}
    }
    )
    //When received orders then we look for items
    console.log('orders', orders)
    
    //Looking for items
    orders.forEach((order) => {

        //Getting item
      let orderItems =  axios.get('/orderitem',
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            params: { idOrder: order.id}
        }
        );

            console.log('Order item')
            order['items'] = orderItems.data;
            console.log(orderItems)

            //Once we have the item we bring all the info about the products
            order.items.forEach( item => {
            let productData = axios.get('/product/' + item.productId,
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                
            }
            );
            item['productData'] = productData.data;
       

    });
    //End forEach
            
        
    });
    //End forEach

    return orders;

    


    
    
      
}
export async function getMostFrequentedOrders(){
    return await axios.get('/order/top',
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: { idCustomer: localStorage.getItem('userId')}
    }
    ).then(function (response) {
        return response;
    }).catch( error => console.error(error))

}

export async function getOrders(){
    return await axios.get('/order',
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: { idCustomer: localStorage.getItem('userId')}
    }
    ).then(function (response) {
        return response;
    }).catch( error => console.error(error))

}
export async function getItems(order){
    return await axios.get('/orderitem',
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: { idOrder: order.id}
    }
    ).then((res) => {
        return res;
    }).catch(error => console.error(error));

}
