
export default {
  name: 'dialog-notification',
  components: {},
  props: ['dialogShow'],
  data () {
    return {
      dialogActive: Boolean,
    }
  },
  computed: {

  },
  mounted () {
  
    this.dialogActive = this.dialogShow;
    console.log(this.dialogActive)
    console.log('hi')
  },
  methods: {
    close({root}){
      root.$destroy();
      root.$el.parentNode.removeChild(root.$el);
    }


  }
}


