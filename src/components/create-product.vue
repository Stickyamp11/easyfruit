<template>
<form  class="create-product-form" @submit.prevent="">
   <div class="form-group row">

            <div class="form-group col-sm-6">
                <label for="Image" class="form-label">Previsualización del producto</label>
                 <div id="frame-wrapper"> 
                  <img id="frame" ref="frame-ref" src="" class="img-fluid" />
                 </div>
                <input class="form-control" type="file" id="formFile" v-on:change="preview()" v-on:click="clearImage()">
            </div>
            

            <div class="form-group col-sm-6" style="margin-top: 3%;">
              <label for="inputEmail4">Nombre</label>
              <input type="text" v-model="productName" class="form-control" id="inputEmail4" >

              <label for="inputCategory">Categoría</label>
              <select v-model="categorySelected" class="form-select" id="inputCategory" style="display: block;">
                <option v-for="category in categories" :key="category.id">{{category.name}}</option>
              </select>

              <label for="inputName">Descripción</label>
              <textarea type="text" v-model="productDescription" class="form-control" id="inputName"></textarea>
            </div>
   </div>


  <div class="form-group row">
    
  <div class="form-group col-md-12">
    
  </div>
  
  </div>

  <div class="form-group row"  style="margin-top: 2%;">
     <div class="form-group col-md-6">
    <button type="submit" class="btn btn-success"  v-on:click="handleSubmit">Crear</button>
     </div>

      <div class="form-group col-md-6 ms-auto text-right">
    <button type="submit" class="btn btn-danger"  v-on:click="$router.go(-1)">Volver</button>
     </div>
    
    
</div>
  
</form>


<DialogNotification v-if="dialogSuccess" :dialogShow="dialogSuccess">
<div class="modal-content">
  <p>
    Se ha registrado correctamente
  </p>

</div>
</DialogNotification>
</template>

<script>
import * as storeService from "../shared/services/storeService"
import * as categoryService from "../shared/services/categoryService"
import * as productService from "../shared/services/productService"
import {sharedData} from "../shared/sharedData"
import DialogNotification from "./DialogNotification/dialog-notification.vue"




export default {
  name: 'edit-product',
  components: {DialogNotification},
  props: [],
  data () {
    return {
      sharedData,
      dialogSuccess: false,
      productName: 'm',
      productCategory: '',
      productDescription:'',
      storeInfo: '',
      categories: [],
      categorySelected: '',

    }
  },
  computed: {

  },
  created(){

    this.refreshData();
  },
  mounted () {
   
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

      //We get store info from user logged email registered in DB
       await storeService.getStoreDataByManagerEmail(localStorage.getItem('userEmail')).then((response) => {
                console.log(response)
                console.log('aqui userEmail', localStorage.getItem('userEmail'))
                this.storeInfo = response.data
                console.log('storeInfo', this.storeInfo)

            }).catch((error) => {
                console.error(error);
            })


        //When you have product data, then , you call to get categories
          this.getProductCategories();


      //localStorage.setItem('token', response.data.token)
    },

    async handleSubmit(){

      console.log('submitted')

      let sendProduct = {
        fCategory: this.categories.find(i => i.name == this.categorySelected).id,
        description: this.productDescription,
        name: this.productName,
        fStore: this.storeInfo.id
      }
      console.log('sendProduct', sendProduct)
     await productService.createProduct(sendProduct).then(response =>
     {
       console.log(response);
       this.dialogSuccess = true;
     });


    },

     async getProductCategories(){
            console.log('hola')
            await categoryService.getCategories().then((response) => {
            console.log('categories', response)
            this.categories = response.data;
            console.log(this.categories)

            

            }).catch((error) => {
            console.error(error);
            })
            },

  }
}



</script>

<style>
#frame-wrapper{
    max-width: 75%;
    max-height: 95%;
    min-width: 75%;
    min-height: 95%;
    display: block;

    background-color: rgb(67, 67, 68);

}
#frame{
    max-width: 100%;
    max-height: 110%;
    min-width: 100%;
    min-height: 110%;
    height: 100%;
}
#formFile{
  width: 60%;
}

.create-product-form{
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
  background-color: aliceblue;
}

.form-control{
  width: 95%;
}
</style>