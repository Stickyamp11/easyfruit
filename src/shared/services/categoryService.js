import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

    export async function getCategories() {
    return await axios.get('/productCategory',{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
        return response;
    }).catch(function (error) {
        console.error(error);
    });
}