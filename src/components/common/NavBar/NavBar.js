import {sharedData} from "../../../shared/sharedData"
import Cart from "../cart/ca-rt.vue"
import Board from '../../Draggable/boa-rd.vue'
import * as cartService from "@/shared/services/cartService"
export default {
  name: 'nav-bar',
  components: {Cart,Board},
  props: [
    'userLogged'
  ],
  data () {
    return {
      sharedData,
      Cart,
      isUserLogged: Boolean,
      isStoreManager: Boolean,
      counter: Number,
    }
  },
  computed: {

  },
  created() {
    this.updateCounterItems() // first run
  },
  beforeDestroy() {
    if (this.interval) {
      this.interval = undefined
    }
  },
  mounted () {
    this.isStoreManager = false;
    this.isUserLogged = false;
   this.setLocalData();
   this.jsStuffToAdd();
   this.updateCounterItems();
    
  },
  methods: {
    logout(){
      if(localStorage.getItem('token'))
      {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isStoreManager');
        this.isUserLogged = false;
        this.isStoreManager = false;
      }
      
    },


    setLocalData(){
      this.isUserLogged = localStorage.getItem('token');
      if(localStorage.getItem('isStoreManager') == 'si') 
      {
        this.isStoreManager = true;
      }
 
    },

    updateCounterItems(){
       cartService.getNumberOfItems().then(res => {
        this.counter = res.data;
       });
    },

    updateCounter(){
      this.counter = this.$refs['customerCart'].sendCounter();
    },



    jsStuffToAdd(){
        document.getElementsByClassName('overlay-sidebar')[0].addEventListener('click', function () {
          // hide sidebar
          document.getElementById('sidebar').classList.remove('active');
          document.getElementById('sidebar').style.visibility = 'hidden';
          // hide overlay
          document.getElementsByClassName('overlay-sidebar')[0].classList.remove('overlay-sidebar-active');
        });

        document.querySelector('#sidebarCollapse').addEventListener('click', function () {
            // open sidebar
            document.getElementById('sidebar').classList.add('active');
            document.getElementById('sidebar').style.visibility = 'visible';
            // fade in the overlay
            document.getElementsByClassName('overlay-sidebar')[0].classList.add('overlay-sidebar-active');

        });

        document.addEventListener("dragstart", function() {
          if(!document.getElementById('mySidebar').classList.contains('show'))
          {
                  setTimeout(function changePos() 
                  {

                          // store a ref. on the dragged elem
                      let cartIcon = document.getElementById('cart-button-web')
                    
                          cartIcon.classList.add('cart-button-active')
                          cartIcon.classList.remove('fa-2x');
                          cartIcon.classList.add('fa-6x');
                          cartIcon.style.color = 'rgb(25, 107, 2)';
                        
                          //hidde counter items in the cart
                          document.getElementById('cart-button-web-counter').style.display = 'none';
                          // fade in the overlay
                          document.getElementsByClassName('overlay-cart-button')[0].classList.add('overlay-cart-button-active');

                  }, 10);
         
          }
        }, false);

          //Dragable stuff for cart icon css when DRAG START
          document.addEventListener("dragend", function() {
            if(!document.getElementById('mySidebar').classList.contains('show'))
          {
                event.preventDefault();
                // store a ref. on the dragged elem
              let cartIcon = document.getElementById('cart-button-web')
              if(cartIcon.style.display != 'none')
              {
                cartIcon.classList.remove('fa-6x');
                cartIcon.classList.add('fa-2x');
                cartIcon.classList.remove('cart-button-active')
                cartIcon.style.color = 'black';
      
                //show counter items in the cart
                document.getElementById('cart-button-web-counter').style.display =  'block';
                // fade in the overlay
                document.getElementsByClassName('overlay-cart-button')[0].classList.remove('overlay-cart-button-active');


                //Update counter elements
                 cartService.getNumberOfItems().then(res => {
                  this.counter = res.data;
                 });

              }
        
          }

          }.bind(this), false);

          window.onload = function(){
            //MOST IMPORTANT OF ALL IS THAT HERE WE CONTROL WHEN CART IS SHOWN AND WHEN HIDDEN
            //Enable click in the cart icon
              document.getElementById('cart-button-web').addEventListener('click', function(){
              document.getElementById('cart-button-web').style.display = document.getElementById('cart-button-web').style.display ='none';
              document.getElementById('cart-button-web-counter').style.display = document.getElementById('cart-button-web-counter').style.display = 'none';

              document.getElementsByClassName('sidebarCart')[0].style.right = '0rem';
              //Also when clicking, we need to set collapse to show so:
              document.getElementById('mySidebar').classList.add('show');

            }, false);

            //Enable click in the counter
              document.getElementById('cart-button-web-counter').addEventListener('click', function(){
              document.getElementById('cart-button-web').style.display = document.getElementById('cart-button-web').style.display = 'none';
              document.getElementById('cart-button-web-counter').style.display = document.getElementById('cart-button-web-counter').style.display = 'none';

              document.getElementsByClassName('sidebarCart')[0].style.right = '0rem';
              //Also when clicking counter, we need to set collapse to show so:
              document.getElementById('mySidebar').classList.add('show');
            }, false);

            document.getElementById('button-cart-close-content').addEventListener('click', function(){
             // this.updateCounterItems();
             document.getElementsByClassName('sidebarCart')[0].style.right = '-22rem';
             cartService.getNumberOfItems().then(res => {
              this.counter = res.data;
             });

              document.getElementById('cart-button-web').style.display = document.getElementById('cart-button-web').style.display = 'block';
              document.getElementById('cart-button-web-counter').style.display = document.getElementById('cart-button-web-counter').style.display = 'block';

              //Also when clicking close, we need to set collapse to show  hidde so:
              document.getElementById('mySidebar').classList.remove('show');
            }.bind(this), false);


            //To close sidebar cart when doing a order
            document.getElementById('button-send-buy-order').addEventListener('click', function(){
              
              document.getElementsByClassName('sidebarCart')[0].style.right = '-22rem';

            
             }.bind(this), false);
          }
        
      },


      async onDrop(event){
        const productId = event.dataTransfer.getData('productId')
        if(productId)
        {
          await cartService.insertProductIntoCart(productId).then(res => {
            if(res.status == 201){
              this.$refs['customerCart'].updateCart();
            }
            else{
              console.error('Error adding to cart');

            }
            

          });

        }
        
        
    },
    
  }







}


