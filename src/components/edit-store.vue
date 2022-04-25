<template>
<form  class="edit-store-form" @submit.prevent="handleSubmit">
  <div class="row" id="image-row">
      <div class="col-12">
            <label for="Image" class="form-label">Previsualización de la tienda</label>
            <div id="frame-wrapper"> 
            <img id="frame" ref="frame-ref" src="" class="img-fluid" />
            </div>
            <input class="form-control" type="file" accept="image/jpeg" id="formFile" v-on:change="preview()" v-on:click="clearImage()">
      </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Nombre oficial de la tienda</label>
      <input type="email" v-model="name" class="form-control" id="inputEmail4">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Direccion</label>
      <input type="text" v-model="address" class="form-control" id="inputPassword4">
    </div>
  </div>
  <div class="form-group">
    <label for="inputName">Telefono de contacto</label>
    <input type="text" v-model="phone" class="form-control" id="inputName">
  </div>
 
  <div class="row">
  <div class="col-md-6">
  <button type="submit" class="btn btn-success"  v-on:click="handleSubmit">Actualizar</button>
  </div>
  <div class="col-md-6">
  <button type="submit" class="btn btn-secondary"  v-on:click="$router.go(-1)">Volver</button>
  </div>
  </div>
</form>


<DialogNotification v-if="dialogSuccess" :dialogShow="dialogSuccess" :link='successLink'>
<div class="modal-content">
  <p>
    Se ha registrado correctamente1
  </p>

</div>
</DialogNotification>

</template>

<script>
import * as storeService from "@/shared/services/storeService"
import {sharedData} from "./../shared/sharedData"
import DialogNotification from "./DialogNotification/dialog-notification.vue"
export default {
  name: 'edit-store',
  components: {DialogNotification},
  props: [],
  data () {
    return {
      sharedData,
      dialogSuccess: false,
      customerId: 0,
      store: '',
      name: '',
      address: '',
      phone: '',
      comercial_logo: '',
      successLink: '/',
    }
  },
  computed: {

  },
  mounted () {
    this.refreshData()
  },
  methods: {

    preview() {
                this.$refs["frame-ref"].src = URL.createObjectURL(event.target.files[0]);
            },
    clearImage() {
                this.$refs["frame-ref"].src = "";
            },

    async refreshData(){
      //console.log(this.email)
      //console.log('submitted')
      console.log(sharedData)
      await storeService.getStoreDataByManagerEmail(localStorage.getItem('userEmail')).then(
        res => {
          console.log(res)
          this.store = res.data;
          this.name = this.store.name;
          this.address = this.store.address;
          this.phone =  this.store.phone;
          this.comercial_logo = this.store.comercial_logo;
          this.$refs["frame-ref"].src = this.comercial_logo;

        }).catch(
          err => {
            console.log(err)
          }
        
      )

      //localStorage.setItem('token', response.data.token)
    },

    async handleSubmit(){

      console.log('submitted')

      let storeUpdated = {
        "name": this.name ? this.name : "",
        "address": this.address ? this.address : "",
        "phone": this.phone ? this.phone : "",
        "id": this.store.id
      }
      await storeService.updateStore(storeUpdated).then(
        res => {
          console.log(res)
          console.log('He entrado dentro del success del updateStore y ejecutaré el uploadImg')


         let formData = new FormData();

          let myFile = document.querySelector('input[type=file]').files[0];
          myFile.fileId = this.store.id;
          formData.append("file", myFile);
          formData.append("id",this.store.id);
          console.log('aquiiii', myFile);
          storeService.uploadImg(formData).then(
              res => {
                  console.log(res)
                 this.dialogSuccess = true;

               }).catch(
          err => {
            console.log(err)
          }
          )


        }).catch(
          err => {
            console.log(err)
          }
        
      )

    },

  }
}



</script>

<style>
.edit-store-form{
width: 90%;
margin-left: 5%;
}
#frame-wrapper{
    width: 1000px;
    height: 300px;
    display: block;

    background-color: rgb(67, 67, 68);

}
#frame{
    width: 1000px;
    height: 300px;
}
#formFile{
  width: 60%;
}

#image-row{
    margin-top: 5%;
    margin-bottom: 5%;
}
</style>