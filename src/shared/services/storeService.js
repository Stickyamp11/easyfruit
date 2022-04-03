import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/v1';
export async function getStoreProducts(id) {
    return await axios.get('/product/store/'+ id,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}

export async function getStoreProduct(idStore, idProduct) {
    console.log('service here')
    console.log(idProduct, idStore)
    return await axios.get('/product/store',
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      params: { idProduct: idProduct, idStore: idStore}
    }
    ).then(function (response) {
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}
export async function getStoreData(id) {
    return await axios.get('/store/'+ id,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}

export async function getStoreDataByManagerEmail(email) {
    return await axios.get('/store/emailManager/'+ email,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}