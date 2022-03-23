import Board from '../Draggable/boa-rd.vue'
export default {
  name: 'cart',
  components: {Board},
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


