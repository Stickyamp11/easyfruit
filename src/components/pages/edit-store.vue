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


 <DialogSuccessNotification :dialogShow="loginSuccess" :link='successLink' ref="loginDialogStatusSuccess">
    <div class="modal-content">
        <p>
          Información editada con éxito
        </p>
    </div>
    </DialogSuccessNotification>

    <DialogErrorNotification :dialogShow="loginSuccess" :link='successLink' ref="loginDialogStatusError">
      <div class="modal-content">
          <p>
            Error al editar la información
          </p>
      </div>
      </DialogErrorNotification>

</template>

<script>
import * as storeService from "@/shared/services/storeService"
import {sharedData} from "../../shared/sharedData"
import DialogSuccessNotification from "../Dialogs/DialogSuccessNotification/dialog-notification.vue"
import DialogErrorNotification from "../Dialogs/DialogErrorNotification/dialog-notification.vue"
export default {
  name: 'edit-store',
  components: {DialogSuccessNotification,DialogErrorNotification},
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
      processStatus: 'success',
      thereIsImage: false,
    }
  },
  computed: {

  },
  mounted () {
    this.refreshData()
  },
  methods: {

    preview() {
                this.thereIsImage = true;
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
            this.processStatus = 'error';
            this.showDialogProcessResult();
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
          if(res.status == 201)
          {
            //It means we need to send the img loaded
            if(this.thereIsImage)
            {
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
                        if(res.status == 201)

                          console.log(res)

                        //Everything went fine
                        this.processStatus = 'success';
                        this.showDialogProcessResult();

                      }).catch(
                  err => {
                    console.log(err)
                    this.processStatus = 'error';
                    this.showDialogProcessResult();
                  }
                  )

            }
            else
            {
              //If no img, we are finished
               this.processStatus = 'success';
               this.showDialogProcessResult();
            }

          }
          else
          {
            this.processStatus = 'error';
            this.showDialogProcessResult();
          }


        }).catch(
          err => {
            console.log(err)
            this.processStatus = 'error';
            this.showDialogProcessResult();
          }
        
      )

    },

     //Dynamically show dialog error/success 
    showDialogProcessResult(){
      if(this.processStatus == 'success'){
        this.$refs['loginDialogStatusSuccess'].show();

      }
      else if(this.processStatus == 'error'){
        this.$refs['loginDialogStatusError'].show();
      }

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