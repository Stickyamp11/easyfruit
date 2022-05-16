import axios from "axios"
import DialogSuccessNotification from "../../Dialogs/DialogSuccessNotification/dialog-notification.vue"
import DialogErrorNotification from "../../Dialogs/DialogErrorNotification/dialog-notification.vue"
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
      console.log(this.email)
      console.log('submitted')

      const response = await axios.post('/customer',
      {
        "name": this.name,
        "email": this.email,
        "phone": this.phone,
        "passwd": this.password,
        "zip": this.zip,
        "seller": 'no',
      }).then(
        res => {

          if(res.status == 201){
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

      localStorage.setItem('token', response.data.token)
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


