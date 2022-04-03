<template>
 <div v-for="item in products" 
    :key="item.id" 
    class="drag-el"
    draggable="true"
    @dragstart="startDrag($event, item)">
    {{item.title}} 
    </div>

</template>

<script>
 export default{
     data(){
         return{
         products: [
             {id:0, title: 'item a', list: 1},
             {id:1, title: 'item b', list: 1},
             {id:2, title: 'item c', list: 2},
            ]
        }
     },
     props: [],
     methods: {
         dragStart: e => {
             const target = e.target;
             e.dataTransfer.setData('card_id', target.id)
         

         setTimeout(() => {
             target.style.display = "none";
         
         }, 0);
     },

     startDrag(event, item){
            console.log(item)
            console.log('startDrag')
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('productId', item.id)
            event.dataTransfer.setData('productTitle', item.title)
            event.dataTransfer.setData('productList', item.list)


            console.log(event.dataTransfer.getData('productId'))
        }
 }
 }
 </script>
 <style>

 .drag-el{
     background-color: aqua;
     color: aliceblue;
     padding: 5px;
     margin-bottom: 10px;
 }



 </style>