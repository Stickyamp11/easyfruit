<template>
    <header>
        <nav>
            
            <ul v-show="!mobile" class="navigation">
                <div class="branding">
                <img src="@/assets/iconEasyFruit.png" alt=""/>
            </div>
                <li><router-link class="link" :to="{name: 'Home'}">Home</router-link></li>
                <li><router-link class="link" :to="{name: 'Home'}">About</router-link></li>
                <li><router-link class="link" :to="{name: 'Home'}">Cart</router-link></li>
                <li><router-link class="link" :to="{name: 'Home'}">Profile</router-link></li>

            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: "navigation",
    data(){
        return {
            scrollPosition: null,
            mobile: false,
            mobileNav: null,
            windowWidth: null,

        };
    },
};
</script>

<style>
header{
    background-color: rgb(44, 92, 44);
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: 0.5s ease all;
    color:aqua;
    
    
    
}
header.nav{
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: .5s ease all;
    width: 90%;
    margin: 0 auto;
    @media(min-width: 1140px){ max-width: 1140px;}
    }

ul,
.link{
font-weight: 500;
color: rgb(0, 0, 0);
list-style: none;
text-decoration: none;
}
li{
text-transform: uppercase;
padding: 16px;
margin-left: 16px;

}

.link {
    font-size: 14px;
    transition: .5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;

}
.link:hover{
    color: green;

}
.branding{
    display: flex;
    align-items: left;

 
}
img{
        width: 60px;
        transition: .5s ease all;
    }


.navigation{
    display: flex;
    align-items: left;
    flex: 1;
    justify-content: flex-left;
}
</style>
