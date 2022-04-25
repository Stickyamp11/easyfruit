import Board from '../Draggable/boa-rd.vue'
import BuyResumeModalComponent from '../buy-order.vue'
export default {
  name: 'cart',
  components: {Board, BuyResumeModalComponent},
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    hidde(){
      this.dialogActive = false;
      this.$refs['cartBoard'].getCartProductsFromCustomer();

           },
          show(){
            this.$refs['cartBoard'].getCartProductsFromCustomer();
            this.dialogActive = true;
           },
           updateCart(){
            this.$refs['cartBoard'].getCartProductsFromCustomer();
          },

    openBuyDialog(){
  
      this.$refs.buyResumeDilog.show();
    },
    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    openNav() {
  document.getElementById("cart-button").style.marginRight = "250px";
},

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    closeNav() {
  document.getElementById("cart-button").style.marginRight = "0";
}

  }
}


