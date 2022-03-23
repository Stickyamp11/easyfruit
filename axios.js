//Endpoints for API

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
console.log('Holaaaaa')
console.log(axios.defaults.headers.common['Authorization'])



  export default axios;