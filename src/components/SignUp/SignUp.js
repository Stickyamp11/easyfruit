import axios from "axios"

export default {
  name: 'sign-up',
  components: {},
  props: [],
  data () {
    return {
      email: '',
      password: '',

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

      const response = await axios.post('customer').then(
        res => {
          console.log(res)
        }).catch(
          err => {
            console.log(err)
          }
        
      )

      localStorage.setItem('token', response.data.token)
    }

  }
}


