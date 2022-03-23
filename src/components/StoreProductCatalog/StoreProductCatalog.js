import SingleProductCard from "../SingleProductCard/single-product-card.vue";
import * as storeService from "@/shared/services/storeService"
export default {
  name: 'store-product-catalog',
  components: { SingleProductCard},
  props: {
    id:{
      type: String|Number,
      required: true,
    },
  },
  data () {
    return {
      products: [],
      storeInfo: '',

    }
  },
  computed: {

  },
  mounted () {
    this.getStoreInfo();
    this.getProductsDataFromStore();
  },
  methods: {
    getStoreInfo(){
      storeService.getStoreData(this.$route.params.id).then((response) => {
        console.log(response)
        this.storeInfo = response.data
      }).catch((error) => {
        console.error(error);
      })
    },

    getProductsDataFromStore(){
      storeService.getStoreProducts(this.$route.params.id).then((response) => {
        console.log(response)
        this.products = response.data
      }).catch((error) => {
        console.error(error);
      })
    }


  }
}


