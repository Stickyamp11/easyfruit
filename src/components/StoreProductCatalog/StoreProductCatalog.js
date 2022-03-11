import axios from "axios"
import SingleProductCard from "../SingleProductCard/single-product-card.vue";
export default {
  name: 'store-product-catalog',
  components: { SingleProductCard},
  props: [],
  data () {
    return {
      products: [],

    }
  },
  computed: {

  },
  mounted () {
    this.getProductsDataFromStore();
  },
  methods: {

    getProductsDataFromStore(){
      axios.get('/api/v1/product').then((response) => {
        console.log(response)
        this.products = response.data
      }).catch((error) => {
        console.error(error);
      })
    }


  }
}


