import * as customerService from "@/shared/services/customerService"
import {sharedData} from "../../../shared/sharedData"
import DialogSuccessNotification from "../../Dialogs/DialogSuccessNotification/dialog-notification.vue"
import DialogErrorNotification from "../../Dialogs/DialogErrorNotification/dialog-notification.vue"
export default {
  name: 'profile',
  components: {DialogSuccessNotification,DialogErrorNotification},
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
      zip: '',
      direction: '',
      successLink: '',
      processStatus: 'success',
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
          this.zip = res.data.zip;
          this.direction = res.data.address;
        }).catch(
          err => {
            console.log(err)
            //Send dialog error
            this.processStatus = 'error';
            this.showDialogProcessResult();
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
        "zip": this.zip ? this.zip : "",
        "address": this.direction ? this.direction : ""
      }
      await customerService.updateCustomer(customer, this.customerId).then(
        res => {
          console.log(res)
          if(res.status == 201)
          {
            //Send dialog success
            this.processStatus = 'success';
            this.showDialogProcessResult();

          }
          else{
            //Send dialog error
            this.processStatus = 'error';
            this.showDialogProcessResult();

          }


        }).catch(
          err => {
            console.log(err)
            //Send dialog error
            this.processStatus = 'error';
            this.showDialogProcessResult();
          }
        
      )

    },
     //Dynamically show dialog error/success 
     showDialogProcessResult(){
      if(this.processStatus == 'success'){
        this.$refs['loginDialogStatusSuccess'].show();

      }
      else if(this.processStatus == 'error'){
        this.$refs['loginDialogStatusError'].show();
      }

    },

  }
}


