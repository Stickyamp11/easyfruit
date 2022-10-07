
export default {
  name: 'home',
  components: {},
  props: {

  },
  data () {
    return {
      userIsLogged: false,
    }
  },
  computed: {

  },
  mounted () {
    this.checkReload();
    this.userIsLogged = localStorage.getItem('token');
  },
  methods: {
    checkReload(){
        //To prevent infinite loop
        if(localStorage.getItem('reload') == 'true'){
          localStorage.setItem('reload', 'false');
          location.reload();
        }
      
    }
  }
}


