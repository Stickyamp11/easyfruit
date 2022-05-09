
export default {
  name: 'single-store-card',
  components: {},
  props: [
    'store_id',
    'store_name',
    'store_address',
    'store_comercial_logo',
  ],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    clicked(){
      
      console.log(this.store_id + 'submitted')
    }
  }
}


