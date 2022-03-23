<template>
<div 
class="drop-zone"
@dragenter.prevent
@dragover.prevent
>
    <div v-for="item in products" 
    :key="item.id" 
    class="drag-el"
    draggable="true"
    @dragstart="startDrag($event, item)">
    >
    {{item.title}} 
    </div>
 
</div>

<div 
class="drop-zone"
@drop="onDrop($event,2)"
@dragenter.prevent
@dragover.prevent
>
    <div v-for="item in products2" 
    :key="item.id" 
    class="drag-el"
    draggable="true"
    @dragstart="startDrag($event, item)">
    {{item.title}} 
    </div>
 
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
            ],
            products2: []
         }
         
     },
     setup(){
     },
     props: [],
     methods: {
         drop: e => {
             const card_id = e.dataTransfer.getData('card_id');
             const card = document.getElementById(card_id);
             card.style.display = "block"
             e.target.appendChild(card);
         },

         onDrop(event, list){
            const itemId = event.dataTransfer.getData('productId')
            const itemTitle = event.dataTransfer.getData('productTitle')
            const itemList = event.dataTransfer.getData('productList')

            console.log(itemId)
            console.log(list)
            if(!this.products2.find((prd) => prd.id == itemId )){
                this.products2.push({id: itemId, title: itemTitle, list: itemList})
            }
            
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
 .drop-zone{
     width: 50%;
     margin: 50px auto;
     padding: 10px;
     min-height: 10px;
     background-color: antiquewhite;
 }
 .drag-el{
     background-color: aqua;
     color: aliceblue;
     padding: 5px;
     margin-bottom: 10px;
 }



 </style>