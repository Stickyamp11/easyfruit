import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

    
 export async function getCart() {
        return await axios.get('/cart/' + localStorage.getItem('userId'), { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
            return response;
        }).catch(function (error) {
            console.error(error);
        });
    }


export async function insertProductIntoCart(productId){
    return await axios.post('/cart', {
            
        'productId': productId,
        'customerId': localStorage.getItem('userId')
    
    
},{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
         return response;
     }).catch(function(error){
         console.error(error);
     })

}

export async function deleteProductFromCart(productId){
    return await axios.delete('/cart', { 
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        data: { 'productId': productId, 'customerId': localStorage.getItem('userId')}
    
    } ).then(function(response){
         return response;
     }).catch(function(error){
         console.error(error);
     })

}


export async function deleteCart(){
    return await axios.delete('/cart/all', { 
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        data: { 'customerId': localStorage.getItem('userId')}
    
    } ).then(function(response){
         return response;
     }).catch(function(error){
         console.error(error);
     })

}



export async function getNumberOfItems() {
    return await axios.get('/cart/total/' + localStorage.getItem('userId'), { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
        return response;
    }).catch(function (error) {
        console.error(error);
    });
}