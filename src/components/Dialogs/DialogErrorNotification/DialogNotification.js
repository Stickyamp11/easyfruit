
export default {
  name: 'dialog-notification',
  components: {},
  props: ['dialogShow','link'],
  data () {
    return {
      dialogActive: false,
      redirectLink: this.link,
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
  },

  dialogFinished(){
    this.$emit('finished');
  }
  
  }
}


