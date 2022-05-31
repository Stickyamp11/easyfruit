import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

 export async function getCustomer(email) {
        return await axios.post('/customer/email', {
            
                'email': email
            
            
        },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }

export async function updateCustomer(customer, id){
    return await axios.put('/customer/' + id ,{ email: customer.email, name: customer.name, passwd: customer.passwd, phone: customer.phone, zip: customer.zip, address: customer.address
     },{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(function(response){
         return response;
     }).catch(function(error){
         console.log(error);
     })

}
