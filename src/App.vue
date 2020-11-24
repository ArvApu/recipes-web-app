<template>
  <div id="app">

    <!-- HEADER -->
    <header id="header"> 
        <Slide id='mobile-menu' v-if="this.isAuthenticated">
          <NavLinks/>
        </Slide>
      <div class='logo'>
          <img class='image' src='@/assets/logo.svg' >
      </div>  

      <div class='buttons' v-if="this.isAuthenticated">
        <button class='btn' @click="logout()"> LOGOUT </button>
      </div>

    </header>

    <!-- MAIN -->
    <div id="main">

      <nav id="menu" v-if="this.isAuthenticated">
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
import SessionService from '@/services/session.service.js';
import NavLinks from '@/components/NavLinks.vue'
import { Slide } from 'vue-burger-menu' 
 

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: SessionService.isAuthenticated(),
    }
  },
  components: {
    NavLinks,
    Slide
  },
  methods: {
    logout() {
      this.isAuthenticated = false;
      AuthService.logout();
      this.$router.push('/');
    }
  }
}
</script>

<style>
  @import './assets/css/main.css';
  /* Can add style here or in main.css file */
</style>
