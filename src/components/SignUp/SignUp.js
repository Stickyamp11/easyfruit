import axios from "axios"
import DialogNotification from "../DialogNotification/dialog-notification.vue"
export default {
  name: 'sign-up',
  components: {DialogNotification},
  props: [],
  data () {
    return {
      dialogSuccess: false,
      email: '',
      password: '',
      phone:'',
      name:'',
      termsAgreement: false,



    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    async handleSubmit(){
      console.log(this.email)
      console.log('submitted')

      const response = await axios.post('/customer',
      {
        "name": this.name,
        "email": this.email,
        "phone": this.phone,
        "passwd": this.password,
      }).then(
        res => {
          console.log(res)
          this.dialogSuccess = true;
        }).catch(
          err => {
            console.log(err)
          }
        
      )

      localStorage.setItem('token', response.data.token)
    },

  }
}


