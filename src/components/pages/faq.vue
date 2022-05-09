<template>
    <section class="faq">
        <div class="inner-faq">
           <button class="accordion">¿Cómo funciona?</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>

            <button class="accordion">¿Quienes somos?</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>

            <button class="accordion">¿Cómo realizar un pedido?</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>
             <button class="accordion">He tenido un problema con mi pedido...</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>
             <button class="accordion">¿Cómo pagar?</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>
             <button class="accordion">He encontrado un error en una tienda...</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'faq-component',

    mounted() {
        //Javascript to make it work
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else {
            panel.style.display = "block";
            }
        });
        }
    },
}
</script>

<style>

/* Style the buttons that are used to open and close the accordion panel */
.faq .accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.faq  .active, .faq .accordion:hover {
  background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.faq  .panel {
  padding: 0 18px;
  background-color: white;
  display: none;
  overflow: hidden;
}

.inner-faq{
    margin-top: 10%;
    margin-left: 10%;
    margin-right: 10%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
