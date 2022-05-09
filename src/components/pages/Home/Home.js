
export default {
  name: 'home',
  components: {},
  props: [],
  data () {
    return {
      userIsLogged: false,
    }
  },
  computed: {

  },
  mounted () {
    this.userIsLogged = localStorage.getItem('token');
  },
  methods: {

  }
}


