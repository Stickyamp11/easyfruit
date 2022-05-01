import Board from '../Draggable/boa-rd.vue'
import BuyResumeModalComponent from '../buy-order.vue'
export default {
  name: 'cart',
  components: {Board, BuyResumeModalComponent},
  props: [],
  data () {
    return {
      currentProductsBoard: false
    }
  },
  computed: {

  },
  mounted () {
    //this.jsStuff();
    this.getProductItemsFromBoard();

  },
  methods: {
    getProductItemsFromBoard(){
      console.log('update button')
      console.log(this.$refs['cartBoard'].getLengthProducts())
      if(this.$refs['cartBoard'].getLengthProducts() > 0){
        this.currentProductsBoard = true;
      }
      else{
        this.currentProductsBoard = false;
      }

      //Items in board have been updated so we send the info to the navbar
      this.$emit('counterUpdated');
    },
    sendCounter(){
      return this.$refs['cartBoard'].getLengthProducts();
    },
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
  /* jsStuff(){
     /* events fired on the drop targets 
      document.addEventListener("dragover", function() {

        this.getProductItemsFromBoard()
      }.bind(this), false);
   } */

  }
}


