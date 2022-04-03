import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export async function updateProduct(product, id){
    return await axios.put('/product/' + id ,{ name: product.name, product_img: product.product_img, price_per_kg: product.price_per_kg,  description: product.description, fCategory: product.fCategory
     },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
         return response;
     }).catch(function(error){
         console.log(error);
     })

}

export async function createProduct(product){
    return await axios.post('/product' ,{ name: product.name, product_img: '/', price_per_kg: '0', description: product.description, fCategory: product.fCategory, fStore: product.fStore
     },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
         return response;
     }).catch(function(error){
         console.log(error);
     })

    }


export async function deleteProduct(productId){
return await axios.delete('/product/' + productId ,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
    return response;
}).catch(function(error){
    console.log(error);
})
    


}