
export default {
  name: 'single-product-card',
  components: {},
  data () {
    return {

    }
  },
  props: [
    'product_name',
    'product_img_src',
    'price_per_kg',
    'Category',
    'product_id'
  ],
  computed: {

  },
  mounted () {
    console.log(this.product_name)
  },
  methods: {

  }
}


