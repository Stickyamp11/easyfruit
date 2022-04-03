import axios from "axios"
import SingleStoreCard from "../SingleStoreCard/single-store-card.vue";
export default {
  name: 'stores-catalog',
  components: {SingleStoreCard},
  props: [],
  data () {
    return {
      stores: [],
    }
  },
  computed: {

  },
  mounted () {
    this.getStoresData();
  },
  methods: {
    getStoresData(){
      axios.get('/store').then((response) => {
        console.log(response)
        this.stores = response.data
      }).catch((error) => {
        console.error(error);
      })
    }
  }
}


