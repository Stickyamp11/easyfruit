
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
        console.log('TRY TO RELOAD', localStorage.getItem('reload') )
        if(localStorage.getItem('reload') == 'true'){

          console.log('ESTOY DENTRO')

          localStorage.setItem('reload', 'false');

          location.reload();
        }
      
    }
  }
}


