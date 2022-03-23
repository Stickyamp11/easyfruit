import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.defaults.headers.delete['Authorization']

export async function getStoreProducts(id) {
    return await axios.get('/product/store/'+ id).then(function (response) {
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}

export async function getStoreData(id) {
    return await axios.get('/store/'+ id).then(function (response) {
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}
