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
    console.log('He entrado al login')
  },
  methods: {

    async handleSubmit(){
      console.log(this.email)
      console.log('submitted')

       await axios.post('/auth',
      {
        "email": this.email,
        "passwd": this.password,
      }).then(
        res => {

          console.log('AQUI LA RES', res)
          if(res.status == 200){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userEmail', this.email);


              customerService.getCustomer(this.email).then((response) => {
              console.log('Datos usuario', response)
              //Sets localStorage userId
              localStorage.setItem('userId', response.data.id)
              localStorage.setItem('isStoreManager', response.data.seller)
              }).catch((error) => {
              console.error(error);
              this.showDialogProcessResult();
              })




            
           // this.$root.$emit('logged-event', 'OK')
           sharedData.userEmail = this.email;
           sharedData.userLogged = true;

           console.log('login')
           console.log(sharedData)
           console.log(sharedData.userEmail)


           
           console.log(this.loginSuccess)
           //this.$root.emit('refreshNavbar');


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

          //this.dialogSuccess = true;
        }).catch(
          err => {
            console.log(err)
            this.processStatus = 'error';
            this.showDialogProcessResult();
          }
        
      )


      console.log(localStorage.getItem('token'))
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

      //Enable reload
      localStorage.setItem('reload', 'true');

    }

  }

}


