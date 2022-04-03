import {sharedData} from "../../shared/sharedData"
import Cart from "../cart/ca-rt.vue"
import Card from "../Draggable/ca-rd.vue"
import Board from '../Draggable/boa-rd.vue'
export default {
  name: 'nav-bar',
  components: {Cart, Card,Board},
  props: [
    'userLogged'
  ],
  data () {
    return {
      sharedData,
      Cart,
      isUserLogged: Boolean,
      isStoreManager: Boolean,
    }
  },
  computed: {

  },
  mounted () {
    this.isStoreManager = false;
    this.isUserLogged = false;
   this.exampletry()
    
  },
  methods: {

    forceUpdate(){
      console.log('updated')
      this.$forceUpdate()
    },

    logout(){
      if(localStorage.getItem('token'))
      {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('isStoreManager');
      this.isUserLogged = false;
      this.isStoreManager = false;
      }
      console.log(localStorage.getItem('token'))
        //localStorage.getItem('token') = null;
        //localStorage.getItem('userEmail') = null;
      
    },


    exampletry(){
      console.log('NavBar mounted')
      this.isUserLogged = localStorage.getItem('token');
      console.log('isStore', localStorage.getItem('isStoreManager'))
      if(localStorage.getItem('isStoreManager') == 'si') 
      {
        this.isStoreManager = true;
      }
 
      console.log(this.userLogged)
    }
  }
}


