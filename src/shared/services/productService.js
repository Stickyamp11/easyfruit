import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export async function getProductById(productId) {
    return await axios.get('/product/' + productId,
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        
    }
    ).then(function (response) {
        return response;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function updateProduct(product, id){
    return await axios.put('/product/' + id ,{ name: product.name, price_per_kg: product.price_per_kg, price_per_unit: product.price_per_unit,
    price_per_pack: product.price_per_pack, packQuantity: product.packQuantity, methodsAllowed: product.methodsAllowed
    , description: product.description, fCategory: product.fCategory, fStore: product.fStore,
     },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
         return response;
     }).catch(function(error){
         console.error(error);
     })

}


export async function uploadImg(payLoad){
    return await axios.post('/product/uploadImg' ,payLoad
     ,{ headers: {'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
         return response;
     }).catch(function(error){
         console.error(error);
     })

    }

export async function createProduct(product){
    return await axios.post('/product' ,{ name: product.name, product_img: '/', price_per_kg: product.price_per_kg, price_per_unit: product.price_per_unit,
    price_per_pack: product.price_per_pack, packQuantity: product.packQuantity, methodsAllowed: product.methodsAllowed
    , description: product.description, fCategory: product.fCategory, fStore: product.fStore,
     },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
         return response;
     }).catch(function(error){
         console.error(error);
     })

    }


export async function deleteProduct(productId){
return await axios.delete('/product/' + productId ,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
    return response;
}).catch(function(error){
    console.error(error);
})
   

}


export async function getId(name, storeId) {
    return await axios.get('/product/getid',
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: { name: name, storeId: storeId}
    }
    ).then(function (response) {
        return response;
    }).catch(function (error) {
        console.error(error);
    });
}


export async function getProductsByName(text, storeId) {
    return await axios.get('/product/search',
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        params: { nameProduct: text, storeId: storeId}
    }
    ).then(function (response) {
        return response;
    }).catch(function (error) {
        console.error(error);
    });
}