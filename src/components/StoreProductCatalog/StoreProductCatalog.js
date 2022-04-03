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
        console.log('storeInfo', this.storeInfo)
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
    },

    //Draggable items
    startDrag(event, product){
      console.log('Problem is here')
      console.log(product)
      console.log(this.products)
      console.log('startDrag | storeProductCatalog')
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('productId', product.id)
      event.dataTransfer.setData('productImg', product.product_img)
      event.dataTransfer.setData('productName', product.name)
      event.dataTransfer.setData('productFStore', product.fStore)


      console.log(event.dataTransfer.getData('productId'))
  }


  }
}


