
export default {
  name: 'dialog-notification',
  components: {},
  props: ['dialogShow','link'],
  data () {
    return {
      dialogActive: false,
      redirectLink: this.link
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    hidde(){
      this.dialogActive = false;
  },
  show(){
      this.dialogActive = true;
      console.log('he ejecutado el show y el valor de dialogActive es:', this.dialogActive)
  },
  
  }
}


