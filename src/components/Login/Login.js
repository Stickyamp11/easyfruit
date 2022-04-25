import axios from "axios"
import {sharedData} from "../../shared/sharedData"
import DialogNotification from "../DialogNotification/dialog-notification.vue"
import * as customerService from "@/shared/services/customerService"
export default {

  name: 'login',
  components: {DialogNotification},
  props: [],
  data () {
    return {
      loginSuccess: Boolean,
      successLink: '/home',
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

          console.log(res)
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
              })




            
           // this.$root.$emit('logged-event', 'OK')
           sharedData.userEmail = this.email;
           sharedData.userLogged = true;

           console.log('login')
           console.log(sharedData)
           console.log(sharedData.userEmail)


           //Opens success dialog 
           this.loginSuccess = true;
           console.log(this.loginSuccess)
           //this.$root.emit('refreshNavbar');
          }

          //this.dialogSuccess = true;
        }).catch(
          err => {
            console.log(err)
          }
        
      )


      console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('fejfjefwe'))
    },
  }

}


