<template>
  <div id="app">

    <!-- HEADER -->
    <header id="header"> 
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
      Copyright and link to github
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from '@/services/auth.service.js'
import NavLinks from '@/components/NavLinks.vue'

export default {
  name: 'App',
  components: {
    NavLinks,
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
