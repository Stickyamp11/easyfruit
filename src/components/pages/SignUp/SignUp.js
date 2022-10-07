import axios from "axios"
import DialogSuccessNotification from "../../Dialogs/DialogSuccessNotification/dialog-notification.vue"
import DialogErrorNotification from "../../Dialogs/DialogErrorNotification/dialog-notification.vue"
import * as customerService from "@/shared/services/customerService"
export default {
  name: 'sign-up',
  components: {DialogErrorNotification, DialogSuccessNotification},
  props: [],
  data () {
    return {
      dialogSuccess: false,
      email: '',
      password: '',
      phone:'',
      name:'',
      zip: '',
      direction: '',
      termsAgreement: false,
      processStatus: 'success',
      successLink: '/',



    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    async handleSubmit(){
      await axios.post('/customer',
      {
        "name": this.name,
        "email": this.email,
        "phone": this.phone,
        "passwd": this.password,
        "zip": this.zip,
        "address": this.direction,
        "seller": 'no',
      }).then(
        res => {

          if(res.status == 201){


              //Saves session info
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('userEmail', this.email);

              customerService.getCustomer(this.email).then((response) => {
                //Sets localStorage userId
                localStorage.setItem('userId', response.data.id)
                localStorage.setItem('isStoreManager', response.data.seller)
              }).catch((error) => {
                console.error(error);
                this.showDialogProcessResult();
              })


            //Enable reload
            this.logged();

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
            console.error(err)
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

    logged(){
      localStorage.setItem('reload', 'true');
    }

  }
}


