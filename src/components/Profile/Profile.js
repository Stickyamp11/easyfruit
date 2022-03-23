import * as customerService from "@/shared/services/customerService"
import {sharedData} from "../../shared/sharedData"
import DialogNotification from "../DialogNotification/dialog-notification.vue"
export default {
  name: 'profile',
  components: {DialogNotification},
  props: [],
  data () {
    return {
      sharedData,
      dialogSuccess: false,
      customerId: 0,
      email: '',
      password: '',
      phone:'',
      name:'',

    }
  },
  computed: {

  },
  mounted () {
    this.refreshData()
  },
  methods: {


    async refreshData(){
      //console.log(this.email)
      //console.log('submitted')
      console.log(sharedData)
      await customerService.getCustomer(localStorage.getItem('userEmail')).then(
        res => {
          console.log(res)
          this.customerId = res.data.id;
          this.email = res.data.email;
          this.phone = res.data.phone;
          this.name = res.data.name;
        }).catch(
          err => {
            console.log(err)
          }
        
      )

      //localStorage.setItem('token', response.data.token)
    },

    async handleSubmit(){

      console.log('submitted')

      let customer = {
        "name": this.name ? this.name : "",
        "email": this.email ? this.email : "",
        "phone": this.phone ? this.phone : "",
        "passwd": this.password ? this.password : "",
      }
      await customerService.updateCustomer(customer, this.customerId).then(
        res => {
          console.log(res)
          this.dialogSuccess = true;
        }).catch(
          err => {
            console.log(err)
          }
        
      )

    },

  }
}


