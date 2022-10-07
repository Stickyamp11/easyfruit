import axios from "axios"
import {sharedData} from "@/shared/sharedData"
import DialogSuccessNotification from "../../Dialogs/DialogSuccessNotification/dialog-notification.vue"
import DialogErrorNotification from "../../Dialogs/DialogErrorNotification/dialog-notification.vue"
import * as customerService from "@/shared/services/customerService"
export default {

  name: 'login',
  components: {DialogSuccessNotification,DialogErrorNotification},
  props: [],
  data () {
    return {
      loginSuccess: Boolean,
      successLink: '/',
      processStatus: 'error',
      sharedData,
      email: '',
      password: ''
    }
  },
  computed: {
    
  },
  mounted () {
    this.loginSuccess = false;
  },
  methods: {

    async handleSubmit(){
       await axios.post('/auth',
      {
        "email": this.email,
        "passwd": this.password,
      }).then(
        res => {
          if(res.status == 200){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userEmail', this.email);

            customerService.getCustomer(this.email).then((response) => {
              localStorage.setItem('userId', response.data.id)
              localStorage.setItem('isStoreManager', response.data.seller)
            }).catch((error) => {
              console.error(error);
              this.showDialogProcessResult();
            })

           sharedData.userEmail = this.email;
           sharedData.userLogged = true;
   
           //Send dialog success
            this.logged();
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


