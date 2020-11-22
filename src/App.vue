<template>
  <div id="app">

    <!-- HEADER -->
    <header id="header"> 
        <Slide id='mobile-menu'>
          <NavLinks/>
        </Slide>
      <div class='logo'>
          <img class='image' src='@/assets/logo.svg' >
      </div>  

      <div class='buttons'>
        <button class='btn' @click="login()"> LOGIN </button>
        <!-- <button class='btn' @click="login()"> LOGOUT </button> -->
      </div>

    </header>

    <!-- MAIN -->
    <div id="main">

      <nav id="menu">
        <NavLinks/>
      </nav>

      <div id="content">
        <router-view/>
      </div>
      
    </div>

    <!-- FOOTER -->
    <footer id="footer"> 
      
      <div> 
        <a class='icon-link' href="https://github.com/ArvApu/recipes-app"><img src="@/assets/github.svg"></a>
        <a class='icon-link' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="@/assets/yt.svg"></a>
      </div>

      <div class="copyright">	
        <img src="@/assets/copyright-symbol.svg">
        <span class="copyright-text" >All rights reserved to OhMyRecipes&reg;</span>
      </div>

    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from '@/services/auth.service.js'
import NavLinks from '@/components/NavLinks.vue'
import { Slide } from 'vue-burger-menu' 
 

export default {
  name: 'App',
  components: {
    NavLinks,
    Slide
  },
  methods: {
    login() {
      AuthService.login();
    }
  }
}
</script>

<style>
  @import './assets/css/main.css';
  /* Can add style here or in main.css file */
</style>
