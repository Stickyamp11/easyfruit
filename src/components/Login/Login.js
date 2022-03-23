import axios from "axios"
import {sharedData} from "../../shared/sharedData"
import DialogNotification from "../DialogNotification/dialog-notification.vue"
export default {

  name: 'login',
  components: {DialogNotification},
  props: [],
  data () {
    return {
      loginSuccess: Boolean,
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
      console.log(this.email)
      console.log('submitted')

       await axios.post('/api/v1/auth',
      {
        "email": this.email,
        "passwd": this.password,
      }).then(
        res => {

          console.log(res)
          if(res.status == 200){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userEmail', this.email);
           // this.$root.$emit('logged-event', 'OK')
           sharedData.userEmail = this.email;
           sharedData.userLogged = true;

           console.log('login')
           console.log(sharedData)
           console.log(sharedData.userEmail)


           //Opens success dialog 
           this.loginSuccess = true;
           console.log(this.loginSuccess)
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


